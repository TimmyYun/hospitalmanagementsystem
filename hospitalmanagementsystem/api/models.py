from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
# Create your models here.


class Department(models.Model):
    id = models.IntegerField(auto_created=True, primary_key=True,
                             serialize=True, verbose_name='ID', unique=True)
    name = models.CharField(max_length=40)
    description = models.TextField()


class Person(models.Model):
    account = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    middlename = models.CharField(max_length=20, blank=True)
    dateOfBirth = models.DateField()
    iin = models.CharField(max_length=20)
    phoneNumber = models.CharField(max_length=20)
    address = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=40, blank=True)
    maritalStatus = models.CharField(max_length=20, blank=True)

    class Meta:
        abstract = True


class Employee(Person):
    statuses = (
        ('A', 'Active'),
        ('I', 'In reserve'),
        ('R', 'Retired'),
    )
    types = (
        ('D', 'Doctor'),
        ('S', 'Staff'),
    )

    status = models.CharField(max_length=1, choices=statuses)
    type = models.CharField(max_length=1, choices=types)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    specializationId = models.CharField(max_length=30)
    experience = models.IntegerField()
    photo = models.ImageField(upload_to='photos', blank=True)
    category = models.IntegerField()
    price = models.IntegerField()
    degree = models.CharField(max_length=30)
    rating = models.IntegerField(default=0, validators=[
                                 MaxValueValidator(10), MinValueValidator(0)])
    homepage = models.CharField(max_length=30)


class Client(Person):
    bloodGroup = models.IntegerField(
        validators=[MaxValueValidator(4), MinValueValidator(0)])
    emergencyPhoneNumber = models.CharField(max_length=20)
    registrationDate = models.DateTimeField(auto_now_add=True)


class Appointment(models.Model):
    createdate = models.DateTimeField()
    date = models.DateTimeField()
    patient = models.ForeignKey(Client, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Employee, on_delete=models.CASCADE)
