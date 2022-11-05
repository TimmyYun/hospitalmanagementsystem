from django.contrib import admin

# Register your models here.

from .models import Employee, Client
admin.site.register(Employee)
admin.site.register(Client)