from django.db import models

from auth_sys.models import Organization


class QsarDb(models.Model):

    class Visibility(models.TextChoices):
        PUBLIC = "public"
        PRIVATE = "private"

    name = models.TextField()
    file = models.FileField(upload_to="uploads/", null=True)
    org = models.CharField(max_length=150)
    visibility = models.CharField(choices=Visibility.choices, default=Visibility.PUBLIC, max_length=150)
