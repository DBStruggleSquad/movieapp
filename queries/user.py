'''
Created on Nov 22, 2015

@author: galarwen
'''
from flask.json import jsonify
from flask import render_template, request
from flask.ext.login import login_required, current_user, login_user, logout_user
from flask.ext.mail import Mail, Message


def addUserRoutes(app, mysql, genres, current_user):
    @app.route('/profile', methods = ['GET'])
    @login_required
    def userprofile():
        return render_template('profile.html')
    
    @app.route('/userprofile')
    def anotherUser_profile():
        if current_user.username in request.args:
            return render_template('profile.html')
        return render_template('anotherUserProfile.html')
    
    @app.route('/userprofileactivity/<username>')
    def userpofileactivity(username):
        data = {'activity' : []}
        #query
        username = username 
        conn = mysql.connect()
        cur = conn.cursor()
        query = """
        select Lists.username, Lists.List_name, 'List', DATE(Lists.date_modified) d, users.Image_link
        from Lists left join users on Lists.username = users.username where Lists.username = '""" + username + "'" + """ 
        union select Reviews.username, Reviews.Title, 'Review', DATE(Reviews.date_modified) d, users.Image_link from Reviews left join users on Reviews.username = users.username
        where Reviews.username = '""" + username + "'" + """
        union select text_user.username, text_user.Title, 'Text post', DATE(text_user.date_modified) d, users.Image_link from text_user left join users on text_user.username = users.username where text_user.username = '""" + username + "'" + """ order by d desc
    
        
        """
        
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
        print result
        for i in result:
            data['activity'].append({'name': str(i[0]),'type': str(i[2]),'pubdate': str(i[3]), 'title' : str(i[1]), 'img': str(i[4])})
    
        return jsonify(data)

    @app.route('/myuserprofileactivity')
    def myuserpofileactivity():
        data = {'activity' : []}
        #query
        username = current_user.username 
        conn = mysql.connect()
        cur = conn.cursor()
        query = """
        select Lists.username, Lists.List_name, 'List', DATE(Lists.date_modified) d, '', users.Image_link
        from Lists left join users on Lists.username = users.username where Lists.username = '""" + username + "'" + """ 
        union select Reviews.username, Reviews.Title, 'Review', DATE(Reviews.date_modified) d, '', users.Image_link from Reviews left join users on Reviews.username = users.username
        where Reviews.username = '""" + username + "'" + """
        union select text_user.username, text_user.Title, 'Text post', DATE(text_user.date_modified) d, text_user.Text_post, users.Image_link from text_user left join users on text_user.username = users.username where text_user.username = '""" + username + "'" + """ order by d desc
    
        
        """
        
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
        print result
        for i in result:
            data['activity'].append({'name': str(i[0]),'type': str(i[2]),'pubdate': str(i[3]), 'title' : str(i[1]), 'post': str(i[4]), 'img': str(i[5])})
    
        return jsonify(data)
    
    @app.route('/myuserreviews')
    def myuserreviews():
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
    
    @app.route('/userreviews/<username>')
    def userreviews(username):
        data = {'reviews' : []}
        #query
        username = "'"+ username +"'"
        conn = mysql.connect()
        cur = conn.cursor()
        query = "select Reviews.Title, Reviews.username, Reviews.Movie_title, Reviews.Review, Reviews.Sharable, Date(Reviews.date_modified), Reviews.rating from Reviews where username = " + username + " order by Reviews.date_modified desc"
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
    
        for i in result:
            data['reviews'].append({'Movie_title': str(i[2]),'Review_title': str(i[0]),'Rating': str(i[6]),'review': str(i[3])})
    
        print "Review"
        print data
        return jsonify(data)
    
    
    #fixed
    @app.route('/userank/<username>')
    def userank(username):
        username = "'"+ username +"'"
        print "user en rank"
        print username
        conn = mysql.connect()
        cur = conn.cursor()
        query = "select account_belong_user.email, users.username, users.quote, users.user_rank, users.Image_link from account_belong_user, users where account_belong_user.username = users.username and users.username = " + username
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
        data = {'rank' :current_user.rank, 'user': username, 'picture': current_user.image, 'quote': current_user.quote}
        for i in result:
            print i
            data['rank'] = str(i[3])
            data['user'] = str(i[1])
            data[ 'picture'] = str(i[4])
            data['quote'] = str(i[2])
            data['email'] =  str(i[0])
            
        print "rank"
        print data
        return jsonify(data)
    
    @app.route('/myuserlists')
    def myuserlists():    
        #query
        query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description, movies.Genre, movies.Image_link, DATE(lists.date_modified) d from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title and lists.username = '" + current_user.username + "'"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
        list_info = {}
        wut= []
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
    
    
        return jsonify({"lists":wut})
    
    @app.route('/userlists/<username>')
    def userlists(username):    
        print "getting list for: " + username
        query = "select lists.List_name, movies.Title, movies.Release_year, lists_post.description, movies.Genre, movies.Image_link, DATE(lists.date_modified) d from lists_post, lists, lists_contains, movies where lists_post.List_name = lists.List_name and lists_contains.List_title = lists_post.Title and movies.Title = lists_contains.Movie_title and lists.username = '" + str(username) + "'"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        result = cur.fetchall()
        conn.close()
        list_info = {}
        wut= []
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
    
    
        return jsonify({"lists":wut})

    @app.route('/userfollows')
    def user_follows():
        data = {'following' : []}
        conn = mysql.connect()
        cur = conn.cursor()        
        query="select followed_username from follows where following_username = '" + current_user.username + "'"
        cur.execute(query)
        result = cur.fetchall()
        print result
        conn.close()
        for row in result:
            data['following'].append({'username': str(row[0])})
        return jsonify(data)           
    
    @app.route('/userfollowers')
    def user_followers():
        data = {'following' : []}
        conn = mysql.connect()
        cur = conn.cursor()        
        query="select following_username from follows where  followed_username = '" + current_user.username + "'"
        cur.execute(query)
        result = cur.fetchall()
        print result
        conn.close()
        for row in result:
            data['following'].append({'username': str(row[0])})
        return jsonify(data)   

    @app.route('/adduserpost', methods=['POST'])
    def add_user_post():
        data = request.get_json()
        if(not data['post']):
            return jsonify({'data': '<center> This post appears to be blank. <br>Please write something before posting.  </center>', 'title': 'Empty Post'}), 404
        print data
        conn = mysql.connect()
        cur = conn.cursor()
        cur.callproc('addUserTextPost', (data['title'], current_user.username, data['post']))
        #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
        conn.commit()
        conn.close()
        print "fanclub added"
        return jsonify({})
    
    @app.route('/myfriends')
    def my_friends():
        query = """
        select users.username, users.Image_link from follows left join users on follows.followed_username = users.username
        where follows.following_username = '""" + current_user.username + "';"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        myfriends = {'data': []}
        data = []
        for row in queryResult:
            data.append({'name': str(row[0]), 'img': str(row[1]), 'selected': "F"})
        myfriends['data'] = data
        return jsonify(myfriends)
    
    @app.route('/recoverpassword/<email>')
    def recover_password():
        pass

    @app.route('/changeuser', methods=['POST'])
    def change_user():
        data = request.get_json()
        print data
        conn = mysql.connect()
        cur = conn.cursor()
        cur.callproc('changeUsername', (current_user.username, data['gvar']))
        #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
        conn.commit()
        conn.close()
        print "Username Changed"
        return jsonify({})

    @app.route('/changequote', methods=['POST'])
    def change_quote():
        data = request.get_json()
        print data
        conn = mysql.connect()
        cur = conn.cursor()
        cur.callproc('changeQuote', (data['gvar'],current_user.username))
        #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
        conn.commit()
        conn.close()
        print "Quote Changed"
        return jsonify({})
    
    @app.route('/users')
    def users_home():
        return render_template('users.html')
    
    @app.route('/my-lists')
    @login_required
    def user_lists():
        
        if 'mylist' in request.args:
            data = {'mylist':[]}
            
            #query
            conn = mysql.connect()
            cur = conn.cursor()
            query = "select lists.List_name from lists where lists.username = '" + current_user.username + "'"
            cur.execute(query)
            result = cur.fetchall()
            
            for i in result:
                data['mylist'].append({'name': str(i[0])})
            
            conn.close()
            #data returned
            print data
            return jsonify(data)
        else:
            return render_template('my-lists.html')


    

    
