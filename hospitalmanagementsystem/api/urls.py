from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('appointments/', views.getAppointments, name="appointments"),
    path('register/', views.registerPage, name="register"),
    path('example/', views.example_view, name="example")
]
