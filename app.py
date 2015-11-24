'''
Created on Sep 12, 2015

@author: Glory, Antoine
'''

from flask import Flask, flash, redirect, session, url_for,  request, get_flashed_messages
from flask import render_template
from flask.ext.mysql import MySQL
from flask.json import jsonify
from flask.ext.login import LoginManager, UserMixin, current_user, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask.ext.mail import Mail, Message
from flask.ext.testing import TestCase


global app, mysql, mail

app = Flask(__name__)

mysql = MySQL()


app.config['MYSQL_DATABASE_USER'] = "b0c31b0e5f6108"
app.config['MYSQL_DATABASE_PASSWORD'] = "008aadb1"
app.config['MYSQL_DATABASE_HOST'] = "us-cdbr-iron-east-03.cleardb.net"
app.config['MYSQL_DATABASE_DB'] = "heroku_d4e136b9b4dc6f5"
app.config['SECRET_KEY'] = 'SET T0 4NY SECRET KEY L1KE RAND0M H4SH'

app.config.update(dict(
    MAIL_SERVER = 'smtp.googlemail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = "filmshacktest123@gmail.com",
    MAIL_PASSWORD = "1qaz3edc5tgb"))
# email server





global genres
genres = ["Action","Adventure","Animation","Biography","Comedy","Crime","Documentary","Drama","Family","Fantasy","Film-Noir","History","Horror","Music","Musical","Mystery","Romance","Sci-Fi","Short","Sport","Thriller","War","Western"]

mail = Mail(app)
mysql.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class UserNotFoundError(Exception):
    pass
#=========
#Route import
from queries import searches, movies, fanclub, events, user, business
movies.addRoutes(app, mysql, genres)
searches.addSearchesRouts(app, mysql, genres)
fanclub.addFanClubRoutes(app, mysql, genres, current_user)
events.addEventsRoutes(app, mysql, genres, current_user, mail)
user.addUserRoutes(app, mysql, genres, current_user)
business.addBusinessRoute(app, mysql, genres, current_user)


#===================================================================================
#                                ROUTE FUNCTIONS
#===================================================================================
@app.route('/')
@login_required
def hello():
    return render_template('profile.html')




@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
@login_required
def home():
    return render_template('home.html')




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
@login_required
def business_profile():
    return render_template('business-profile.html')





#==============================================request.get_json()=====================================
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
    query = "select Lists.username, List_name, 'List', DATE(Lists.date_modified) d, users.Image_link,''  from Lists, follows, users where follows.followed_username =" + username +" and follows.following_username = Lists.username and follows.following_username = users.username union select Reviews.username, Title, 'Review', DATE(Reviews.date_modified) d, users.Image_link, '' from Reviews, follows, users where follows.followed_username = " + username +" and follows.following_username = Reviews.username and follows.following_username = users.username union select text_user.username, Title, 'Text post', DATE(text_user.date_modified) d, users.Image_link, Text_post from text_user, follows, users where follows.followed_username =" + username + " and follows.following_username = text_user.username and follows.following_username = users.username order by d desc"
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print result
    for i in result:
        data['activity'].append({'name': str(i[0]),'type': str(i[2]),'pubdate': str(i[3]), 'title' : str(i[1]), 'image' : str(i[4]), 'post' : str(i[5])})

    return jsonify(data)





#---------------------------------
#     LIST RELATED
#---------------------------------

@app.route('/usermovielistnames')
def user_list_names():
    data = {'lists' : []}
    #query
    conn = mysql.connect()
    cur = conn.cursor()
    query = "select lists.List_name from lists where lists.username = '" + current_user.username + "'"
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
    print "entro"
    #query
    query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description, movies.Genre, movies.Image_link, lists_post.Title from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title and lists.List_name = '" + listName + "'" 
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print "llego auqui"
    for i in result:
        list_info['listinfo']['movies'].append({'postTitle': str(i[6]),'title': str(i[1]), 'year': str(i[2]), 'description': str(i[3]), 'genre': str(i[4]), 'poster': str(i[5])})
    print list_info
    return jsonify(list_info)

