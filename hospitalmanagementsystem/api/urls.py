from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('appointments/', views.getAppointments, name="appointments"),
    path('register/', views.registerPage, name="register"),
    path('department/', views.getDepartments, name="departments"),
    path('department/<str:pk>/', views.getDepartment, name="department"),
    path('client/', views.getClients, name="departments"),
    path('client/<str:pk>/', views.getClient, name="department"),
]
