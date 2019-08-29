from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                    

from user import views as user 
from pacovbase import views as base_views
from catalog import views as catalog_views 
from user_views import views as user_views
from user_views import register_views as register_views

# FULL CALLS FOR TESTING PURPOSES ONLY
test_router = routers.DefaultRouter()
test_router.register(r'pacovs', base_views.PACOVView, 'pacovs')     
test_router.register(r'relations', base_views.RelationView, 'relation')     
# USER calls
user_router = routers.DefaultRouter()                      
user_router.register(r'pacovs', user_views.PACOVInsightView, 'user_pacovs')     
user_router.register(r'relations', user_views.RelationInsightView, 'user_relations')     
# CATALOG calls
catalog_router = routers.DefaultRouter()
catalog_router.register(r'pacovtype', catalog_views.CoreTypeView, 'pacovtype')     
catalog_router.register(r'relationtype', catalog_views.CoreRelationTypeView, 'relationtype')
catalog_router.register(r'category', catalog_views.CategoryView, 'category')     
catalog_router.register(r'defaultscheme', catalog_views.DefaultSchemeView, 'defaultscheme')     
# REGISTRATION calls
# register_router = routers.DefaultRouter()
# register_router.register(r'pacov', register_views.RegisterPacovView, 'pacov')

urlpatterns = [
    #Full Calls FOR TESTING
    path('api/', include(test_router.urls)), 
    #Django Admin calls
    path('admin/', admin.site.urls), 
    #Catalog calls
    path('api/catalog/', include(catalog_router.urls)),
    #API USER calls
    path('api/user/', include(user_router.urls)),
    # REGISTRATION calls
#    path('api/user/register/', include(register_router.urls)),
    #Standalone calls for user database
    path('usercreate/', user.UserCreate.as_view(), name='user_create'),
    path('userlogin/', user.UserLoginView.as_view(), name="user_login"),
    #Standalone calls for register new entries, following user
    path('api/user/pacov/register', register_views.RegisterPacovView.as_view(), name='registerpacov'),               
    path('api/user/relation/register', register_views.RegisterRelationView.as_view(), name='registerpacov')               

]

"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""