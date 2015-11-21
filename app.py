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


app.config['MYSQL_DATABASE_USER'] = "b0c31b0e5f6108"
app.config['MYSQL_DATABASE_PASSWORD'] = "008aadb1"
app.config['MYSQL_DATABASE_HOST'] = "us-cdbr-iron-east-03.cleardb.net"
app.config['MYSQL_DATABASE_DB'] = "heroku_d4e136b9b4dc6f5"
app.config['SECRET_KEY'] = 'SET T0 4NY SECRET KEY L1KE RAND0M H4SH'




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
from queries import searches, movies, fanclub
movies.addRoutes(app, mysql, genres)
searches.addSearchesRouts(app, mysql, genres)
fanclub.addFanClubRoutes(app, mysql, genres, current_user)


#===================================================================================
#                                ROUTE FUNCTIONS
#===================================================================================
@app.route('/')
@login_required
def hello():
    return render_template('profile.html')


@app.route('/profile', methods = ['GET'])
@login_required
def userprofile():
    return render_template('profile.html')

@app.route('/userprofile')
def anotherUser_profile():
    return render_template('anotherUserProfile.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')




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



#===================================================================================
#                                Queries
#===================================================================================


#---------------------------------
#     Profile RELATED
#---------------------------------
@app.route('/newsfeedactivity')
def newsfeed_activity():
    data = {'activity' : []}
    #query
    username = "'"+ current_user.username +"'"
    conn = mysql.connect()
    cur = conn.cursor()
    query = "select username, List_name, 'List', DATE(Lists.date_modified) d from Lists, follows where follows.followed_username =" + username +" and follows.following_username = Lists.username union select username, Title, 'Review', DATE(Reviews.date_modified) d from Reviews, follows where follows.followed_username = " + username +" and follows.following_username = Reviews.username union select username, Title, 'Text post', DATE(text_user.date_modified) d from text_user, follows where follows.followed_username =" + username + " and follows.following_username = text_user.username order by d desc"
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print result
    for i in result:
        data['activity'].append({'name': str(i[0]),'type': str(i[2]),'pubdate': str(i[3]), 'title' : str(i[1])})

    return jsonify(data)

@app.route('/userprofileactivity')
def userpofileactivity():
    data = {'activity' : []}
    #query
    username = "'"+ current_user.username +"'"
    conn = mysql.connect()
    cur = conn.cursor()
    query = "select username, List_name, 'List', DATE(date_modified) d from Lists where username =" + username +"union select username, Title, 'Review', DATE(date_modified) d from Reviews where username = " + username +" union select username, Title, 'Text post', DATE(date_modified) d from text_user where username =" + username + "order by d desc"
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print result
    for i in result:
        data['activity'].append({'name': str(i[0]),'type': str(i[2]),'pubdate': str(i[3]), 'title' : str(i[1])})

    return jsonify(data)

@app.route('/userreviews')
def userreviews():
    data = {'reviews' : []}
    #query
    username = "'"+ current_user.username +"'"
    conn = mysql.connect()
    cur = conn.cursor()
    query = "select * from Reviews where username = " + username
    cur.execute(query)
    result = cur.fetchall()
    conn.close()

    for i in result:
        data['reviews'].append({'Movie_title': str(i[2]),'Review_title': str(i[0]),'Rating': str(i[7]),'review': str(i[3])})

    return jsonify(data)

@app.route('/userank')
def userank():
    data = {'rank' :current_user.rank, 'user': current_user.username }

    return jsonify(data)


@app.route('/userlists')
def userlists():    
    #query
    print "hi\n\n\n"
    query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description, movies.Genre, movies.Image_link, DATE(lists.date_modified) d from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    list_info = {}
    wut= []
    print result
    print "hope this works\n"
    for i in result:
        if not (str(i[0]) in list_info):
               list_info[str(i[0])]= {'List_name': str(i[0]), 'year': str(i[6]), 'movies':[]}
        print str(i[0]) + "\n"
        #print list_info[str(i[0])][str(i[6])]
        print "\n"
    for i in result:
        list_info[str(i[0])]['movies'].append({'title': str(i[1]), 'year': str(i[2]), 'description': str(i[3]), 'genre': str(i[4]), 'poster': str(i[5])})
    for x in list_info.keys():
        wut.append(list_info[x])
    print wut
    print "\n\n"


    return jsonify({"lists":wut})

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
#{movieTitle: "",  title: "", review: "", rating: 0};
@app.route('/addReview', methods=['POST'])
def add_Review():
    data = request.get_json()
    print data['movieTitle'] + "  " + data['title'] + "   " + data['rating']
    print "its hereeee \n"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('addReview', (data['title'], current_user.username, data['rating'], data['review'], data['movieTitle'] ))
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
    
    return render_template('/login.html')

@app.route('/userLogin', methods=['POST'])
def user_Login():
    data = request.get_json()
    print "before the get\n\n"
    dude = User.get(data['email'])
    if (dude and dude.verify_password(data['password'])):
        print "IT got here \n\n"
        login_user(dude)
    print "salio"
    print current_user.username
    return render_template('profile.html')
    
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
    


class User(UserMixin):

    query = "select account.email, account.password_hash, account_belong_user.username, users.user_rank from account, account_belong_user, users where account.email = account_belong_user.email and account_belong_user.username = users.username" 
    #query = "select email, password_hash from account"
    conn = mysql.connect()
    cursor = conn.cursor()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    users = []
    for i in result:
        users.append({'email': str(i[0]), 'password_hash': str(i[1]),'username': str(i[2]),'rank': str(i[3])})
    print users 
    print "\n\n"
    def __init__(self, id):
        print "reached init\n\n"
        if not any(u['email'] == id for u in self.users):
            print "not found"
            raise UserNotFoundError()
        self.id = id
        for x in self.users:
            if x['email'] == id:
                self.password_hash = x['password_hash']
                self.username = x['username']
                self.rank = x['rank']
        #self.username = self.users['username']

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def get(self_class, id):
        '''Return user instance of id, return None if not exist'''
        try:
            user = self_class(id)
            print "exited init \n\n"
            return user
        except UserNotFoundError:
            return None

# Flask-Login use this to reload the user object from the user ID stored in the session
@login_manager.user_loader
def user_loader(id):
    return User.get(id)




    
if __name__ == '__main__':
    app.run()
