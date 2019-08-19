from django.contrib import admin

from .models import PACOVType, RelationType

class PACOVTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)    

class RelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type')    

admin.site.register(PACOVType, PACOVTypeAdmin)
admin.site.register(RelationType, RelationTypeAdmin)
