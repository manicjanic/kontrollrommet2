from django.db import models

# PEPPAR Types
class PepparType(models.Model):
    # The six types in the PEPPAR model    
    PEPPAR_TYPE = [
        ('PERSON', 'Person Type'),
        ('ENTITY', 'Entity Type'),
        ('PROPERTY', 'Property Type'),
        ('PLAN', 'Plan Type'),
        ('ACTION', 'Action Type'),
        ('RESULT', 'Result Type'),
    ]

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=8, choices=PEPPAR_TYPE)

    def __str__(self):
        return self.name + " - " + self.type

# Relation Types
class RelationType(models.Model):
    
    RELATION_TYPE = [
        ('PER-PER', 'PER-PER'),
        ('PLA-PLA', 'PLA-PLA'),
        ('PER-ENT', 'PER-ENT'),
        ('PER-PLA', 'PER-PLA'),
        ('ENT-PLA', 'ENT-PLA'),
        ('PLA-ACT', 'PLA-ACT'),
        ('PLA-RES', 'PLA-RES'),
        ('PLA-PRO', 'PLA-PRO'),

    ]

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=7, choices=RELATION_TYPE)

    def __str__(self):
        return self.name + " - " + self.type

