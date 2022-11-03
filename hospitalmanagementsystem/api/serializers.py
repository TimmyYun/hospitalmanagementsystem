from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Department, Employee, Client
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class DepartmentSerializer(serializers.Serializer):
    class Meta:
        model = Department
        fields = '__all__'

class ClientSerializer(serializers.Serializer):
    class Meta:
        model = Client
        fields = '__all__'  

class EmployeeSerializer(serializers.Serializer):
    class Meta:
        model = Employee
        fields = '__all__'  