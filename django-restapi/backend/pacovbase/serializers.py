from rest_framework import serializers
from .models import PACOV, Relation


class PACOVSerializer(serializers.ModelSerializer):
    pacov_type = serializers.PrimaryKeyRelatedField(source='type', read_only=True)
    pacov_uuid = serializers.CharField(source='uuid', read_only=True)
    pacov_name = serializers.CharField(source='name', read_only=True)

    class Meta:
        model = PACOV
        fields = ('pacov_type', 'pacov_name', 'pacov_uuid', 'dateA', 'specific_data')
        read_only_fields = ('uuid', 'name')

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
    relation_type = serializers.PrimaryKeyRelatedField(source='type', read_only=True)
    relation_uuid = serializers.CharField(source='uuid', read_only=True)
    relation_name = serializers.CharField(source='name', read_only=True)

    class Meta:
        model = Relation
        fields = ( '__all__' )
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

