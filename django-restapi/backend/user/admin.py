from django.contrib import admin
# Register your models here.
from .models import UserAccess

# Register your models here.
class UserAccessAdmin(admin.ModelAdmin):
    list_display = ('get_user', 'get_peppar', 'level',)

    def get_user(self, obj):
        return obj.user.username

    def get_peppar(self, obj):
        return obj.peppar.name
    
    
# Register your models here.
admin.site.register(UserAccess, UserAccessAdmin)
