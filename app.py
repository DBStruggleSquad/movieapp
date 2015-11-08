'''
Created on Sep 12, 2015

@author: Glory, Antoine
'''

from flask import Flask
from flask import render_template
from flask.ext.mysql import MySQL
import urlparse 
import sys, os
import json
from flask import jsonify
from flask.globals import request
import logging

app = Flask(__name__)

mysql = MySQL()
url = urlparse.urlparse(os.environ['DATABASE_URL'])
app.config['MYSQL_DATABASE_USER'] = url.username
app.config['MYSQL_DATABASE_PASSWORD'] = url.password
app.config['MYSQL_DATABASE_HOST'] = url.hostname
app.config['MYSQL_DATABASE_DB'] = "heroku_d4e136b9b4dc6f5"


mysql.init_app(app)

conn = mysql.connect()

cursor = conn.cursor()

cur = conn.cursor()
username = "'Antoine Cotto'"
query = "select * from Lists where username = " + username
cur.execute("select * from Lists where username = " + username)
data = cur.fetchall()


data_dict = []
for hi in data:
    d_dict = {
    'List_name': hi[0],
    'username': hi[1],
    'Category': hi[2],
    'Sharable': hi[4]}
    data_dict.append(d_dict)
json.dumps(data_dict)



# Update with environment configuration.

#===================================================================================
#                               VARIABLES FOR DATA SHARING
#===================================================================================



#===================================================================================
#                                ROUTE FUNCTIONS
#===================================================================================
@app.route('/')
def hello():
    return render_template('profile.html')

@app.route('/profile')
def userprofile():
    return render_template('profile.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/movies', methods = ['GET'])
