from django.contrib.auth.models import User, Group
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from api.models import Department, Employee, Client
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'  

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'  