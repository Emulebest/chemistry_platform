from django.db import models
from qsar_db.models import QsarDb

# Create your models here.
class Result(models.Model):
    aim = models.TextField(max_length=200)
    db = models.ForeignKey(QsarDb)
