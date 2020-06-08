# Generated by Django 3.0.6 on 2020-06-08 07:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth_sys', '0006_auto_20200606_1549'),
        ('qsar_db', '0003_auto_20200606_1134'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('y_field', models.TextField(max_length=200)),
                ('ant_number', models.IntegerField()),
                ('iterations', models.IntegerField()),
                ('organization', models.CharField(max_length=150)),
                ('formula', models.CharField(max_length=500)),
                ('db', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qsar_db.QsarDb')),
            ],
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assigned_org', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth_sys.Organization')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='qsar.Task')),
            ],
        ),
    ]
