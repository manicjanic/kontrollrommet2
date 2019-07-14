import uuid

from django.db import models

# PEPPAR CORE MODEL
class Peppar(models.Model):
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
    
    name = models.CharField(max_length=120)
    
    #PERSON fields
    #Contact fields
    person_firstname = models.CharField(max_length=50, blank=True)
    person_lastname = models.CharField(max_length=100, blank=True)
    person_email = models.EmailField(blank=True)
    person_cellphonenumber = models.CharField(max_length=25, blank=True)

    #ENTITY fields
    
    #PROPERTY fields
    
    #PLAN fields
    
    #ACTION fields
    
    #RESULT fields

    
    def __str__(self):
        return self.name
