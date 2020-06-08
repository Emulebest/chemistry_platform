from django.db import models

from auth_sys.models import Organization
from qsar_db.models import QsarDb


class Task(models.Model):
    y_field = models.TextField(max_length=200)
    db = models.ForeignKey(QsarDb, on_delete=models.CASCADE)
    ant_number = models.IntegerField()
    iterations = models.IntegerField()
    organization = models.CharField(max_length=150)
    formula = models.CharField(max_length=500)


class Assignment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    assigned_org = models.ForeignKey(Organization, on_delete=models.CASCADE)
