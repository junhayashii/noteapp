from rest_framework.serializers import ModelSerializer
from .models import Note, Folder

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class FolderSerializer(ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    class Meta:
        model = Folder
        fields = '__all__'