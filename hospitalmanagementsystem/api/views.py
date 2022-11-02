from rest_framework.response import Response 
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Department
from api.serializers import DepartmentSerializer

from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse

import io
from rest_framework.parsers import JSONParser


# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/appointment/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of appointments'
        },
        {
            'Endpoint': '/appointment/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/appointment/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new appointment with data sent in post request'
        },
        {
            'Endpoint': '/appointment/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing appointment with data sent in post request'
        },
        {
            'Endpoint': '/appointment/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting appointment'
        },
    ]
    return Response(routes)

@api_view(['POST'])
def registerPage(request):
    print(request)
    return Response('REGISTRATION FORM')

@api_view(['GET'])
def getAppointments(request):
    return Response('APPOINTMENTS')

@api_view(['GET'])
def getDepartments(request):
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    print(serializer)
    return JsonResponse({'data': serializer.data})


@api_view(['POST'])
def createDepartments(request):
    
    newDepartment = Department(name = request.data)
    newDepartment.save()
    print(f"Created new department: {newDepartment.name}")
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    print(serializer)
    return Response('Done')