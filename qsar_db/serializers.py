from rest_framework import serializers

from qsar_db.models import QsarDb


class QsarDbSerializer(serializers.ModelSerializer):
    class Meta:
        model = QsarDb
        fields = '__all__'
