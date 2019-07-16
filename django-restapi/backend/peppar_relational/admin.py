from django.contrib import admin

from .models import PepparRelation

# Register your models here.
class PepparRelationAdmin(admin.ModelAdmin):
    list_display = ('pepparA', 'name', 'pepparB', 'uuid_field',)
    
# Register your models here.
admin.site.register(PepparRelation, PepparRelationAdmin)
