import uuid as uuid_field
from django.db import models
from jsonfield import JSONField

from peppar_base.models import Peppar
from catalog.models import RelationType

# PEPPAR RELATIONAL MODEL
class Relation(models.Model):

    #Unique identification
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    # Type specification of Relation
    type = models.ForeignKey(RelationType, on_delete=models.CASCADE, related_name='relation_type')
    # Name
    name = models.CharField(max_length=500, blank=True )
    #Peppars connected
    pepparA = models.ForeignKey(Peppar, related_name="pepparA", on_delete=models.CASCADE)
    pepparB = models.ForeignKey(Peppar, related_name="pepparB", on_delete=models.CASCADE)
    # The two Time Elements
    dateA = models.DateTimeField(blank=True, null=True)
    dateB = models.DateTimeField(blank=True, null=True)
    # Unique identifier Element
    idcode = models.CharField(max_length=25, blank=True)
    # A question
    question = models.BooleanField(blank=True, null=True)
    # All other specifications
    specific_data = JSONField(null=True, blank=True)

    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        ordering = ['type']

    #Function to define default value of name
    def save(self, *args, **kwargs):
        if not self.name:
            self.name =  self.pepparA.name + " - " + self.type.name + "     - " + self.pepparB.name
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name