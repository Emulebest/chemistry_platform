from django.contrib import admin

from qsar_db.models import QsarDb


@admin.register(QsarDb)
class QsarDb(admin.ModelAdmin):
    pass
