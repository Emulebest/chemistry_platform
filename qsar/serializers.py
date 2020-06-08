from rest_framework import serializers

from auth_sys.serializers import OrganizationSerializer
from qsar.models import Task, Assignment


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)
    assigned_org = OrganizationSerializer(read_only=True)

    class Meta:
        model = Assignment
        fields = '__all__'
