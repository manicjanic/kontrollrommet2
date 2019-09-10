    # Add extra operation after save: Adding instance in insight model, connected to user
    # Still VERY boilerplate solution. Needs to be more structured an progamatic
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


# Add extra operation after save: Adding instance in insight model, connected to user
    # Still VERY boilerplate solution. Needs to be more structured an progamatic
    def create(self, request, *args, **kwargs):
        user = self.request.user
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        returndata = serializer.data
        if isinstance(returndata, list):
            for instance in returndata:
                print(instance['uuid'])
                relation = Relation.objects.get(uuid=instance['uuid'])
                RelationInsight.objects.create(user=user, relation=relation, level="1")
        else:
            RelationInsight.objects.create(user=user, relation=returndata, level="1")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


#        if serializer.is_valid():
#            # Construct Name
##            jsonfield = serializer.data.specific_data
#
#            # Save Instance of Relation
#            relation = serializer.save()
#            # Make new Instance of Insight Based on Relation
#            RelationInsight.objects.create(user=user, relation=relation, level="1")
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#    def post(self, request, format=None):
#        user = self.request.user
#        serializer = RelationSerializer(data=request.data)
#        if serializer.is_valid():
#            # Construct Name
##            jsonfield = serializer.data.specific_data
#
#            # Save Instance of Relation
#            relation = serializer.save()
#            # Make new Instance of Insight Based on Relation
#            RelationInsight.objects.create(user=user, relation=relation, level="1")
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
