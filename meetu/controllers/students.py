import json
import random
import string
import os

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.http import QueryDict

from ..models import Student, EmailDomain, Photo
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

import dateutil.parser

@csrf_exempt
def index(request):
    if request.method == 'POST':
        return create(request)
    else:
        return HttpResponse("Route not found")

def create(request):
    body = QueryDict(request.body)
    if body["first_name"] and body["last_name"] and body["username"] and body["password"] and body["birthdate"] and body["gender"] and body["email_domain"]:
        user = User.objects.create_user(first_name=body["first_name"], last_name=body["last_name"], username=body["username"], password=body["password"])
        domain = EmailDomain.objects.get(id=body["email_domain"])
        birthdate = dateutil.parser.parse(body["birthdate"])
        gender = True if body["gender"] == "true" else False

        student = Student.objects.create(user=user, birthdate=birthdate, gender=gender, email_domain=domain, gender_preference=(not gender))
        photo = Photo.objects.create(url=body["image"], student=student)
        user.save()
        student.save()
        photo.save()

        return HttpResponse("Success")
    else:
        return HttpResponse("Not enough parameters", status=422)

@csrf_exempt
def update(request):
    body = QueryDict(request.body)
    print "body"
    print body
    if body["first_name"] and body["last_name"] and body["birthdate"] and body["gender"] and body["gender_preference"] :
        student = request.user.student
        user = request.user
        first_name=body["first_name"]
        last_name=body["last_name"]
        birthdate = dateutil.parser.parse(body["birthdate"])
        gender = True if body["gender"] == "true" else False
        gender_preference = True if body["gender"] == "true" else False
        User.objects.filter(pk=user.pk).update(first_name=first_name, last_name=last_name)
        Student.objects.filter(pk=student.pk).update(birthdate=birthdate, gender=gender, gender_preference=gender_preference)

        return HttpResponse("Success")
    else:
        return HttpResponse("Not enough parameters", status=422)

@csrf_exempt
def auth(request):
    if request.method == 'POST':
        body = QueryDict(request.body)
        if body["username"] and body["password"]:
            user = authenticate(username=body["username"], password=body["password"])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse("Login successful", status=200)
                else:
                    return HttpResponse("Incorrect Username or Password", status=401)
            else:
                return HttpResponse("User not found", status=404)
        else:
            return HttpResponse("Not enough parameters", status=422)
    elif request.method == 'GET':
        if request.user.is_authenticated():
            au = request.user
            stu = au.student

            response = {}
            response["data"] = {
                "id" : stu.id,
                "first_name" : au.first_name,
                "last_name" : au.last_name,
                "birthdate" : stu.birthdate,
                "gender" : stu.gender,
                "gender_preference" : stu.gender_preference,
            }
            response["response"] = {
                "message" : "User logged in.",
                "status" : 200
            }
            return JsonResponse(response)
        else:
            return HttpResponse("Not authorized", status=401)
    else:
        return HttpResponse("Route not found")
