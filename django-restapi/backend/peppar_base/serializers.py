from rest_framework import serializers
from .models import Person, Entity, Property, Plan, Action, Result

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('uuid_field', 'name')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }

class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = ('uuid_field', 'name')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('uuid_field', 'name')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ('uuid_field', 'name')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ('uuid_field', 'name')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ('uuid_field', 'name')
        read_only_fields = ('uuid_field',)
        lookup_field = 'uuid_field'
        extra_kwargs = {
            'url': {'lookup_field': 'uuid_field'}
        }
