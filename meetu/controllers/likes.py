import json

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict

from ..models import Likes
from ..models import Student

@csrf_exempt
def index(request):
    if request.method == 'POST':
        return create(request)
    else:
        return HttpResponse("Route not found")

def create(request):
    body = QueryDict(request.body)

    if body["liker"] and body["likee"] and body["liked"]:
        liker = Student.objects.get(id=body["liker"])
        try:
            liker = Student.objects.get(id=body["liker"])
        except SomeModel.DoesNotExist:
            return HttpResponse("Database error, current user (liker) not in database")

        try:
            likee = Student.objects.get(id=body["likee"])
        except SomeModel.DoesNotExist:
            return HttpResponse("Database error, target user (likee) not in database")
        
        if (body["liked"] == "true"):
            liked = True
        elif (body["liked"] == "false"):
            liked = False
        else:
            return HttpResponse("Received unexpected value for liked, must be true or false")
        
        l = Likes.objects.create(liker=liker, likee=likee, liked=liked)
        l.save()
        return HttpResponse("Success")

    else:
        return HttpResponse("Not enough parameters", status=422)

