from django.db import models

# PEPPAR Types
class PepparType(models.Model):
    # The six types in the PEPPAR model    
    PEPPAR_TYPE = [
        ('PERSON', 'PERSON'),
        ('ACTION', 'ACTION'),
        ('CONCEPT', 'CONCEPT'),
        ('OBJECT', 'OBJECT'),
        ('VALUE', 'VALUE'),
    ]

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=8, choices=PEPPAR_TYPE)

    class Meta:
        ordering = ['type']

    def __str__(self):
        return self.type + "/" + self.name

# Relation Types
class RelationType(models.Model):
    
    RELATION_TYPE = [
        ('PER-OBJ', '(PER-OBJ)'),
        ('PER-ACT', '(PER-ACT)'),
        ('PER-CON', '(PER-CON)'),
        ('OBJ-VAL', '(OBJ-VAL)'),
        ('ACT-VAL', '(ACT-VAL)'),
        ('ACT-OBJ', '(ACT-OBJ)'),
        ('CON-ACT', '(CON-ACT)'),
        ('CON-VAL', '(CON-VAL)'),
        ('CON-OBJ', '(CON-OBJ)'),
        
    ]

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=7, choices=RELATION_TYPE)

    class Meta:
        ordering = ['type']

    def __str__(self):
        return self.name + "/" + self.type

