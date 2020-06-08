from django.urls import path
from qsar.views import QsarSearch, ExperimentalOrgsView, AssignmentCreateView, AssignmentListView

urlpatterns = [
    path('search/', QsarSearch.as_view()),
    path('orgs/', ExperimentalOrgsView.as_view()),
    path('assignments/create/', AssignmentCreateView.as_view()),
    path('assignments/', AssignmentListView.as_view()),
]
