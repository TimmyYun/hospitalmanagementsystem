from django.db import models

class Administration_Staff(models.Model):
    id = models.AutoField(primary_key=True)
    requests = models.TextField

class Hospital_Staff(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    middleName = models.CharField(max_length=20)
    address = models.CharField(max_length=50)
    phoneNumber = models.PhoneNumberField(max_length=15)
    email = models.EmailField(max_length=254)

class Department(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20)
    
class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    qualifications = models.CharField(max_length=50)

class Patient(models.Model):
    governmentId = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    middleName = models.CharField(max_length=20)
    address = models.CharField(max_length=50)
    phoneNumber = models.PhoneNumberField(max_length=15)

class Service(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    cost = models.IntegerField
    contradictions = models.TextField
    description = models.TextField

class Appointments(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)

class Treatment(models.Model):
    id = models.AutoField(primary_key=True)

class Treatment_Entry(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)

class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    content = models.TextField
