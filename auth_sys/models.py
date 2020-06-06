from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class Organization(models.Model):
    class CompanyTypes(models.TextChoices):
        THEORETICAL = "theoretical"
        EXPERIMENTAL = "experimental"

    name = models.fields.CharField(unique=True, max_length=128)
    leader = models.ForeignKey('User', null=True, blank=True, on_delete=models.CASCADE, related_name='org_backref')
    company_type = models.CharField(choices=CompanyTypes.choices, max_length=128, default=CompanyTypes.THEORETICAL)
    email = models.EmailField(null=True)

    def __str__(self):
        return 'Company: ' + self.name


class JoinOrgRequest(models.Model):
    org = models.fields.CharField(max_length=128)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    fulfilled = models.BooleanField(default=False)

    class Meta:
        unique_together = ['org', 'user']


class MyUserManager(UserManager):
    def create(self, **kwargs):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        user = self.model(**kwargs)

        user.set_password(kwargs["password"])
        user.save(using=self._db)
        return user


class User(AbstractUser):
    organization = models.ForeignKey(Organization, null=True, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)

    objects = MyUserManager()
