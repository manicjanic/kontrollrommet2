
from django.http import JsonResponse

class LookupTables:

    def lu_subcategories(request):
        lookup = [{
            # Unit of Data
            typeid: 28,
            sub_types: [{
                id: 1,
                name: "Datafile"
            },{
                id: 2,
                name: "Data Entry"
            },{
                id: 3,
                name: "Data Message" 
            }]},{
            # Event
            typeid: 29
            sub_types: [{
                id:1,
                name: "Meeting"
            }]
            }
        ]
        return JsonResponse(lookup)

    
