# Generated by Django 4.1.2 on 2022-11-04 03:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_client_employee_delete_employees'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='departmentId',
            new_name='department',
        ),
    ]