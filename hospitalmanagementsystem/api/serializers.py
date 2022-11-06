from django.contrib.auth.models import User, Group
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator

from api.models import Department, Employee, Client


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class ClientSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    client = ClientSerializer(many=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name',
                  'groups', 'client')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'groups': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()
        group = Group.objects.get(name=validated_data['groups'][0])
        user.groups.add(group)
        print(validated_data)
        print(type(validated_data))
        if user.groups.filter(name='Clients').exists():
            self.createClient(validated_data, user)
        return user

    def createClient(self, validated_data, user):
        client = Client.objects.create(
            account=user,
            middlename=validated_data['middlename'],
            dateOfBirth=validated_data['dateOfBirth'],
            iin=validated_data['iin'],
            phoneNumber=validated_data['phoneNumber'],
            address=validated_data['address'],
            maritalStatus=validated_data['maritalStatus'],
            bloodGroup=validated_data['bloodGroup'],
            emergencyPhoneNumber=validated_data['emergencyPhoneNumber']
        )

        client.save()

        return client


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
