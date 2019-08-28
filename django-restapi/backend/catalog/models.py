from django.db import models
from jsonfield import JSONField


# Core Types
class CoreType(models.Model):
    # The six types in the PACOV model    
    PACOV_TYPE = [
        ('PERSON', 'PERSON'),
        ('ACTION', 'ACTION'),
        ('CONCEPT', 'CONCEPT'),
        ('OBJECT', 'OBJECT'),
        ('VALUE', 'VALUE'),
    ]

    name = models.CharField(max_length=50)
    pacov_type = models.CharField(max_length=8, choices=PACOV_TYPE, null=False)
    sub_data = JSONField(null=True, blank=True)
    description= models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['pacov_type']

    def __str__(self):
        return self.pacov_type + "/" + self.name

# Core Relation Types
class CoreRelationType(models.Model):
    
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
        ('CON-CON', '(CON-CON)')
    ]

    name = models.CharField(max_length=50)
    pacovrelation_type = models.CharField(max_length=7, choices=RELATION_TYPE)
    sub_data = JSONField(null=True, blank=True)
    description= models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['pacovrelation_type']

    def __str__(self):
        return self.name + "/" + self.pacovrelation_type


# Default Schemes for all types
class DefaultScheme(models.Model):
    scheme = JSONField(null=True, blank=True)

    def __str__(self):
        return str(self.scheme)

# PACOV Sub-Types
class PACOVSubType(models.Model):
    coretype = models.ForeignKey(CoreType, on_delete=models.CASCADE, blank=False, null=False)
    name = models.CharField(max_length=50)
    defaultscheme = models.ForeignKey(DefaultScheme, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.coretype.name + ": " + self.name

# PACOV Relational Sub-Types
class RelationSubType(models.Model):
    coretype = models.ForeignKey(CoreType, on_delete=models.CASCADE, blank=False, null=False)
    name = models.CharField(max_length=50)
    defaultscheme = models.ForeignKey(DefaultScheme, on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return self.coretype.name + ": " + self.name
