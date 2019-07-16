from django.contrib import admin

from .models import PepparAsUser
from .models import PepparRelationAsUser

class PepparAsUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'uuid_field')
    
class PepparRelationAsUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'uuid_field')
    
admin.site.register(PepparAsUser, PepparAsUserAdmin)
admin.site.register(PepparRelationAsUser, PepparRelationAsUserAdmin)
