from rest_framework import serializers

from .models import CoreType, Category, CoreRelationType, DefaultScheme

class CoreTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreType
        fields = ('__all__')

class CoreRelationTypeSerializer(serializers.ModelSerializer):
    defaultscheme = serializers.SlugRelatedField(many=False, read_only=True, slug_field='scheme')
    class Meta:
        model = CoreRelationType
        fields = ( '__all__' )

class CategorySerializer(serializers.ModelSerializer):
    defaultscheme = serializers.SlugRelatedField(many=False, read_only=True, slug_field='scheme')

    class Meta:
        model = Category
        fields = ('id', 'name', 'defaultscheme')

class DefaultSchemeSerializer(serializers.ModelSerializer):
    scheme = serializers.JSONField()
    class Meta:
        model = DefaultScheme
        fields = ('id', 'scheme', 'category_related', 'corerelation_related' )

