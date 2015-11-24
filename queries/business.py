from flask.json import jsonify
from flask import render_template, request
from flask.ext.login import login_required, current_user, login_user, logout_user
from flask.ext.mail import Mail, Message

def addBusinessRoute(app, mysql, genres, current_user):
    @app.route('/mybusinessinfo/<name>')
    def business_info(name):
        print name
        query = "select a.username, a.quote, a.email from account_belong_business as a where a.username = '" + name + "';"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        businessinfo = {'name': "", 'quote': "", 'email': ""}
        for row in queryResult:
            businessinfo['name'] = str(row[0])
            businessinfo['quote'] = str(row[1])
            businessinfo['email'] = str(row[2])
        
        print "salio de aqui"
        query = "select t.Title, t.Text_post, Date(t.date_modified) from text_business as t where t.username = '" + name + "';"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        businessactivity = {'data': []}
        data = []
        for row in queryResult:
            data.append({'title': str(row[0]) ,'text': str(row[1]),'pubdate': str(row[2])})
        businessactivity['data'] = data
        result = {'businessinfo': businessinfo, 'businessactivity': businessactivity}
        print result
        return jsonify(result)
    
    @app.route('/isuserownerbuisnesspage/<businesspagename>')
    def isuserownerbuisnesspage(businesspagename):
        print businesspagename
        query = "select account_belong_business.email from account_belong_business where account_belong_business.username = '" + str(businesspagename) + "'"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        tempEmail = ""
        for row in queryResult:
            tempEmail = str(row[0])
        result = {'data': "false"}
        print tempEmail + "   " + current_user.id
        if (current_user.id == tempEmail):
            result['data'] = "true"

        return jsonify(result)
    
    @app.route('/businesspages')
    def business_pages():
        data = {'following' : []}
        conn = mysql.connect()
        cur = conn.cursor()        
        query="select account_belong_business.username from account_belong_business"
        cur.execute(query)
        result = cur.fetchall()
        print result
        conn.close()
        for row in result:
            data['following'].append({'username': str(row[0])})
        return jsonify(data)
    
    @app.route('/addbuisinesspost', methods=['POST'])
    def addbuisinesspost():
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
"""
        query = ""
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        
        for row in queryResult:
            pass
            """