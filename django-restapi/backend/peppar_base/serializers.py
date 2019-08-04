from rest_framework import serializers
from .models import Peppar

class PepparSerializer(serializers.ModelSerializer):
    class Meta:
        model = Peppar
        fields = ('__all__')
        read_only_fields = ('uuid', 'name')

    # Establish a fields argument to dynamically choose wich fields to serialize
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        # Instantiate the superclass normally
        super(PepparSerializer, self).__init__(*args, **kwargs)
        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

