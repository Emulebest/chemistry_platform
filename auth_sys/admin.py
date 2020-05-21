from django.contrib import admin
from .models import *


@admin.register(JoinOrgRequest, User, Organization)
class AuthSysAdmin(admin.ModelAdmin):
    pass
