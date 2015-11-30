all:
	mysql.server start
	python manage.py runserver

clean:
	mysql.server start
	mysql -u root -e 'drop database if exists cs411; create database cs411;' 
	rm -rf meetu/migrations/
	python manage.py makemigrations meetu
	python manage.py migrate
	python manage.py runserver
	