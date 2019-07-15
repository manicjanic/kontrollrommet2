from rest_framework import serializers
from .models import Peppar

class PepparSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peppar
        fields = ('name', 'type', 'uuid_field',)
        #read_only_fields = ('uuid_field',)