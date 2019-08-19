from django.contrib import admin

from .models import PACOV, Relation

# Register your models here.
class PACOVAdmin(admin.ModelAdmin):
    list_display = ('name', 'type',)

class RelationAdmin(admin.ModelAdmin):
    list_display = ('pacovA', 'type', 'pacovB', 'name')

# Register your models here.
admin.site.register(PACOV, PACOVAdmin)
admin.site.register(Relation, RelationAdmin)
