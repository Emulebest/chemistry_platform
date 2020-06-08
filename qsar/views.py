from django.db.models import Q
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView

from auth_sys.models import Organization
from auth_sys.serializers import OrganizationSerializer
from qsar.models import Task, Assignment
from qsar.run_aco import run
from qsar.serializers import TaskSerializer, AssignmentSerializer
from qsar_db.models import QsarDb


class QsarSearch(APIView):
    def post(self, request):
        data = request.data
        db_id = data["db"]
        db = QsarDb.objects.get(pk=db_id)
        file_path = db.file.path
        formula = run(
            file_path,
            data["y_field"],
            data["ant_number"],
            data["iterations"],
            1,
            1
        )
        task = Task.objects.create(
            formula=formula,
            db_id=db_id,
            ant_number=data["ant_number"],
            y_field=data["y_field"],
            iterations=data["iterations"],
            organization=data["organization"]
        )
        serializer = TaskSerializer(task)
        return JsonResponse(serializer.data, status=200)


class ExperimentalOrgsView(ListAPIView):
    serializer_class = OrganizationSerializer

    def get_queryset(self):
        return Organization.objects.filter(company_type=Organization.CompanyTypes.EXPERIMENTAL)


class AssignmentListCreateView(ListCreateAPIView):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        user = self.request.user
        assignments = Assignment.objects.filter(
            Q(task__organization=user.organization.name) | Q(assigned_org__name=user.organization.name))
        return assignments
