from django.db import models

class University(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    city = models.CharField(max_length=50)

class Student(models.Model):
    gender = models.BooleanField()
    birthdate = models.DateField()
    email = models.TextField(max_length=50)
    email_domain = models.ForeignKey(EmailDomain)
    last_access = models.DateTimeField(auto_now_add=True) # saves on every update of this object
    name = models.CharField(max_length=50)
    gender_preference = models.IntegerField()

class Photo(models.Model):
	url = models.CharField(, max_length=200)
	student = models.ForeignKey(Student)

class Likes(models.Model):
	liker = models.ForeignKey(Student)
	likee = models.ForeignKey(Student)

class Dislikes(models.Model):
	disliker = models.ForeignKey(Student)
	dislikee = models.ForeignKey(Student)

class EmailDomain(models.Model):
    domain = models.CharField(, max_length=50)
    university = models.ForeignKey(University)

class Color(models.Model):
    hex_color = models.IntegerField()

class Spirit(models.Model):
    university = models.ForeignKey(University)
    color = models.ForeignKey(Color)