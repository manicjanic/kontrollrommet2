from django.db import models
from jsonfield import JSONField

# PACOV Core Types
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
    description= models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.pacov_type + "/" + self.name

# Core Relation Types
class CoreRelationType(models.Model):   
    name = models.CharField(max_length=50)
    coretypeA = models.ForeignKey(CoreType, related_name='coretypeA', on_delete=models.CASCADE)
    coretypeB = models.ForeignKey(CoreType, related_name='coretypeB', on_delete=models.CASCADE)
    specific_data_schema = JSONField(blank=True, null=True, default=dict)
    schema = models.ForeignKey('Schema', related_name='corerelation_related', on_delete=models.CASCADE, blank=True, null=True)
    description= models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name + "(" + self.coretypeA.name + "<->" + self.coretypeB.name + ")"

# PACOV Category Definition
class Category(models.Model):
    name = models.CharField(max_length=50)
    coretype = models.ForeignKey(CoreType, on_delete=models.CASCADE)
    schema = models.ForeignKey('Schema', related_name='category_related', on_delete=models.CASCADE, blank=True, null=True)
    specific_data_schema = JSONField(blank=True, null=True, default=dict)
    description= models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.coretype) + "/" + self.name

# Default Schemes for all types
class Schema(models.Model):
    specific_data_schema = JSONField(blank=True, null=True, default=dict)

    def __str__(self):
        return str(self.specific_data_schema)
