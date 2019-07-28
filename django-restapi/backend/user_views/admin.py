from django.contrib import admin

from .models import PepparInsight
from .models import PepparRelationAsUser

class PepparInsightAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'uuid')
    
class PepparRelationAsUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'uuid')
    
admin.site.register(PepparInsight, PepparInsightAdmin)
admin.site.register(PepparRelationAsUser, PepparRelationAsUserAdmin)
