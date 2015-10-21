# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('hex_color', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Dislikes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='EmailDomain',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('domain', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Likes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Spirit',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('color', models.ForeignKey(to='meetu.Color')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gender', models.BooleanField()),
                ('birthdate', models.DateField()),
                ('email', models.TextField(max_length=50)),
                ('last_access', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=50)),
                ('gender_preference', models.IntegerField()),
                ('email_domain', models.ForeignKey(to='meetu.EmailDomain')),
            ],
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=2)),
                ('city', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='spirit',
            name='university',
            field=models.ForeignKey(to='meetu.University'),
        ),
        migrations.AddField(
            model_name='photo',
            name='student',
            field=models.ForeignKey(to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='likes',
            name='likee',
            field=models.ForeignKey(related_name='likee', to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='likes',
            name='liker',
            field=models.ForeignKey(related_name='liker', to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='emaildomain',
            name='university',
            field=models.ForeignKey(to='meetu.University'),
        ),
        migrations.AddField(
            model_name='dislikes',
            name='dislikee',
            field=models.ForeignKey(related_name='dislikee', to='meetu.Student'),
        ),
        migrations.AddField(
            model_name='dislikes',
            name='disliker',
            field=models.ForeignKey(related_name='disliker', to='meetu.Student'),
        ),
    ]
