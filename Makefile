all:
	mysql.server start
	python manage.py runserver

clean:
	mysql.server start
	mysql -u root -e 'drop database if exists cs411; create database cs411;' 
	rm -rf meetu/migrations/
	python manage.py makemigrations meetu
	python manage.py migrate
	mysql -u root -e 'use cs411; insert into meetu_university values (1, "University of Illinois at Urbana-Champaign", "IL", "Urbana"); insert into meetu_emaildomain values (1, "illinois.edu", 1);'
	python manage.py runserver