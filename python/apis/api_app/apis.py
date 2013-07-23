from django.http import HttpResponse
from api_app.models import Person
import simplejson

def home(request):
	return HttpResponse('Welcome to API Home')

def careplan(request, patientID= None):
  if(patientID):
   p= Person.objects.get(id= patientID)
   return HttpResponse(simplejson.dumps({'patient':{'first_name':p.first_name}}))
  else:
   return HttpResponse('Nothing here. Go home!')
