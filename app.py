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

global genres
genres = ["Action","Adventure","Animation","Biography","Comedy","Crime","Documentary","Drama","Family","Fantasy","Film-Noir","History","Horror","Music","Musical","Mystery","Romance","Sci-Fi","Short","Sport","Thriller","War","Western"]

mysql.init_app(app)
'''
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

'''


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
        
        query = """ Select m.*, count(Movie_title) r_num from Reviews as r join Movies m on r.Movie_title = m.Title
                    group by Movie_title
                    order by r_num DESC"""
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        qresult = cur.fetchall()
        conn.close()
        result = {"movies": []}
        for movie in qresult:
            result["movies"].append({'name': str(movie[0]), 'genre': movie[4], 'img': movie[3]}) #'img': 'static/img/movie-placeholder.svg'
                
        print bcolors.INFO +  "------------------------------\nMostReviewedMovies Asked\nData returned:\n" + json.dumps(result) + "\n------------------------------\n" + bcolors.ENDC
        return jsonify(result), 200
    elif 'bygender' in request.args:
        data = {"genrelist": []}     
        for genre in genres:
            print genre
            query = "Select m.*, avg(rating) r_num from Reviews as r join Movies m on r.Movie_title = m.Title where genre like '%"  + str(genre) + "%' group by Movie_title order by r_num DESC"
            conn = mysql.connect()
            cur = conn.cursor()
            cur.execute(query)
            qresult = cur.fetchall()
            conn.close()
            tempdata = {'name': genre, "movies":[]}
            for movie in qresult:
                tempdata["movies"].append({'name': movie[0], 'poster': movie[3]})
            if len(tempdata["movies"]) > 0:
                data["genrelist"].append(tempdata)
            
        
        
        
        print bcolors.INFO + "Movies By Gender asked, returned:\n" + json.dumps(data) + bcolors.ENDC
        return jsonify(data), 200
    
    
    elif 'toprated' in request.args:
        data = {"toprated": []}
        query = """Select m.*, avg(rating) r_num
                     from Reviews as r join Movies m on r.Movie_title = m.Title
                     group by Movie_title
                     order by r_num DESC"""
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        qresult = cur.fetchall()
        conn.close()
        
        for i in qresult:
            data['toprated'].append({'name': str(i[0]), 'poster': str(i[3])})
     
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
        print bcolors.INFO + "----------------------MY LISTS INFO------------------------" + bcolors.ENDC
        data = {'mylist':[]}
        
        #query
        username = "'Antoine Cotto'"
        conn = mysql.connect()
        cursor = conn.cursor()
        cur = conn.cursor()
        query = "select lists.List_name from lists where lists.username = " + username
        print "comenzando el query"
        cur.execute(query)
        print "termino el query"
        result = cur.fetchall()
        print result
        
        for i in result:
            data['mylist'].append({'name': str(i[0])})
        
        conn.close()
        #data returned
        print bcolors.INFO + "---------------------MY LISTS END------------------------" + bcolors.ENDC
        return jsonify(data)
    else:
        return render_template('my-lists.html')

@app.route('/list-page')        
def list_page():
    print bcolors.INFO + "-----------------LIST PAGE TEMPLATE---------------------" + bcolors.ENDC
    print ""
    print ""
    list_category = ""
    
    for i in request.args:
        query = "select lists.Category from lists where lists.List_name = '" + str(i) + "'" 
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        result = cur.fetchall()
        list_category = str(result[0][0])
        print str(list_category)    
        conn.close()
    
    print bcolors.INFO + "-----------------LIST PAGE TEMPLATE END------------------" + bcolors.ENDC
    if list_category == "Movies":
        print "devolvio  list page para peliculas"
        return render_template('list-page.html')
    
    return render_template('list-page-nonmovies.html')     

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

#---------------------------------
#     MOVIE RELATED
#---------------------------------
@app.route('/moviesearch/<movie_title>')
def moviesearch(movie_title):
    movie_info = {'hola':'dummydata'}
    return jsonify(movie_info)

@app.route('/movieinfo/<movie_title>')
def movieinfo(movie_title):
    result = {}
    
    query = "select * from movies where movies.title = '" + movie_title + "'"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    qresult = cur.fetchall()
    conn.close()
    for info in qresult:
        result['name'] = str(info[0])
        result['year'] = str(info[2])
        result['genres'] = str(info[4])
        result['poster'] = str(info[3])
        result['rating'] = str(5)
        result['synopsis'] = str(info[1])
    
    #anade los actores que partisiparon en la movie
    query = "select * from actors_in_movie where actors_in_movie.Title_mov = '" + movie_title + "'"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    qresult = cur.fetchall()
    conn.close()
    result['cast'] = []
    for actors in qresult:
        result['cast'].append({'name': actors[1], 'img': 'static/img/profile-picture-placeholder.svg'})
        pass
    
    return jsonify(result)

@app.route('/moviereviews/<movie_title>')
def movie_reviews(movie_title):
    movieriviews = {"movies": []}
    query = "select * from reviews where reviews.Movie_title = '" + movie_title + "'"
    print "comienza query para la pelicula: " + movie_title 
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    qresult = cur.fetchall()
    conn.close()
    print movieriviews
    print "termina query"
    print "entro al loop"
    for review in qresult:
        movieriviews["movies"].append({'reviewer': review[1],
        'Movie_title': review[2],
        'Review_title': review[0],
        'Rating': str(review[7]),
        'review': review[3]})
    print "dalio del loop"
    print bcolors.INFO + movieriviews + bcolors.ENDC
    print movieriviews
    return jsonify(movieriviews)
#---------------------------------
#     LIST RELATED
#---------------------------------
@app.route('/listinfo/<listName>')
def listinfo(listName):
    print bcolors.INFO + "----------------------LIST INFO---------------------------" + bcolors.ENDC
    print "\n Se esta pidiendo la siguiente lista: " + listName + "\n"
    list_info = {'listinfo':{'name': str(listName), 'movies':[]}}
    
    #query
    query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description, movies.Genre from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title and lists.List_name = '" + listName + "'" 
    print query
    conn = mysql.connect()
    cursor = conn.cursor()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print result 
    
    for i in result:
        list_info['listinfo']['movies'].append({'title': str(i[1]), 'year': str(i[2]), 'description': str(i[3]), 'genre': str(i[4])})
    
    print list_info
    
    print bcolors.INFO + "----------------------END LIST INFO---------------------------" + bcolors.ENDC
    return jsonify(list_info)

@app.route('/listinfo-nonmovies/<listName>')
def listinfo_nonmovies(listName):
    print bcolors.INFO + "----------------------LIST INFO---------------------------" + bcolors.ENDC
    print "\n Se esta pidiendo la siguiente lista: " + listName + "\n"
    list_info = {'listinfo':{'name': str(listName), 'posts':[]}}
    
    #query
    query = "select lists.List_name, lists_post.Title, lists_post.description from lists, lists_post where lists.List_name = lists_post.List_name and lists.List_name = '" + listName + "'" 
    print query
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print result 
    
    for i in result:
        list_info['listinfo']['posts'].append({'title': str(i[1]),'description': str(i[2])})
    
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
