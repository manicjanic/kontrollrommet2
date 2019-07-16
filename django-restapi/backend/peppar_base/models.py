import uuid
from django.db import models

# PEPPAR CORE MODEL
class Peppar(models.Model):
    # The six types in the PEPPAR model
    PEPPAR_TYPE_BREAKDOWN = [
        ('PERSON', 'Person'),
        ('ENTITY', 'Entity'),
        ('PROPERTY', 'Property'),
        ('PLAN', 'Plan'),
        ('ACTION', 'Action'),
        ('RESULT', 'Result'),
    ]
    #Identification fields
    uuid_field = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    type = models.CharField(max_length=8, choices=PEPPAR_TYPE_BREAKDOWN)
    name = models.CharField(max_length=120, editable=False, blank=True)

    #PERSON fields
    person_firstname = models.CharField(max_length=50, blank=True)
    person_lastname = models.CharField(max_length=100, blank=True)
    person_email = models.EmailField(blank=True)
    person_cellphonenumber = models.CharField(max_length=25, blank=True)
    #ENTITY fields
    entity_name = models.CharField(max_length=120, blank=True)
    entity_orgnr = models.CharField(max_length=25, blank=True)
    #PROPERTY fields
    property_streetname = models.CharField(max_length=120, blank=True)
    property_streetnumber = models.CharField(max_length=10, blank=True)
    property_zipcode = models.CharField(max_length=20, blank=True)
    property_city = models.CharField(max_length=80, blank=True)
    property_country = models.CharField(max_length=80, blank=True)

    #PLAN fields
    
    #ACTION fields
    
    #RESULT fields

    #Timestamps
    timestamp_created = models.DateTimeField(auto_now_add=True, editable=False)
    timestamp_updated = models.DateTimeField(auto_now=True, editable=False)

    #Constructing the Name field based on data in other fields
    def save(self):
        if self.person_firstname or self.person_lastname:
            name = self.person_firstname + ' ' + self.person_lastname
        elif self.entity_name:
            name = self.entity_name
        elif self.property_streetname:
            name = self.property_streetname + ' ' + self.property_streetnumber

        self.name = name
        super(Peppar, self).save()

    def __str__(self):
        return self.name
