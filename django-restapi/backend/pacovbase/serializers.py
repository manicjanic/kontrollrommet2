from rest_framework import serializers
from .models import PACOV, Relation


class PACOVSerializer(serializers.ModelSerializer):
    
    specific_data = serializers.JSONField(binary=True)
    
    class Meta:
        model = PACOV
        fields = ('uuid', 'name', 'category', 'started', 'ended', 'idcode', 'question', 'specific_data')
        read_only_fields = ('uuid', 'name')

    def create(self, validated_data):
        # Routine for Generating name, based on specific data and type
        jsonfield = validated_data.get('specific_data')
        name = ""
        if jsonfield.get('person_firstname') and jsonfield.get('person_lastname') is not None:
            name = jsonfield.get('person_firstname') + " " + jsonfield.get('person_lastname')
        if jsonfield.get('company_name') is not None:
            name = jsonfield.get('company_name')
        return PACOV.objects.create(name=name, **validated_data)

    # Establish a fields argument to dynamically choose wich fields to serialize
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        # Instantiate the superclass normally
        super(PACOVSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class RelationSerializer(serializers.ModelSerializer):
    pacovA = serializers.SlugRelatedField(slug_field='uuid', queryset=PACOV.objects.all())
    pacovB = serializers.SlugRelatedField(slug_field='uuid', queryset=PACOV.objects.all())

    class Meta:
        model = Relation
        fields = ('uuid', 'name', 'type', 'pacovA', 'pacovB', 'started', 'ended', 'idcode', 'question', 'specific_data')
        read_only_fields = ( 'uuid', )

    # Establish a fields argument to dynamically choose wich fields to serialize
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        # Instantiate the superclass normally
        super(RelationSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

