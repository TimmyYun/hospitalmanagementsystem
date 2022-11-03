from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

# class User(models.Model):
    
class Department(models.Model):
    name = models.CharField(max_length=20)

class Person(models.Model):
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    middlename = models.CharField(max_length=20, blank = True)
    dateOfBirth = models.DateField()
    iin = models.CharField(max_length=20)
    phoneNumber = models.CharField(max_length=20)
    address = models.CharField(max_length=50, blank = True)
    email = models.CharField(max_length=20, blank = True)
    maritalStatus = models.CharField(max_length=20, blank = True)
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
    departmentId = models.ForeignKey(Department, on_delete=models.CASCADE)
    specializationId = models.CharField(max_length=30)
    experience = models.IntegerField()
    photo = models.ImageField(upload_to='photos', blank = True) 
    category = models.IntegerField()
    price = models.IntegerField()
    degree = models.CharField(max_length=30)
    rating = models.IntegerField(default = 0, validators=[MaxValueValidator(10), MinValueValidator(0)])
    homepage = models.CharField(max_length=30)
    
class Client(models.Model):
    bloodGroup = models.IntegerField(validators=[MaxValueValidator(4), MinValueValidator(0)])
    emergencyPhoneNumber = models.CharField(max_length=20)
    registrationDate = models.DateTimeField(auto_now_add = True)
