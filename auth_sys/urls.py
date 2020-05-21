from django.urls import path, include
from rest_framework import routers

from auth_sys.views import *

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('org_request/<int:pk>/', JoinOrgAccept.as_view()),
    path('org_request/', JoinOrgListCreate.as_view()),
    path('login/', LoginView.as_view()),
    path('', include(router.urls)),
]
