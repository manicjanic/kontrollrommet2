import uuid as uuid_field
from django.db import models

from peppar_base.models import Peppar
from catalog.models import RelationType

# PEPPAR RELATIONAL MODEL
class Relation(models.Model):
    #Identification fields
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=120, editable=False, blank=True)
    # PS! Needs to be refactored into a foreign key field with a related list
    type = models.ForeignKey(RelationType, on_delete=models.CASCADE)
    #Peppars connected
    pepparA = models.ForeignKey(Peppar, related_name="pepparA", on_delete=models.CASCADE)
    pepparB = models.ForeignKey(Peppar, related_name="pepparB", on_delete=models.CASCADE)
    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    #Constructing the Name field based on data in other fields
    def save(self):
        name = self.pepparA.name + ' - ' + self.type.name + ' - ' +  self.pepparB.name
        self.name = name
        super(Relation, self).save()

    def __str__(self):
        return self.name