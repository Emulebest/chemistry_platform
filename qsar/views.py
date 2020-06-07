from django.shortcuts import render
from rest_framework.views import APIView


class DbUploadView(APIView):
    def post(self, request, format=None):
        serializer = QsarDbSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
