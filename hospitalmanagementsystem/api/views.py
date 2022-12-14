from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.decorators import login_required, permission_required

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group, Permission
from api.models import Department, Client, Person, Employee, Appointment
from api.serializers import DepartmentSerializer, ClientSerializer, EmployeeSerializer, UserSerializer, AppointmentSerializer

# Views


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


def getUserData(serializer):
    """
    Get user information
    Arguments:
        serializer: object serializer 
    Returns:
        Dictionary of user information
    """
    account = User.objects.get(id=int(serializer['account']))
    newResponse = {"username": account.username,
                   "email": account.email,
                   "first_name": account.first_name,
                   "last_name": account.last_name}
    newResponse.update(serializer)
    return newResponse

# Routes


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'register/',
            'login/',
            'login/refresh',
        }
    ]
    content_type = ContentType.objects.get_for_model(Department)
    post_permission = Permission.objects.filter(content_type=content_type)
    print([perm.codename for perm in post_permission])
    return Response(routes)

# Departments


@api_view(['GET', 'POST'])
def getDepartments(request):
    """
    List all departments, or create a new department.
    """
    print(request.user.has_perm("api.view_department"))
    if request.method == 'GET':
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DepartmentSerializer(data=request.data)
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
        serializer = DepartmentSerializer(
            instance=department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Clients


@api_view(['GET', 'POST'])
def getClients(request):
    """
    List all clients, or create a new client.
    """
    if request.method == 'GET':
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        clientsInfo = [getUserData(user) for user in serializer.data]
        return Response(clientsInfo)

    if request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def getClient(request, pk):
    """
    Retrieve, update or delete a department.
    """
    try:
        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClientSerializer(client, many=False)
        account = User.objects.get(id=int(serializer.data['account']))
        newResponse = {"username": account.username,
                       "email": account.email,
                       "first_name": account.first_name,
                       "last_name": account.last_name}
        newResponse.update(serializer.data)
        return Response(newResponse)

    if request.method == 'PUT':
        serializer = ClientSerializer(instance=client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Doctors


@api_view(['GET', 'POST'])
def getEmployees(request):
    """
    List all employees, or create a new employee.
    """
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        employeesInfo = [getUserData(user) for user in serializer.data]
        return Response(employeesInfo)

    if request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def getEmployee(request, pk):
    """
    Retrieve, update or delete a employee.
    """
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee, many=False)
        completeInformation = getUserData(serializer.data)
        return Response(completeInformation)

    if request.method == 'PUT':
        serializer = EmployeeSerializer(instance=employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Appointments


@api_view(['GET'])
def getAppointments(request):
    return Response('APPOINTMENTS')


@api_view(['GET', 'POST'])
def getAppointments(request):
    """
    List all employees, or create a new appointment.
    """
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer)

    if request.method == 'POST':
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def getAppointment(request, pk):
    """
    Retrieve, update or delete a appointment.
    """
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AppointmentSerializer(appointment, many=False)
        return Response(serializer)

    if request.method == 'PUT':
        serializer = AppointmentSerializer(
            instance=appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
