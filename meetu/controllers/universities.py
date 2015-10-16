import json

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict

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
    body = QueryDict(request.body)
    if body["city"] and body["state"] and body["name"]:
        u = University.objects.create(name=body["name"], city=body["city"], state=body["state"])
        u.save()
        return HttpResponse("Success")
    else:
        return HttpResponse("Not enough parameters", status=422)

@csrf_exempt
def specific(request, id):
    if request.method == 'GET':
        return retrieve(request, id)
    elif request.method == 'PUT':
        return update(request, id)
    elif request.method == 'DELETE':
        return delete(request, id)
    else:
        return HttpResponse("Route not found")

def retrieve(request, id):
    university = University.objects.get(id=id)
    return HttpResponse(serializers.serialize("json", [university]))

def update(request, id):
    body = QueryDict(request.body)

    university = University.objects.get(id=id)
    university.city = body["city"] if body["city"] else university.city
    university.state = body["state"] if body["state"] else university.state
    university.name = body["name"] if body["name"] else university.name

    university.save()
    return HttpResponse("Success")

def delete(request, id):
    university = University.objects.get(id=id)
    university.delete()
    return HttpResponse("Success")
