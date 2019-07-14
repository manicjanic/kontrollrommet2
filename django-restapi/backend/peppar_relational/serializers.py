from rest_framework import serializers
from .models import PepparRelation

class PepparRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PepparRelation
        fields = ('pepparA', 'name', 'pepparB', 'uuid_field',)
        read_only_fields = ('uuid_field',)