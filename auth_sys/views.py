from django.contrib.auth.hashers import make_password, check_password
from django.db import IntegrityError
from django.http import JsonResponse
from rest_framework import viewsets, exceptions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from auth_sys.models import User, JoinOrgRequest, Organization
from auth_sys.serializers import UserSerializer, JoinOrgSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class JoinOrgListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            join_org_req = JoinOrgRequest.objects.create(user_id=user.id, **request.data)
        except IntegrityError as e:
            return JsonResponse(data={"error": "object already exists"})
        serializer = JoinOrgSerializer(join_org_req)
        return JsonResponse(data=serializer.data, status=201)

    def get(self, request):
        user = request.user
        orgs = JoinOrgRequest.objects.filter(org=user.organization.name, fulfilled=False)
        serializer = JoinOrgSerializer(orgs, many=True)
        return JsonResponse(data={"result": serializer.data}, status=200)


class JoinOrgAccept(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk=None):
        user = request.user
        join_org_req = JoinOrgRequest.objects.get(pk=pk)
        org = Organization.objects.get(name=join_org_req.org)
        if user.organization.name == join_org_req.org and org.leader.id == user.id:
            join_org_req.fulfilled = True
            join_org_req.save()

            join_org_user = User.objects.get(pk=join_org_req.user.pk)
            join_org_user.organization = org
            join_org_user.is_verified = True
            join_org_user.save()
        else:
            raise PermissionDenied
        return JsonResponse(data={"result": "Success", "id": join_org_req.id}, status=200)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            verified = check_password(data["password"], user.password)
            if verified:
                serializer = UserSerializer(user)
                return JsonResponse(serializer.data, status=200)
            else:
                return JsonResponse({"result": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"result": "User not found"}, status=404)
