import json

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict
from django.db import connection
from django.contrib.auth.decorators import login_required

from ..models import Photo
from ..models import Student
from ..services import image_validate
from ..services import upload_image

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
@login_required
def matches(request):
    if request.method == 'GET':
        student = request.user.student
        print student.id
        cursor = connection.cursor()
        cursor.execute('''
            SELECT username, first_name, last_name, l1.likee_id
            FROM meetu_likes as l1, meetu_likes as l2, meetu_student as s, auth_user as a
            WHERE l1.liker_id = %s
            AND l1.liked = true
            AND l1.likee_id = l2.liker_id
            AND l2.likee_id = l1.liker_id
            AND l2.liked = true
            AND l2.liker_id = s.id
            AND s.user_id = a.id
        ''', [student.id])
        
        def mapper(m):
            try:
                image = Photo.objects.get(student=Student.objects.get(id=m[3])).url
            except Exception, e:
                image = ""
            return {
                "email" : m[0],
                "first_name" : m[1],
                "last_name" : m[2],
                "image" : image
            }

        matches = map(mapper, cursor.fetchall())
        response = {}
        response["data"] = matches
        response["response"] = {
            "message" : "Here are the recommendations.",
            "status" : 200
        }
        return JsonResponse(response)
    else:
        return HttpResponse("Route not found")

@csrf_exempt
def delete(request, id):
    if request.method == 'DELETE':
        photo = Photo.objects.get(id=id)
        photo.delete()
        return HttpResponse("Success")
    else:
        return HttpResponse("Route not found")
