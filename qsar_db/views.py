from rest_framework import viewsets
from rest_framework.response import Response

from qsar_db.models import QsarDb
from qsar_db.serializers import QsarDbSerializer


class QsarDbViewSet(viewsets.ModelViewSet):
    queryset = QsarDb.objects.all()
    serializer_class = QsarDbSerializer

    def list(self, request, *args, **kwargs):
        queryset = QsarDb.objects.filter(visibility=QsarDb.Visibility.PUBLIC)
        serializer = QsarDbSerializer(queryset, many=True)
        return Response(serializer.data)
