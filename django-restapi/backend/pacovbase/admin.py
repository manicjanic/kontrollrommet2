from django.contrib import admin

from .models import PACOV, Relation

class PACOVAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'timestamp_created')
    ordering = ['-timestamp_created']

class RelationAdmin(admin.ModelAdmin):
    list_display = ('name', 'pacovA', 'type', 'pacovB')
    ordering = ['-timestamp_created']

admin.site.register(PACOV, PACOVAdmin)
admin.site.register(Relation, RelationAdmin)
