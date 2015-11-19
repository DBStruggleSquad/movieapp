'''
Created on Sep 12, 2015

@author: Glory, Antoine
'''

from flask import Flask, flash, redirect, session, url_for, request, g, request, get_flashed_messages
from flask import render_template
from flask.ext.mysql import MySQL
import urlparse 
import sys, os
from flask.globals import request
import logging
from flask.json import jsonify
import json
from flask.ext.login import LoginManager, UserMixin, current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

global app, mysql

app = Flask(__name__)

mysql = MySQL()



global genres
genres = ["Action","Adventure","Animation","Biography","Comedy","Crime","Documentary","Drama","Family","Fantasy","Film-Noir","History","Horror","Music","Musical","Mystery","Romance","Sci-Fi","Short","Sport","Thriller","War","Western"]

mysql.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class UserNotFoundError(Exception):
    pass
#=========
#Route import
from queries import movies
movies.addRoutes(app, mysql, genres)

#===================================================================================
#                                ROUTE FUNCTIONS
#===================================================================================
@app.route('/')
@login_required
def hello():
    return render_template('profile.html')

@app.route('/profile')
@login_required
def userprofile():
    return render_template('profile.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')



@app.route('/search-results')
def search_results():
    return render_template('search-results.html')

@app.route('/my-lists')
def user_lists():
    
    if 'mylist' in request.args:
        data = {'mylist':[]}
        
        #query
        username = "'Antoine Cotto'"
        conn = mysql.connect()
        cur = conn.cursor()
        query = "select lists.List_name from lists where lists.username = " + username
        cur.execute(query)
        result = cur.fetchall()
        
        for i in result:
            data['mylist'].append({'name': str(i[0])})
        
        conn.close()
        #data returned
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
@login_required
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
#     LIST RELATED
#---------------------------------

@app.route('/usermovielistnames')
def user_list_names():
    data = {'lists' : []}
    #query
    username = "'Antoine Cotto'"
    conn = mysql.connect()
    cur = conn.cursor()
    query = "select lists.List_name from lists where lists.username = " + username
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
        
    for i in result:
        print i[0]
        data['lists'].append({'name': str(i[0])})
    print data
    return jsonify(data)

@app.route('/listinfo/<listName>')
def listinfo(listName):
    list_info = {'listinfo':{'name': str(listName), 'movies':[]}}
    
    #query
    query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description, movies.Genre, movies.Image_link from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title and lists.List_name = '" + listName + "'" 
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    
    for i in result:
        list_info['listinfo']['movies'].append({'title': str(i[1]), 'year': str(i[2]), 'description': str(i[3]), 'genre': str(i[4]), 'poster': str(i[5])})

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
#===================================================================================
#                                POST
#===================================================================================


@app.route('/addlist2user', methods=['POST'])
def add_list2user():
    data = request.get_json()
    print data['username'] + "  " + data['title'] + "   " + data['category'] 
    print "its hereeee \n"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('ListExists', (data['title'], data['username'], data['category'] ))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    print "salio"
    
    return jsonify({})


@app.route('/addAccount', methods=['POST'])
def add_Account():
    data = request.get_json()
    print data['username'] + data['email'] + "  " + data['password1'] + "   " + data['password2'] + "\n"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('registerAccount', (data['email'], generate_password_hash(data['password1']),data['username']))
    conn.commit()
    conn.close()
    print "salio"
    
    return jsonify({})

@app.route('/userLogin', methods=['POST'])
def user_Login():
    data = request.get_json()
    dude = User.get(data['email'])
    if (dude and dude.verify_password(data['password'])):
        login_user(dude)
    print "salio"
    print current_user.username
    return jsonify({})
    
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
    


class User():

    query = "select account.email, account.password_hash, account_belong_user.username from account, account_belong_user where account.email = account_belong_user.email" 
    #query = "select email, password_hash from account"
    conn = mysql.connect()
    cursor = conn.cursor()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    users = []
    for i in result:
        users.append({'email': str(i[0]), 'password_hash': str(i[1]),'username': str(i[2])})
    print users 
    print "\n\n"
    def __init__(self, id):
        if not any(u['email'] == id for u in self.users):
            print "not found"
            raise UserNotFoundError()
        self.id = id
        for x in self.users:
            if x['email'] == id:
                self.password_hash = x['password_hash']
                self.username = x['username']
        #self.username = self.users['username']

    def is_active(self):
        return True

    def is_authenticated(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def get(self_class, email):
        '''Return user instance of id, return None if not exist'''
        try:
            user = self_class(email)
            return user
        except UserNotFoundError:
            return None

# Flask-Login use this to reload the user object from the user ID stored in the session
@login_manager.user_loader
def load_user(id):
    return User.get(str(id))




    
if __name__ == '__main__':
    app.run()
