from rest_framework import generics
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status

from pacovbase.serializers import PACOVSerializer
from pacovbase.models import PACOV
from .models import PACOVInsight

#General View of PACOVInsigt, by User
class RegisterPacovView(generics.CreateAPIView):       
    serializer_class = PACOVSerializer                     

    def post(self, request, format=None):
        user = self.request.user
        serializer = PACOVSerializer(data=request.data)
        if serializer.is_valid():
            # Construct Name
#            jsonfield = serializer.data.specific_data

            # Save Instance of PACOV
            pacov = serializer.save()
            # Make new Instance of Insight Based on PACOV
            PACOVInsight.objects.create(user=user, pacov=pacov, level="1")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)