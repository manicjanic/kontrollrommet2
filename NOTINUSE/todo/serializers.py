from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('uuid', 'todo_description', 'todo_responsible', 'todo_priority', 'todo_completed')
        read_only_fields = ('uuid',)
        lookup_field = 'uuid'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
