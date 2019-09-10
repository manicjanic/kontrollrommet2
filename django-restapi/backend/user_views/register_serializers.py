from rest_framework import serializers
from .models import PACOV, Relation
from user_views.models import PACOVInsight, RelationInsight

# Special Serializer that autosaves instance in PacovInsight model upon save
class RegisterPacovSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PACOV
        fields = ('uuid', 'name', 'category', 'started', 'ended', 'idcode', 'question', 'specific_data')
        read_only_fields = ('uuid',)

    def create(self, validated_data):
        pacov = PACOV.objects.create(**validated_data)
        user = self.context['request'].user
        PACOVInsight.objects.create(user=user, pacov=pacov, level="1")        
        return pacov

# Special Serializer that autosaves instance in RelationInsight model upon save
class RegisterRelationSerializer(serializers.ModelSerializer):
    pacovA = serializers.SlugRelatedField(slug_field='uuid', queryset=PACOV.objects.all())
    pacovB = serializers.SlugRelatedField(slug_field='uuid', queryset=PACOV.objects.all())

    class Meta:
        model = Relation
        fields = ('uuid', 'name', 'type', 'pacovA', 'pacovB', 'started', 'ended', 'idcode', 'question', 'specific_data')
        read_only_fields = ( 'uuid', )

    def create(self, validated_data):
        relation = Relation.objects.create(**validated_data)
        user = self.context['request'].user
        RelationInsight.objects.create(user=user, relation=relation, level="1")        
        return relation