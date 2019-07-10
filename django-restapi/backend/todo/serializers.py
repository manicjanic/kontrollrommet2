from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('uuid_field', 'todo_description', 'todo_responsible', 'todo_priority', 'todo_completed')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }
