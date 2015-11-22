'''
Created on Nov 20, 2015

@author: galarwen
'''
from flask.json import jsonify
from flask import render_template

def addFanClubRoutes(app, mysql, genres, current_user):
    @app.route('/fanclub-page')
    def fanclub_page():
        return render_template('fanclub-page.html')
    
    @app.route('/fanclubs')
    def fanclubs():
        return render_template('fanclubs.html')
    
    @app.route('/fanclubinfo/<fanClubName>')
    def fanclub_info(fanClubName):
        print "Fan club info asked, for: " + fanClubName
        fanclubInfo = {}
        query = "select * from fan_club where fan_club.Club_name = '" + fanClubName + "'"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        for row in queryResult:
            fanclubInfo['name'] = str(row[0])
            fanclubInfo['director'] = str(row[1])
            fanclubInfo['type'] = str(row[2])
            fanclubInfo['date'] = str(row[4])
            fanclubInfo['description'] = str(row[3])
        
        members = []
        query = "select follows_fan_club.*, users.Image_link from follows_fan_club join users on follows_fan_club.username = users.username where follows_fan_club.Club_name =  '" + fanClubName + "'"
        cur.execute(query)
        queryResult = cur.fetchall()
        for row in queryResult:
            members.append({'name': str(row[0]), 'img': str(row[4])})
        fanclubInfo['members'] = members
        print "next information is beaing returned: "
        print fanclubInfo
        return jsonify(fanclubInfo)
    
    @app.route('/myfanclubactivity')
    def my_fanclub_activity():
        print "Activity for current user is being query"
        query = """
            select text_fan_club.Title, text_fan_club.username, text_fan_club.Club_name, text_fan_club.Text_post, 'Post', DATE(text_fan_club.date_modified) d, users.Image_link
            from text_fan_club left join users on users.username = text_fan_club.username, fan_club 
            where fan_club.Club_name = text_fan_club.Club_name and fan_club.username = '""" + current_user.username + "'" + """
            union
            select text_fan_club.Title, text_fan_club.username, text_fan_club.Club_name, text_fan_club.Text_post, 'Post', DATE(text_fan_club.date_modified) d, users.Image_link
            from text_fan_club left join users on users.username = text_fan_club.username, follows_fan_club
            where follows_fan_club.Club_name = text_fan_club.Club_name and follows_fan_club.username = '""" + current_user.username + "'" + """
            union
            select '', b.username, b.Club_name, 'Is now following', 'User', DATE(b.date_modified) as d, users.Image_link  from follows_fan_club as a, follows_fan_club as b, users where a.username = '""" + current_user.username + "'" + """ and a.Club_name = b.Club_name and users.username =  b.username
            union
            select '', b.username, b.Club_name, 'Is now following', 'User', DATE(b.date_modified) d, users.Image_link  from follows_fan_club as a, follows_fan_club as b, users, fan_club where fan_club.Club_name = b.Club_name and users.username =  '""" + current_user.username + "'" + """ and fan_club.username = '""" + current_user.username + "'" +  """order by d desc;
        """
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        resultQuery = cur.fetchall()
        conn.close()
        
        fanclubactivity = {'data': []}
        data = []
        for row in resultQuery:
            data.append({'publisher': str(row[1]), 'type': str(row[4]), 'pubdate': str(row[5]), 'text': str(row[3]), 'title': str(row[0]), 'img': str(row[6]), 'fanclub': row[2] }) 
        fanclubactivity['data'] = data    
        return jsonify(fanclubactivity)
    
    
    