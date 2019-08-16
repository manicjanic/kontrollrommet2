from django.db import models

# PEPPAR Types
class PepparType(models.Model):
    # The six types in the PEPPAR model    
    PEPPAR_TYPE = [
        ('PERSON', 'PERSON'),
        ('ENTITY', 'ENTITY'),
        ('PROPERTY', 'PROPERTY'),
        ('PLAN', 'PLAN'),
        ('ACTION', 'ACTION'),
        ('RESULT', 'RESULT'),
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
        ('PER-ENT', '(PER-ENT)'),
        ('PER-PRO', '(PER-PRO)'),
        ('PER-PLA', '(PER-PLA)'),
        ('PER-ACT', '(PER-ACT)'),
        ('PER-RES', '(PER-RES)'),
        ('ENT-PRO', '(ENT-PRO)'),
        ('ENT-PLA', '(ENT-PLA)'),
        ('ENT-ACT', '(ENT-ACT)'),
        ('ENT-RES', '(ENT-RES)'),
        ('PRO-PLA', '(PRO-PLA)'),
        ('PRO-ACT', '(PRO-ACT)'),
        ('PRO-RES', '(PRO-RES)'),
        ('PLA-ACT', '(PLA-ACT)'),
        ('PLA-RES', '(PLA-RES)'),
        ('ACT-RES', '(ACT-RES)'),
        ('PER-PER', '(PER-PER)'),
        ('ENT-ENT', '(ENT-ENT)'),
        ('PRO-PRO', '(PRO-PRO)'),
        ('PLA-PLA', '(PLA-PLA)'),
        ('ACT-ACT', '(ACT-ACT)'),
        ('RES-RES', '(RES-RES)'),
    ]

    name = models.CharField(max_length=50)
    type = models.CharField(max_length=7, choices=RELATION_TYPE)

    class Meta:
        ordering = ['type']

    def __str__(self):
        return self.name + "/" + self.type

