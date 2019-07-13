from rest_framework import serializers
from .models import PepparRelation

class PepparRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PepparRelation
        fields = ('pepparA', 'name', 'pepparB', 'uuid_field',)
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }