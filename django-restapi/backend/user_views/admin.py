from django.contrib import admin

from .models import PACOVInsight
from .models import RelationInsight

class PACOVInsightAdmin(admin.ModelAdmin):
    list_display = ('user', 'level', 'pacov')
    
class RelationInsightAdmin(admin.ModelAdmin):
    list_display = ('user', 'level', 'relation')
    
admin.site.register(PACOVInsight, PACOVInsightAdmin)
admin.site.register(RelationInsight, RelationInsightAdmin)
