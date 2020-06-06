from django.urls import path, include
from rest_framework import routers

from qsar_db.views import DbUploadView, DbDetailsView, DbListView, DbManagerDetailsView, DbManagerListView

# router = routers.DefaultRouter()
# router.register(r'', QsarDbViewSet)

urlpatterns = [
    path('upload/', DbUploadView.as_view()),
    path('all/', DbListView.as_view()),
    path('manager/', DbManagerListView.as_view()),
    path('manager/<int:pk>/', DbManagerDetailsView.as_view()),
    path('<int:pk>/', DbDetailsView.as_view())
    # path('', include(router.urls)),
]
