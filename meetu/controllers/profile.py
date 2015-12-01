import json

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict

from ..models import Photo
from ..models import Student
from ..backend import image_validate
from ..backend import upload_image

@csrf_exempt
def index(request):
    if request.method == 'POST':
        return add_image(request)
    else:
        return HttpResponse("Route not found")

def add_image(request):
    body = QueryDict(request.body)

    if body["student_id"] and body["photo"]:
        sid = body["student_id"]
        photo = body["photo"]

        try:
            student = Student.objects.get(id=sid)
        except Student.DoesNotExist:
            return HttpResponse("Database error, current user (student_id) not in database")

        if (not image_validate.image_has_person(photo)):
            return HttpResponse("Photo appears not to be of a person")
        
        try:
            url = upload_image.upload(photo)
        except Exception, e:
            return HttpResponse("Image upload failed")
        
        p = Photo.objects.create(url=url, student=student)
        p.save()
        return HttpResponse("Success")
    else:
        return HttpResponse("Not enough parameters", status=422)

@csrf_exempt
def delete(request, id):
    if request.method == 'DELETE':
        photo = Photo.objects.get(id=id)
        photo.delete()
        return HttpResponse("Success")
    else:
        return HttpResponse("Route not found")