def movies_main():
    if 'mostreviewed' in request.args:
        
        data = {"movies" : [{
        'name': 'Movie-1',
        'genre': 'comedy',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-2',
        'genre': 'horror',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-3',
        'genre': 'suspense',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-4',
        'genre': 'drama',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-5',
        'genre': 'comedy',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-6',
        'genre': 'drama',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-7',
        'genre': 'history',
        'img': 'static/img/movie-placeholder.svg'
      }]}
        
        print bcolors.INFO +  "------------------------------\nMostReviewedMovies Asked\nData returned:\n" + json.dumps(data) + "\n------------------------------\n" + bcolors.ENDC
        return jsonify(data), 200
    elif 'bygender' in request.args:
        data = {"genrelist": [
        {'name': 'Action', 'movies': [{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'}, {'name': 'Movie-2', 'poster': '/static/img/movie-placeholder.svg'}, {'name': 'Movie-3', 'poster': '/static/img/movie-placeholder.svg'}]},
        {'name': 'Drama', 'movies': [{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'}, {'name': 'Movie-2', 'poster': '/static/img/movie-placeholder.svg'}, {'name': 'Movie-3', 'poster': '/static/img/movie-placeholder.svg'}]},
        {'name': 'History', 'movies': [{'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'}, {'name': 'Movie-2', 'poster': '/static/img/movie-placeholder.svg'}, {'name': 'Movie-3', 'poster': '/static/img/movie-placeholder.svg'}]}
        ]}
        print bcolors.INFO + "Movies By Gender asked, returned:\n" + json.dumps(data) + bcolors.ENDC
        return jsonify(data), 200
    elif 'toprated' in request.args:
        data = {"toprated": [
            {'name': 'Movie-1', 'poster': '/static/img/movie-placeholder.svg'},
            {'name': 'Movie-2', 'poster': '/static/img/movie-placeholder.svg'},
            {'name': 'Movie-3', 'poster': '/static/img/movie-placeholder.svg'},
            {'name': 'Movie-4', 'poster': '/static/img/movie-placeholder.svg'},
            {'name': 'Movie-5', 'poster': '/static/img/movie-placeholder.svg'}
            ]}
        print bcolors.INFO + "\n\nTopRated Asked\n\n" + bcolors.ENDC
        return jsonify(data), 200
    else:
        print bcolors.INFO + "Movies template returned" + bcolors.ENDC
        return render_template('movies.html')

@app.route('/search-results')
def search_results():
    return render_template('search-results.html')

@app.route('/my-lists')
def user_lists():
    if 'mylist' in request.args:
        data = {'mylist':[]}
        
        #query
        username = "'Antoine Cotto'"
        query = "select lists.List_name from lists where lists.username = " + username
        cur.execute(query)
        result = cur.fetchall()
        for i in result:
            data['mylist'].append({'name': str(i[0])})
        
        #data returned
        return jsonify(data)
    else:
        return render_template('my-lists.html')

@app.route('/list-page')        
def list_page():
    return render_template('list-page.html')    

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
def movie_profile():
    return render_template('movie-profile.html')

#===================================================================================
#                                Queries
#===================================================================================
@app.route('/movies/mostreviewed')
def movies_mostreviewed():
    data = [{
        'name': 'Movie-1',
        'genre': 'comedy',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-2',
        'genre': 'horror',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-3',
        'genre': 'suspense',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-4',
        'genre': 'drama',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-5',
        'genre': 'comedy',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-6',
        'genre': 'drama',
        'img': 'static/img/movie-placeholder.svg'
      }, { 
        'name': 'Movie-7',
        'genre': 'history',
        'img': 'static/img/movie-placeholder.svg'
      }]
    return 

@app.route('/userprofileactivity')
def userpofileactivity():
    useractivity = {'activity': [
          {
            'name': 'katrific',
            'type': 'list',
            'pubdate': '2015-09-22',
          },
          {
            'name': 'katrific',
            'type': 'post',
            'pubdate': '2015-09-22'
          },
          {
            'name': 'katrific',
            'type': 'joined',
            'pubdate': '2015-09-22'
          }
        ]}
    return jsonify(useractivity)
"""
@app.route('/userlists')
def userlists():
    userelists = {'lists': [
                {'List_name': 'My top ten',
                 'pubdate': '2015-09-22',
                'movies': [
                  {
                    'title': 'Avatar',
                    'poster': '/static/img/movie-placeholder.svg',
                  },
                  {
                    'title': 'Avengers',
                    'poster': '/static/img/movie-placeholder.svg',
                  },
                  {
                    'title': 'Pokemon',
                    'poster': '/static/img/movie-placeholder.svg',
                  }
                ]}]
                }
    return jsonify(userelists)
"""
@app.route('/userreviews')
def userreviews():
    user_reviews = {'reviews': [
                    { 
                    'Movie_title': 'Avatar',
                    'Review_title': 'Aww yeah',
                    'Rating': 3,
                    'review': 'text text text text text  \n text text text text text ',
                  }, 
                  { 
                    'Movie_title': 'Avengers',
                    'Review_title': 'it sucks',
                    'Rating': 2,
                    'review': 'text text text text text  \n text text text text text ',
                  }, 
                  { 
                    'Movie_title': 'Pokemon',
                    'Review_title': 'Changed my life',
                    'Rating': 10,
                    'review': 'text text text text text  \n text text text text text ', 
                  }]
                    }
    return jsonify(user_reviews)

@app.route('/moviesearch/<movie_title>')
def moviesearch(movie_title):
    movie_info = {'hola':'dummydata'}
    return jsonify(movie_info)

@app.route('/listinfo/<listName>')
def listinfo(listName):
    print bcolors.INFO + "----------------------LIST INFO---------------------------" + bcolors.ENDC
    print "\n Se esta pidiendo la siguiente lista: " + listName + "\n"
    list_info = {}
    
    #query
    query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title and lists.List_name = '" + listName + "'" 
    print query
    cur.execute(query)
    result = cur.fetchall()
    #print result 
    
    if listName == "My Top Ten":
        list_info = {'listinfo':{
                        'name': 'My Top 30',
                        'movies': [{
                        'title': 'Avatar',
                        'year': '2009',
                      }, {
                        'title': 'Avengers',
                        'year': 'some year',
                      }, {
                        'title': 'Some movie',
                        'year': 'some year',
                      }]
                    }}
    elif listName == "Worst":
        print "entro a worst"
        list_info = { 'listinfo':{
                        'name': 'Worst',
                        'movies': [{
                        'title': '???',
                        'year': '1963',
                      }, {
                        'title': 'Movie 45',
                        'year': 'some year',
                      }, {
                        'title': 'Some movie',
                        'year': 'some year',
                      }]
                    }}
        print list_info
    else:
        list_info = {'listinfo':{
                        'name': 'Must-Watch',
                        'movies': [{
                        'title': 'Avarrrrrr',
                        'year': '2009',
                      }, {
                        'title': 'Friends',
                        'year': 'some year',
                      }, {
                        'title': 'Alooooo ',
                        'year': 'some year',
                      }]
                    }}
    print list_info
    print bcolors.INFO + "----------------------END LIST INFO---------------------------" + bcolors.ENDC
    return jsonify(list_info)

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    INFO = '\033[1;33m'
    

    
if __name__ == '__main__':
    app.run()
