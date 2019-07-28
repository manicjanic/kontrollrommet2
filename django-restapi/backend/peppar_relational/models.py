import uuid as uuid_field
from django.db import models

from peppar_base.models import Peppar

# PEPPAR RELATIONAL MODEL
class PepparRelation(models.Model):
    RELATION_TYPES = [
        ('Styreleder', 'Styreleder'),
        ('Styremedlem', 'Styremedlem'),
    ]

    #Identification fields
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=120, editable=False, blank=True)
    #Categorization
    type_name = models.CharField(max_length=120, choices=RELATION_TYPES)
    #Peppars connected
    pepparA = models.ForeignKey(Peppar, related_name="pepparA", on_delete=models.CASCADE)
    pepparB = models.ForeignKey(Peppar, related_name="pepparB", on_delete=models.CASCADE)
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    #Constructing the Name field based on data in other fields
    def save(self):
        name = self.pepparA.name + ' - ' + self.type_name + ' - ' +  self.pepparB.name
        self.name = name
        super(PepparRelation, self).save()

    def __str__(self):
        return self.name