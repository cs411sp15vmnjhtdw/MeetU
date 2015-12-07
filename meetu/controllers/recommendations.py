import json
from inspect import *
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict
from django.contrib.auth.decorators import login_required
from django.db.models import Count
from django.db import connection
from django.contrib.auth.models import User

from ..models import Likes
from ..models import Student
from ..models import Photo

@csrf_exempt
@login_required
def index(request):
    if request.method == 'GET':
        return all(request)
    else:
        return HttpResponse("Route not found")

def all(request):
    student = request.user.student

    cursor = connection.cursor()
    cursor.execute('''
        SELECT DISTINCT r.likee_id
        FROM 
        (
            SELECT likee_id, strength
            FROM 
            (
                SELECT COUNT(l2.liker_id) as strength, l2.liker_id
                FROM meetu_likes AS l1, meetu_likes AS l2
                WHERE l1.liker_id = %s
                AND l1.likee_id = l2.likee_id
                AND l1.liked = l2.liked
                AND l2.liker_id <> %s
                GROUP BY l2.liker_id
                HAVING COUNT(l2.liker_id) > 5
            ) AS friends_by_strength, meetu_likes as l, meetu_student as s
            WHERE friends_by_strength.liker_id = l.liker_id
            AND l.likee_id = s.id
            AND s.gender = %s 
            AND l.likee_id NOT IN 
            (
                SELECT likee_id
                FROM meetu_likes
                WHERE liker_id = %s
            )
            ORDER BY strength DESC
        ) as r
    ''', [student.id, student.id, student.gender_preference, student.id])
    
    ids_of_students_user_likes = map(lambda l: l.likee.id, Likes.objects.filter(liker_id=student.id))
    
    # get student ids from query
    recommended = map(lambda t: t[0], cursor.fetchall())

    # get the people that I haven't liked that haven't been recommended to me
    remainc = connection.cursor()
    remainc.execute('''
        SELECT l.likee_id, l.liker_id, COUNT(l.liker_id) as c
        FROM meetu_likes AS l, meetu_student as s
        WHERE l.likee_id = s.id
        AND l.liked=true
        AND s.gender = %s
        GROUP BY l.likee_id
        ORDER BY c DESC
        ''', [student.gender_preference])

    remainsql = filter(lambda r: r not in ids_of_students_user_likes+recommended, map(lambda t: t[0], remainc.fetchall()))

    # get user objects
    users = map(lambda i: User.objects.get(id=Student.objects.get(id=i).user_id), recommended+remainsql)
    
    def mapper(user):
        try:
            image = Photo.objects.get(student=user.student).url
        except Photo.DoesNotExist:
            image = "http://i.imgur.com/tqQvuFr.jpg"
        return  {
            "first_name" : user.first_name,
            "last_name" : user.last_name,
            "id" : user.student.id,
            "birthdate" : user.student.birthdate,
            "image" : image
        }

    # get json
    data = map(mapper, users)

    response = {}
    response["data"] = data
    response["response"] = {
        "message" : "Here are the recommendations.",
        "status" : 200
    }
    return JsonResponse(response)

def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else obj
