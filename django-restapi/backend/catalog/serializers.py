from rest_framework import serializers

from .models import CoreType, PACOVSubType, CoreRelationType, RelationSubType, DefaultScheme

class CoreTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreType
        fields = ('__all__')

class CoreRelationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreRelationType
        fields = ( '__all__' )

class PACOVSubTypeSerializer(serializers.ModelSerializer):
    defaultscheme = serializers.SlugRelatedField(read_only=True, slug_field='scheme')
    class Meta:
        model = PACOVSubType
        fields = ( '__all__' )

class RelationSubTypeSerializer(serializers.ModelSerializer):
    defaultscheme = serializers.SlugRelatedField(read_only=True, slug_field='scheme')
    class Meta:
        model = RelationSubType
        fields = ('__all__')
