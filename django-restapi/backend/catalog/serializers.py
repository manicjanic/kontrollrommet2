from rest_framework import serializers

from .models import CoreType, Category, CoreRelationType, Schema

class CoreTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreType
        fields = ('__all__')

class CoreRelationTypeSerializer(serializers.ModelSerializer):
    schema = serializers.SlugRelatedField(many=False, read_only=True, slug_field='specific_data_schema')
    class Meta:
        model = CoreRelationType
        fields = ( '__all__' )

class CategorySerializer(serializers.ModelSerializer):
    #schema = serializers.SlugRelatedField(many=False, read_only=True, slug_field='specific_data_schema')

    class Meta:
        model = Category
        fields = ('__all__')

class SchemaSerializer(serializers.ModelSerializer):
    specific_data_schema = serializers.JSONField()
    class Meta:
        model = Schema
        fields = ('id', 'specific_data_schema', 'category_related', 'corerelation_related' )

