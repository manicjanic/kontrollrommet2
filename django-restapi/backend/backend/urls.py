from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                    

from user import views as user 
from user_views import views as user_views
from peppar_base import views as base_views
from peppar_relational import views as relational_views  
from todo import views as todo_views 

# API Calls
router = routers.DefaultRouter()
router.register(r'todos', todo_views.TodoView, 'todo')     
router.register(r'peppars', base_views.PepparView, 'peppar')     
router.register(r'pepparrelations', relational_views.RelationView, 'pepparrelation')     
# USER calls
user_router = routers.DefaultRouter()                      
user_router.register(r'peppars', user_views.PepparInsightView, 'user_peppars')     
user_router.register(r'pepparrelations', user_views.RelationInsightView, 'user_pepparrelations')     

urlpatterns = [
    #Django Admin calls
    path('admin/', admin.site.urls), 
    #API calls
    path('api/', include(router.urls)),
    #API USER calls
    path('api/user/', include(user_router.urls)),
    path('api/user/me', user_views.Me.as_view(), name='me'),
    path('api/user/myrelations', user_views.MyRelations.as_view(), name='myrelations'),
    path('api/user/innercircle', user_views.InnerCircle.as_view(), name='inner_circle'),
    path('api/user/innercirclerelations', user_views.InnerCircleRelations.as_view(), name='inner_circlerelations'),
    #Standalone calls
    path('usercreate/', user.UserCreate.as_view(), name='user_create'),
    path("userlogin/", user.UserLoginView.as_view(), name="user_login"),               
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