import json

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict
from django.contrib.auth.decorators import login_required
from django.db import connection

from ..models import Likes
from ..models import Student

@csrf_exempt
@login_required
def index(request):
    if request.method == 'POST':
        return create(request)
    else:
        return HttpResponse("Route not found")

def create(request):
    body = QueryDict(request.body)
    student = request.user.student
    if body["likee"] and body["liked"]:
        try:
            likee = Student.objects.get(id=body["likee"])
        except Student.DoesNotExist:
            return HttpResponse("Database error, target user (likee) not in database")

        liked = True if body["liked"] == "true" else False
        l = Likes.objects.create(liker=student, likee=likee, liked=liked)
        l.save()


        cursor = connection.cursor()
        cursor.execute('''
            SELECT username, first_name, last_name
            FROM auth_user as u, meetu_student as s, meetu_likes as l
            WHERE u.id = s.user_id
            AND s.id = l.liker_id
            AND l.likee_id = %s
            AND l.liker_id = %s
            AND l.liked = true
        ''', [student.id, likee.id])

        rows = cursor.fetchall()
        if len(rows) > 0 and liked:
            t = rows[0]
            data = {
                "email" : t[0],
                "first_name" : t[1],
                "last_name" : t[2]
            }
        else:
            data = {}

        response = {}
        response["data"] = data
        response["response"] = {
            "message" : "Match occured if data not empty.",
            "status" : 200
        }
        return JsonResponse(response)
    else:
        return HttpResponse("Not enough parameters", status=422)
