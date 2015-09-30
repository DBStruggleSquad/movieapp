'''
Created on Sep 12, 2015

@author: Glory, Antoine
'''

from flask import Flask
from flask import render_template
from flask.ext.triangle import Triangle
from flask.ext.mysql import MySQL
import os
import urlparse
import sys



app = Flask(__name__)
Triangle(app)

mysql = MySQL()
url = urlparse.urlparse(os.environ['DATABASE_URL'])
app.config['MYSQL_DATABASE_USER'] = url.username
app.config['MYSQL_DATABASE_PASSWORD'] = url.password
app.config['MYSQL_DATABASE_HOST'] = url.hostname

mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()
# Update with environment configuration.

@app.route('/')
def hello():
    return render_template('helloworld.html')

if __name__ == '__main__':
    app.run()