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

# doesn't work anymore after adding images
test:
	mysql.server start
	mysql -u root -e 'drop database if exists cs411; create database cs411;' 
	rm -rf meetu/migrations/
	python manage.py makemigrations meetu
	python manage.py migrate
	mysql -u root -e 'use cs411; insert into meetu_university values (1, "University of Illinois at Urbana-Champaign", "IL", "Urbana"); insert into meetu_emaildomain values (1, "illinois.edu", 1);'
	python manage.py runserver &
	sleep 4
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Alpha&last_name=Dog&email_domain=1&username=alpha2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Bravo&last_name=Dog&email_domain=1&username=bravo2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Charlie&last_name=Dog&email_domain=1&username=charlie2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Delta&last_name=Dog&email_domain=1&username=delta2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Echo&last_name=Dog&email_domain=1&username=echo2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Foxtrot&last_name=Dog&email_domain=1&username=foxtrot2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Golf&last_name=Dog&email_domain=1&username=golf2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Hotel&last_name=Dog&email_domain=1&username=hotel2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=false' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=India&last_name=Dog&email_domain=1&username=india2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Juliet&last_name=Dog&email_domain=1&username=juliet2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Kilo&last_name=Dog&email_domain=1&username=kilo2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Lima&last_name=Dog&email_domain=1&username=lima2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Mike&last_name=Dog&email_domain=1&username=mike2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=November&last_name=Dog&email_domain=1&username=november2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Oscar&last_name=Dog&email_domain=1&username=oscar2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Papa&last_name=Dog&email_domain=1&username=papa2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Quebec&last_name=Dog&email_domain=1&username=quebec2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	curl 'http://localhost:8000/students/' -H 'Origin: http://localhost:8000' -H 'Content-Type: application/x-www-form-urlencoded' --data 'first_name=Romeo&last_name=Dog&email_domain=1&username=romeo2%40illinois.edu&password=testtest&birthdate=Wed+Sep+09+1990+00%3A00%3A00+GMT-0500+(CDT)&gender=true' --compressed
	mysql -u root -e 'use cs411; insert into meetu_likes values (1, 1, 9, 1);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (2, 1, 10, 1);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (3, 1, 11, 1);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (4, 1, 12, 1);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (5, 1, 9, 2);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (6, 1, 10, 2);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (7, 1, 13, 2);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (8, 1, 14, 2);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (10, 1, 9, 3);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (11, 1, 10, 3);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (12, 1, 11, 3);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (13, 1, 14, 3);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (14, 1, 15, 3);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (15, 1, 9, 4);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (16, 1, 16, 4);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (17, 1, 1, 14);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (18, 1, 1, 13);'
	mysql -u root -e 'use cs411; insert into meetu_likes values (19, 1, 12, 3);'