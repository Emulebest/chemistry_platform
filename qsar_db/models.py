from django.contrib.postgres.fields import JSONField
from django.db import models

from auth_sys.models import Organization


class QsarDb(models.Model):

    class Visibility(models.TextChoices):
        PUBLIC = "public"
        PRIVATE = "private"

    name = models.TextField()
    data = JSONField()
    org = models.ForeignKey(Organization, on_delete=models.CASCADE)
    visibility = models.CharField(choices=Visibility.choices, default=Visibility.PRIVATE, max_length=150)
