# Final Project


## Members
Name | Email | Phone Number
---- | ----- | ------------
Vassil Mladenov | mladeno2@illinois.edu | (630) 802-3202 
Neville Jos | njos2@illinois.edu | (954) 415-3337
Dandi Wang | dwang15@illinois.edu | (217) 418-4986 
Hubert Theodore | htheodo2@illinois.edu | (510) 590-1839

## Installation

Make sure you have pip installed. And then go into your code directory and enter the following:

`git clone https://github.com/cs411sp15vmnjhtdw cs411project`\\
`cd cs411project`\\
`brew install mysql`
`mysql.server start`

`mysql -u root`
`CREATE DATABASE cs411`
`exit`

`pip install virtualenv`
`source venv/bin/activate`
`pip install django`
`pip install mysql-python`
`python manage.py migrate`
`python manage.py runserver`

And then go to `localhost:8000` and you should see 'Hello World'
