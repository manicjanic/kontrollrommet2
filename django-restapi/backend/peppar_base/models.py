import uuid as uuid_field
from django.db import models
from jsonfield import JSONField

from catalog.models import PepparType

# PEPPAR CORE MODEL
class Peppar(models.Model):
    #Unique identification
    uuid = models.UUIDField(default=uuid_field.uuid4, unique=True, editable=False)
    # Type specification of PEPPAR
    type = models.ForeignKey(PepparType, on_delete=models.CASCADE)
    # Derived Name
    name = models.CharField(max_length=300, editable=False, blank=True)
    # The two Name Elements
    nameA_meaning = models.CharField(max_length=300, blank=True)
    nameA = models.CharField(max_length=300, blank=True)
    nameB_meaning = models.CharField(max_length=300, blank=True)
    nameB = models.CharField(max_length=300, blank=True)
    # The two Time Elements
    dateA_meaning = models.CharField(max_length=300, blank=True)
    dateA = models.DateTimeField(blank=True, null=True)
    dateB_meaning = models.CharField(max_length=300, blank=True)
    dateB = models.DateTimeField(blank=True, null=True)
    # Unique identifier Element
    idcode_meaning = models.CharField(max_length=300, blank=True)
    idcode = models.CharField(max_length=25, blank=True)
    # A question
    question_meaning = models.CharField(max_length=300, blank=True)
    question = models.BooleanField(blank=True, null=True)
    # All other specifications
    specific_data = JSONField(null=True, blank=True)

    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    #Constructing the Name field based on data in other fields
    def save(self):
        if self.nameA or self.nameB:
            name = self.nameA + ' ' + self.nameB

        self.name = name
        super(Peppar, self).save()

    def __str__(self):
        return self.name
