# Final Project


## Members
Name | Email
---- | -----
Vassil Mladenov | mladeno2 [at] illinois [dot] edu
Neville Jos | njos2 [at] illinois [dot] edu
Dandi Wang | dwang15 [at] illinois [dot] edu
Hubert Theodore | htheodo2 [at] illinois [dot] edu

## Installation

Make sure you have pip installed. And then go into your code directory and enter the following:

```
git clone https://github.com/cs411sp15vmnjhtdw/MeetU.git
cd MeetU
brew install mysql
mysql.server start

mysql -u root
CREATE DATABASE cs411;
exit

(if necessary)
sudo easy_install pip
sudo pip install virtualenv

virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

And then go to `localhost:8000` and you should see 'Hello World'
