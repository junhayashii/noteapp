from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/<str:pk>/', views.getNote, name="note"),
    path('folders/', views.getFolders, name='folders'),
    path('folders/<str:pk>/', views.getFolder, name='folder'),
]