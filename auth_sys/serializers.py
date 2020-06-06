from rest_framework import serializers

from auth_sys.models import User, JoinOrgRequest, Organization


class OrganizationSerializer(serializers.ModelSerializer):
    leader = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Organization
        fields = ['name', 'leader', 'email', 'company_type']


class UserSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'organization']


class JoinOrgSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = JoinOrgRequest
        fields = ['id', 'org', 'user']
        depth = 1
