from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'endpoint': '/notes',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post requests'
        },
        {
            'endpoint': '/notes/id',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'endpoint': '/notes/id',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)



@api_view(['GET', 'POST'])
def getNotes(request):
    # Get all notes
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    # Create note
    if request.method == 'POST':
        data = request.data
        note = Note.objects.create(
            body=data['body']
        )
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk):
    # Get Note (id)
    if request.method == 'GET':
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    
    # Update Note
    if request.method == 'PUT':
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    
    # Delete Note
    if request.method == 'DELETE':
        note = Note.objects.get(id=pk)
        note.delete()
        return Response('Note was deleted')
        