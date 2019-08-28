from rest_framework import serializers

from .models import PACOVType, PACOVSubType, RelationType, RelationSubType, DefaultScheme

class PACOVTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PACOVType
        fields = ('__all__')

class RelationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelationType
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
