from rest_framework.response import Response 
from rest_framework.decorators import api_view

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