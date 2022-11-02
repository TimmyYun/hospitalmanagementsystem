from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.contrib.auth.forms import UserCreationForm
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
# Create your views here.

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
    return Response(content)

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

@api_view(['GET'])
def registerPage(request):
    form = UserCreationForm()
    context = {'form': form}
    return Response('REGISTRATION FORM')

@api_view(['GET'])
def getAppointments(request):
    return Response('APPOINTMENTS')