@app.route('/listinfo-nonmovies/<listName>')
def listinfo_nonmovies(listName):
    print "\n Se esta pidiendo la siguiente lista: " + listName + "\n"
    list_info = {'listinfo':{'name': str(listName), 'content':[]}}
    
    #query
    query = "select lists.List_name, lists_post.Title, lists_post.description from lists, lists_post where lists.List_name = lists_post.List_name and lists.List_name = '" + listName + "'" 
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute(query)
    result = cur.fetchall()
    conn.close()
    print result 
    
    for i in result:
        list_info['listinfo']['content'].append({'title': str(i[1]),'description': str(i[2])})

    print list_info
    
    return jsonify(list_info)

@app.route('/deleteList/<listname>', methods=['DELETE'])
def delete_list(listname):
    
    if(not listname):
        return jsonify({'title': 'Delete Problems', 'data': '<center>You have to select a list. </center>'}), 404
    print "Borrando la siguiente list: " + listname + " para " + current_user.username
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('deleteList', (current_user.username, str(listname)))
    conn.commit()
    conn.close()
    return jsonify({'title': 'List Deleted', 'data': '<center>Your list "' + listname + '" has been deleted.</center>'})

@app.route('/deletemovieitemfromlist', methods=['POST'])
def delete_movie_item():
    data = request.get_json()
    if(not (data['listPostTitle'] and data['listTitle'] and data['movieTitle'])):
        return jsonify({'title': 'Movie Item Not Deleted', 'data': 'Error deleting'}), 404
    print "entro"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('deleteListpostM', (str(data['listPostTitle']), str(data['listTitle']), str(data['movieTitle'])  ) )
    conn.commit()
    conn.close()
    return jsonify({'title': 'Movie Item Deleted', 'data': 'Your post with title: "' + str(data['listPostTitle']) +'" has being deleted.'})

@app.route('/deletenonmovieitemfromlist', methods=['POST'])
def delete_nonmovie_item():
    data = request.get_json()
    if(not (data['listPostTitle'] and data['listTitle'])):
        return jsonify({'title': 'Item Not Deleted', 'data': 'Error deleting'}), 404
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('deleteListpost', (str(data['listPostTitle']), str(data['listTitle']) ) )
    conn.commit()
    conn.close()
    return jsonify({'title': 'Item Deleted', 'data': 'Your post with title: "' + str(data['listPostTitle']) +'" has being deleted.'})
    
#===================================================================================
#                                POST
#===================================================================================


@app.route('/addlist2user', methods=['POST'])
def add_list2user():
    data = request.get_json()
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('ListExists', (data['title'], current_user.username, data['category'] ))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    
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
    #verifica que todos los fields existan
    if( not (data['username'] and data['email'] and data['password1'] and data['password2'])):
        return jsonify({'data': "All the fields must be completed."}), 404
        
    if (len(str(data['username'])) < 1  or len(str(data['email'])) < 1  or len(str(data['password1'])) < 1  or len(str(data['password2'])) < 1):
        return jsonify({'data': "All the fields must be completed."}), 404
        
    if '@' not in data['email']:
        return jsonify({'data': "Must enter a valid email address."}), 404
    if(data['password1'] != data['password2']):
        return jsonify({'data': "Passwords must match before creating the account."}), 404

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
    print dude
    if (dude and dude.verify_password(data['password'])):
        print "IT got here \n\n"
        login_user(dude)
    else:
        return jsonify({'data': "Email or password invalid."}), 400

    print current_user.username
    return render_template('profile.html')

@app.route('/userLogout', methods=['POST'])
def user_Logout():
    logout_user()
    return render_template('profile.html')

@app.route('/recoverpassword', methods=['POST'])
def recovering_password():
    
    return jsonify({'title': 'Title', 'data': 'An email have being sent to your email account.'})
    
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
    users = []
    def __init__(self, id):
        query = "select account.email, account.password_hash, account_belong_user.username, users.user_rank, users.quote, users.Image_link from account, account_belong_user, users where account.email = account_belong_user.email and account_belong_user.username = users.username" 
        #query = "select email, password_hash from account"
        conn = mysql.connect()
        cursor = conn.cursor()
        cur = conn.cursor()
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
        for i in result:
            self.users.append({'email': str(i[0]), 'password_hash': str(i[1]),'username': str(i[2]),'rank': str(i[3]),'quote': str(i[4]),'image': str(i[5])})
        if not any(u['email'] == id for u in self.users):
            print "not found"
            raise UserNotFoundError()
        self.id = id
        for x in self.users:
            if x['email'] == id:
                self.password_hash = x['password_hash']
                self.username = x['username']
                self.rank = x['rank']
                self.quote = x['quote']
                self.image = x['image']
                self.email = x['email']
        #self.username = self.users['username']

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def get(self_class, id):
        '''Return user instance of id, return None if not exist'''
        try:
            user = self_class(id)
            return user
        except UserNotFoundError:
            return None

