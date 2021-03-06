# Generated by Django 3.0.6 on 2020-06-06 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_sys', '0005_auto_20200517_1756'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='company_type',
            field=models.CharField(choices=[('theoretical', 'Theoretical'), ('experimental', 'Experimental')], default='theoretical', max_length=128),
        ),
        migrations.AddField(
            model_name='organization',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
