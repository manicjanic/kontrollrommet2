from rest_framework import serializers
from .models import PACOV, Relation


class PACOVSerializer(serializers.ModelSerializer):

    class Meta:
        model = PACOV
        fields = ('uuid', 'name', 'type', 'dateA', 'dateB', 'idcode', 'question', 'specific_data')
        read_only_fields = ('uuid',)

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
        fields = ('uuid', 'name', 'type', 'pacovA', 'pacovB', 'dateA', 'dateB', 'idcode', 'question', 'specific_data')
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