# Flask-Login use this to reload the user object from the user ID stored in the session
@login_manager.user_loader
def user_loader(id):
    return User.get(id)

@app.route('/followuser', methods=['POST'])
def follow_user():
    data = request.get_json()
    print data
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('userFollows', (current_user.username, data['user']))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    print "user followed"
    follower_notification(data, current_user.username);
    return jsonify({})

@app.route('/unfollowuser', methods=['POST'])
def unfollow_user():
    data = request.get_json()
    print data
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('unfollow', (current_user.username, data['user']))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    print "user unfollowed"
    return jsonify({})

@app.route('/followfanclub', methods=['POST'])
def follow_fanclub():
    data = request.get_json()
    print data
    username = "'"+ data['user'] +"'"
    conn = mysql.connect()
    cur = conn.cursor()
    cur.execute("select email from account_belong_user where username = "+username)
    hi = cur.fetchall()
    cur.callproc('followFanClub', (current_user.username, data['title']))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    dude = {'user': data['user'], 'email': "", 'Club': data['title'] }
    print "fanclub followed"
    for i in hi:
        dude['email'] = str(i[0])

    fan_follower_notification(dude, current_user.username);
    return jsonify({})

@app.route('/attendevent', methods=['POST'])
def attend_event():
    data = request.get_json()
    print data
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('attendEvent', (current_user.username, data['title']))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    return jsonify({})


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    mail.send(msg)

def follower_notification(followed, follower):
    send_email(follower + " is now following you!",
               "filmshacktest123@gmail.com",
               [str(followed['email'])],
               render_template("follower_email.txt", 
                               user=followed['user'], follower=follower),
               render_template("follower_email.html", 
                               user=followed['user'], follower=follower))

def fan_follower_notification(followed, follower):
    send_email(follower + " is now following your Fanclub!",
               "filmshacktest123@gmail.com",
               [str(followed['email'])],
               render_template("fanclub_follower_email.txt", 
                               user=followed['user'], follower=follower, fan=followed['Club']),
               render_template("fanclub_follower_email.html", 
                               user=followed['user'], follower=follower, fan=followed['Club']))

@app.route('/myuserank')
def myuserank():
    dude = User.get(current_user.id)
    data = {'rank' :dude.rank, 'user': dude.username, 'picture': dude.image, 'quote': dude.quote, 'email': dude.id} 
    return jsonify(data)

@app.route('/changepass', methods=['POST'])
def change_pass():
    data = request.get_json()
    print data
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('changePassword', (current_user.id, generate_password_hash(data['gvar'])))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    print "/Password Changed"
    return jsonify({})

@app.route('/changeEmail', methods=['POST'])
def change_email():
    data = request.get_json()
    print data
    conn = mysql.connect()
    cur = conn.cursor()
    cur.callproc('changeEmail', (current_user.id, data['gvar']))
    #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
    conn.commit()
    conn.close()
    logout_user()
    dude = User.get(data['gvar'])
    login_user(dude)
    print "email Changed"
    return jsonify({})

class MyTest(TestCase):

    def create_app(self):

        app = Flask(__name__)
        app.config['TESTING'] = True
        return app

    def test_thi_db(self):
        rv = self.app.get("/listinfo/helloooo")
        print "hi"
        assert "{'listinfo': {'movies': [{'description': 'hi', 'title': 'Inception', 'poster': 'http://www.filmofilia.com/wp-content/uploads/2010/04/Inception_poster.jpg', 'year': '2010', 'genre': 'Action, Mystery, Sci-Fi', 'postTitle': 'testing tester'}], 'name': 'helloooo'}}" in rv.data

if __name__ == '__main__':
    app.run()
