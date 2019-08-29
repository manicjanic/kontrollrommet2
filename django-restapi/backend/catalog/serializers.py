from rest_framework import serializers

from .models import CoreType, Category, CoreRelationType, DefaultScheme

class CoreTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreType
        fields = ('__all__')

class CoreRelationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreRelationType
        fields = ( '__all__' )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ( '__all__' )

class DefaultSchemeSerializer(serializers.ModelSerializer):
    scheme = serializers.JSONField()
    class Meta:
        model = DefaultScheme
        fields = ('id', 'scheme', 'category_related', 'corerelation_related' )
