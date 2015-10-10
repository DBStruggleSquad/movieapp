'''
Created on Sep 12, 2015

@author: Glory, Antoine
'''

from flask import Flask
from flask import render_template
from flask.ext.bootstrap import Bootstrap
from flask.ext.mysql import MySQL
import os
import urlparse
import sys



app = Flask(__name__)
bootstrap = Bootstrap(app)
mysql = MySQL()
#url = urlparse.urlparse(os.environ['DATABASE_URL'])
#app.config['MYSQL_DATABASE_USER'] = url.username
#app.config['MYSQL_DATABASE_PASSWORD'] = url.password
#app.config['MYSQL_DATABASE_HOST'] = url.hostname

#mysql.init_app(app)

#conn = mysql.connect()
#cursor = conn.cursor()
# Update with environment configuration.


@app.route('/')
def hello():
    return render_template('profile.html')

@app.route('/movies')
def movies_main():
    return render_template('movies.html')

@app.route('/my-lists')
def user_lists():
    return render_template('my-lists.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/business-profile')
def business_profile():
    return render_template('business-profile.html')

@app.route('/event-page')
def event_page():
    return render_template('event-page.html')

@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/fanclub-page')
def fanclub_page():
    return render_template('fanclub-page.html')

@app.route('/fanclubs')
def fanclubs():
    return render_template('fanclubs.html')

@app.route('/movie-profile')
def movie_page():
    return render_template('movie-profile.html')

if __name__ == '__main__':
    app.run()
