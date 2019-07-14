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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                    

from user import views as user_views 
from peppar_base import views as base_views
from peppar_relational import views as relational_views  
from todo import views as todo_views 

# API Calls
router = routers.DefaultRouter()
router.register(r'todos', todo_views.TodoView, 'todo')     
router.register(r'peppars', base_views.PepparView, 'peppar')     
router.register(r'pepparrelations', relational_views.PepparRelationView, 'pepparrelation')     
# USER calls
user_router = routers.DefaultRouter()                      
user_router.register(r'peppars', user_views.UserPepparView, 'user_peppars')     
user_router.register(r'pepparrelations', user_views.UserPepparRelationView, 'user_pepparrelations')     

urlpatterns = [
    #Django Admin calls
    path('admin/', admin.site.urls), 
    #API calls
    path('api/', include(router.urls)),
    #API USER calls
    path('api/user/', include(user_router.urls)),
   # path('api/user/me', user_views.UserMe(), name='user_me'),

    #Standalone calls
    path('usercreate/', user_views.UserCreate.as_view(), name='user_create'),
    path("userlogin/", user_views.UserLoginView.as_view(), name="user_login"),               
]
