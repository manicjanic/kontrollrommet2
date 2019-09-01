import uuid as uuid_field
from django.db import models
from django.contrib.postgres.fields import JSONField

from catalog.models import CoreType, Category
from catalog.models import CoreRelationType

# PACOV CORE MODEL
class PACOV(models.Model):
    #Unique identification
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    # Category Specification
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    # The Name Element
    name = models.CharField(max_length=500, blank=True)
    # The two Time Elements
    started = models.DateTimeField(blank=True, null=True)
    ended = models.DateTimeField(blank=True, null=True)
    # Identifier Element
    idcode = models.CharField(max_length=25, blank=True)
    # A question
    question = models.BooleanField(blank=True, null=True)
    # All other specifications
    specific_data = JSONField(null=True, blank=True)

    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        ordering = ['category']

    #If no Name has been made before this step, name field is created based on data in other fields
    def save(self, *args, **kwargs):
        if not self.name:
            if self.started:
                self.name = self.category.name + " of " + str(self.started.year) 
            else:
                self.name = "A " + self.category.name 
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name + " (" + self.category.coretype.pacov_type + ")"


# PACOV RELATIONAL MODEL
class Relation(models.Model):
    #Unique identification
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    # Type specification of Relation
    type = models.ForeignKey(CoreRelationType, on_delete=models.CASCADE, blank=False, null=False)
    # Name
    name = models.CharField(max_length=500, blank=True )
    #PACOVs connected
    pacovA = models.ForeignKey(PACOV, related_name="pacovA", on_delete=models.CASCADE, blank=False, null=False)
    pacovB = models.ForeignKey(PACOV, related_name="pacovB", on_delete=models.CASCADE, blank=False, null=False)
    # The two Time Elements
    started = models.DateTimeField(blank=True, null=True)
    ended = models.DateTimeField(blank=True, null=True)
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
        unique_together = ['pacovA', 'pacovB', 'type']

    #Function to define default value of name
    def save(self, *args, **kwargs):
        if not self.name:
            self.name =  self.pacovA.name + " - " + self.type.name + " - " + self.pacovB.name
        super().save(*args, **kwargs)
        
    def __str__(self):
        return self.name
