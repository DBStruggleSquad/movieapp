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
    
    @app.route('/addbusspost', methods=['POST'])
    def add_buss_post():
        data = request.get_json()
        if(not data['post']):
            return jsonify({'data': '<center> This post appears to be blank. <br>Please write something before posting.  </center>', 'title': 'Empty Post'}), 404
        print data
        conn = mysql.connect()
        cur = conn.cursor()
        cur.callproc('addBussPost', (data['title'], data['bname'], data['post']))
        #cur.callproc('ListExists', ('dude', 'Jennifer Lawrence', 'Movies' ))
        conn.commit()
        conn.close()
        print "business post added"
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