from django.contrib import admin

from .models import Relation, RelationType

# Register your models here.
class RelationAdmin(admin.ModelAdmin):
    list_display = ('pepparA', 'name', 'pepparB', 'uuid',)

class RelationTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)    

# Register your models here.
admin.site.register(Relation, RelationAdmin)
admin.site.register(RelationType, RelationTypeAdmin)
