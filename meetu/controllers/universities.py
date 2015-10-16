import json

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from ..models import University

@csrf_exempt
def index(request):
    if request.method == 'GET':
        return all(request)
    elif request.method == 'POST':
        return create(request)
    else:
        return HttpResponse("Route not found")

def all(request):
    universities = json.loads(serializers.serialize("json", University.objects.all()))
    return JsonResponse(universities, safe=False)

def create(request):
    if request.POST["city"] and request.POST["state"] and request.POST["name"]:
        u = University.objects.create(name=request.POST["name"], city=request.POST["city"], state=request.POST["state"])
        u.save()
        return HttpResponse("Success")
    else:
        return HttpResponse("Not enough parameters", status=422)
