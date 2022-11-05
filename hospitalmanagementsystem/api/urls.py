from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    # Authentication
    path('register/', views.RegisterView.as_view(), name="auth_register"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('department/', views.getDepartments, name="departments"),
    path('department/<str:pk>/', views.getDepartment, name="department"),

    path('appointments/', views.getAppointments, name="appointments"),

    path('client/', views.getClients, name="departments"),
    path('client/<str:pk>/', views.getClient, name="department"),
]
