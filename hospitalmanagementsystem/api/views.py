from rest_framework.response import Response 
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User

from api.models import Department, Client, Person, Employee
from api.serializers import DepartmentSerializer, ClientSerializer, EmployeeSerializer

# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'login/token',
            'login/token/refresh',
        },
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
    user = User.objects.create_user(request.data)
    # if user.is_valid():
    #     user.save()
    return Response(request.data)

def loginPage(request):
    return Response('Done')

@api_view(['GET'])
def getAppointments(request):
    return Response('APPOINTMENTS')

#Departments

@api_view(['GET', 'POST'])
def getDepartments(request):
    """
    List all departments, or create a new department.
    """
    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':    
        serializer = DepartmentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def getDepartment(request, pk):
    """
    Retrieve, update or delete a department.
    """
    try:
        department = Department.objects.get(pk=pk)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DepartmentSerializer(department, many=False)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = DepartmentSerializer(instance=department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Clients

@api_view(['GET', 'POST'])
@permission_classes([IsAdminUser])
def getClients(request):

    if request.method == 'GET':
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    if request.method == 'POST':    
        newClient = Client(request.data)
        newClient.save()
        print(f"Created new client: {newClient.name}")
        return Response('Done')

@api_view(['GET', 'PUT', 'DELETE'])
def getClient(request, pk):

        if request.method == 'GET':
            client = Client.objects.get(id=pk)
            serializer = ClientSerializer(client, many=False)
            return Response(serializer.data)

        if request.method == 'PUT':
            data = request.data
            client = Client.objects.get(id=pk)
            serializer = ClientSerializer(instance=client, data=data)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
            return serializer.data

        if request.method == 'DELETE':
            client = Client.objects.get(id=pk)
            client.delete()
            return Response(f'Client {pk} was deleted')

