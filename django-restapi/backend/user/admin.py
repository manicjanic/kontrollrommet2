from django.contrib import admin
# Register your models here.
from .models import UserPeppar
from .models import UserPepparRelation

# Register your models here.
class UserPepparAdmin(admin.ModelAdmin):
    list_display = ('get_user', 'get_peppar', 'level', 'timestamp_updated')

    def get_user(self, obj):
        return obj.user.username

    def get_peppar(self, obj):
        return obj.peppar.name
    
# Register your models here.
class UserPepparRelationAdmin(admin.ModelAdmin):
    list_display = ('get_user', 'get_pepparrelation', 'level',)

    def get_user(self, obj):
        return obj.user.username

    def get_pepparrelation(self, obj):
        return obj.pepparrelation
    
    
# Register your models here.
admin.site.register(UserPeppar, UserPepparAdmin)
admin.site.register(UserPepparRelation, UserPepparRelationAdmin)
