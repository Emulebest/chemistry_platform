from django.urls import path
from qsar.views import QsarSearch, ExperimentalOrgsView, AssignmentListCreateView

urlpatterns = [
    path('search/', QsarSearch.as_view()),
    path('orgs/', ExperimentalOrgsView.as_view()),
    path('assignments/', AssignmentListCreateView.as_view()),
]
