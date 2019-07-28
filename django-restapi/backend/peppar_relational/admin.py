from django.contrib import admin

from .models import Relation

# Register your models here.
class RelationAdmin(admin.ModelAdmin):
    list_display = ('pepparA', 'name', 'pepparB', 'uuid',)
    
# Register your models here.
admin.site.register(Relation, RelationAdmin)
