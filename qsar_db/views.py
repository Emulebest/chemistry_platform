from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView

from qsar_db.models import QsarDb
from qsar_db.serializers import QsarDbSerializer


# class QsarDbViewSet(viewsets.ModelViewSet):
#     queryset = QsarDb.objects.all()
#     serializer_class = QsarDbSerializer
#
#     def list(self, request, *args, **kwargs):
#         queryset = QsarDb.objects.filter(visibility=QsarDb.Visibility.PUBLIC)
#         serializer = QsarDbSerializer(queryset, many=True)
#         return Response(serializer.data)


class DbUploadView(APIView):
    def post(self, request, format=None):
        serializer = QsarDbSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


class DbListView(ListAPIView):
    serializer_class = QsarDbSerializer

    def get_queryset(self):
        return QsarDb.objects.filter(visibility=QsarDb.Visibility.PUBLIC)


class DbManagerListView(ListAPIView):
    serializer_class = QsarDbSerializer

    def get_queryset(self):
        user = self.request.user
        return QsarDb.objects.filter(org=user.organization.name)


class DbManagerDetailsView(RetrieveUpdateDestroyAPIView):
    serializer_class = QsarDbSerializer

    def get_queryset(self):
        user = self.request.user
        return QsarDb.objects.filter(org=user.organization.name)


class DbDetailsView(RetrieveUpdateDestroyAPIView):
    serializer_class = QsarDbSerializer
    queryset = QsarDb.objects.all()
