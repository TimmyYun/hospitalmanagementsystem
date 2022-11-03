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

    class Meta:
        abstract = True

class Employees(Person):
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
    email = models.CharField(max_length=20, blank = True)
    departmentId = models.ForeignKey(Department, on_delete=models.CASCADE)
    specializationId = models.CharField(max_length=30)
    experience = models.IntegerField()
    photo = models.ImageField(upload_to='photos') 
    category = models.IntegerField()
    price = models.IntegerField()
    degree = models.CharField(max_length=30)
    rating = models.IntegerField(default = 0, validators=[MaxValueValidator(10), MinValueValidator(0)])
    homepage = models.CharField(max_length=30)
    
# class Clients(models.Model):
    
#     CREATE TABLE Patients (
# --       TheDay INT NOT NULL,
# --       TheMonth INT NOT NULL,
# --       TheYear INT NOT NULL,
#       DateOfBirth INT NOT NULL,
#             IINnumber INT NOT NULL,
#             PatientID INT NOT NULL,
#             TheName VARCHAR(20) NOT NULL,
#             Surname VARCHAR(20) NOT NULL,
#             MiddleName VARCHAR(20),
#             BloodGroup INT NOT NULL,
#             EmergencyConstantNumber INT NOT NULL,
#             ContactNumber INT NOT NULL,
#             Email VARCHAR(20),
#             Adress VARCHAR(50) NOT NULL,
#             MartialStatus VARCHAR(20) NOT NULL,
#             RegistrationDate INT NOT NULL,
#       PRIMARY KEY(PatientID)
#             );