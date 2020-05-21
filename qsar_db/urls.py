from django.urls import path, include
from rest_framework import routers

from qsar_db.views import QsarDbViewSet

router = routers.DefaultRouter()
router.register(r'', QsarDbViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
