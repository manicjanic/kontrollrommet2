from django.contrib import admin

from .models import PepparAsUser
from .models import PepparRelationAsUser

class PepparAsUserAdmin(admin.ModelAdmin):
    list_display = ('get_user', 'get_peppar', 'level', 'timestamp_updated')

    def get_user(self, obj):
        return obj.user.username

    def get_peppar(self, obj):
        return obj.peppar.name
    
class PepparRelationAsUserAdmin(admin.ModelAdmin):
    list_display = ('get_user', 'get_pepparrelation', 'level',)

    def get_user(self, obj):
        return obj.user.username

    def get_pepparrelation(self, obj):
        return obj.pepparrelation
    
    
admin.site.register(PepparAsUser, PepparAsUserAdmin)
admin.site.register(PepparRelationAsUser, PepparRelationAsUserAdmin)
