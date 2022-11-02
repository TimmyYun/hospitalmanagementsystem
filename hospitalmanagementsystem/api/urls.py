from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('appointments/', views.getAppointments, name="appointments"),
    path('register/', views.registerPage, name="register"),
    path('departments/', views.getDepartments, name="departments"),
    path('departments/create', views.createDepartments, name="departments")
]
