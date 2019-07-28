from django.contrib import admin

from .models import PepparInsight
from .models import RelationInsight

class PepparInsightAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'uuid')
    
class RelationInsightAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'uuid')
    
admin.site.register(PepparInsight, PepparInsightAdmin)
admin.site.register(RelationInsight, RelationInsightAdmin)
