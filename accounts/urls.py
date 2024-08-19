from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name="register"),
    path('login/', views.login, name="login"),
    path('is_logged_in/', views.is_logged_in, name="is_logged_in"),
    path('logout/', views.logout_view, name="logout"),
]