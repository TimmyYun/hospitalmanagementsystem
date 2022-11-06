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


class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    middlename = serializers.CharField(write_only=True, required=True)
    dateOfBirth = serializers.DateField(write_only=True, required=True)
    iin = serializers.CharField(write_only=True, required=True)
    phoneNumber = serializers.CharField(write_only=True, required=True)
    address = serializers.CharField(write_only=True, required=True)
    maritalStatus = serializers.CharField(write_only=True, required=True)
    bloodGroup = serializers.CharField(write_only=True, required=False)
    emergencyPhoneNumber = serializers.CharField(
        write_only=True, required=False)
    status = serializers.CharField(write_only=True, required=False)
    type = serializers.CharField(write_only=True, required=False)
    department = serializers.ModelField(
        Department, write_only=True, required=False)
    specializationId = serializers.CharField(write_only=True, required=False)
    experience = serializers.IntegerField(write_only=True, required=False)
    photo = serializers.ImageField(write_only=True, required=False)
    category = serializers.IntegerField(write_only=True, required=False)
    price = serializers.IntegerField(write_only=True, required=False)
    degree = serializers.CharField(write_only=True, required=False)
    rating = serializers.IntegerField(write_only=True, required=False)
    homepage = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name',
                  'groups', 'middlename', 'dateOfBirth',
                  'iin', 'phoneNumber', 'address',
                  'maritalStatus', 'bloodGroup', 'emergencyPhoneNumber',
                  'status', 'type', 'department',
                  'specializationId', 'experience', 'photo',
                  'category', 'price', 'degree',
                  'rating', 'homepage')
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

        if user.groups.filter(name='Clients').exists():
            self.createClient(validated_data, user)
        elif user.groups.filter(name='Doctors').exists():
            self.createEmployee(validated_data, user)
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

    def createEmployee(self, validated_data, user):
        employee = Employee.objects.create(
            account=user,
            middlename=validated_data['middlename'],
            dateOfBirth=validated_data['dateOfBirth'],
            iin=validated_data['iin'],
            phoneNumber=validated_data['phoneNumber'],
            address=validated_data['address'],
            maritalStatus=validated_data['maritalStatus'],
            status=validated_data['status'],
            type=validated_data['type'],
            department=validated_data['department'],
            specializationId=validated_data['specializationId'],
            experience=validated_data['experience'],
            photo=validated_data['photo'],
            category=validated_data['category'],
            price=validated_data['price'],
            degree=validated_data['degree'],
            rating=validated_data['rating'],
            homepage=validated_data['homepage']
        )

        employee.save()

        return employee


class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
