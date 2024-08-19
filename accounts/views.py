from django.contrib.auth import authenticate, login as auth_login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth import logout
from django.http import JsonResponse


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'})
    return Response(serializer.errors)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=email, password=password)
    if user is not None:
        auth_login(request, user)
        return Response({'message': 'Login successfully'})
    return Response({'error': 'Invalid credentials'})

@api_view(['GET'])
def is_logged_in(request):
    return Response({'is_logged_in': request.user.is_authenticated})

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})
