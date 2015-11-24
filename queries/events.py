'''
Created on Nov 21, 2015

@author: galarwen
'''

from flask.json import jsonify
from flask import render_template, request, make_response
from flask.ext.mail import Message

def addEventsRoutes(app, mysql, genres, current_user, mail):
    @app.route('/event-page', methods=['GET'])
    def event_page():
        print "entro aqui le esta dando la que es"
        return render_template('event-page.html')
    

    
    @app.route('/events')
    def events():
        return render_template('events.html')
    
    @app.route('/eventinfo/<eventname>')
    def event_info(eventname):
        #primera parte extrae info del evento
        eventinfo = {}
        query = """
        select events_inf.Event_name, events_inf.username, events_inf.date_modified, events_inf.Event_location, events_inf.locale, events_inf.Event_description, events_inf.Event_type, events_inf.Event_time
        from events_inf
        where events_inf.Event_name = '""" + eventname + "';"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        for row in queryResult:
            eventinfo['type']           = str(row[6])
            eventinfo['name']           = str(row[0])
            eventinfo['date']           = str(row[2])
            eventinfo['host']           = str(row[1])
            eventinfo['locale']         = str(row[3])
            eventinfo['address']        = str(row[4])
            eventinfo['description']    = str(row[5])
            eventinfo['time']           = str(row[7])
        attendants = []
        query = """
        select users.username, users.Image_link from attends left join users on attends.username = users.username, events_inf
        where events_inf.Event_name = attends.Event_name and events_inf.Event_name = '""" + eventname + "';"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        for row in queryResult:
            attendants.append({'name': str(row[0]), 'img': str(row[1])})
        eventinfo['attendants'] = attendants
        return jsonify(eventinfo)
    
    @app.route('/myeventactivity')
    def myeventactivity():
        print "Event activity is beaing asked"
        username = current_user.username
        query = """
            select events_inf.username, 'creates' as 'type', events_inf.Event_name , Date(events_inf.date_modified) as date, users.Image_link 
            from events_inf left join users on events_inf.username = users.username
            where events_inf.Event_name in (
            select attends.Event_name from attends where attends.username = '""" + username + "'" + """
            union
            select events_inf.Event_name from events_inf where events_inf.username = '""" + username + "'" + """
            )
            union
            select attends.username, 'is now attending' as 'type', attends.Event_name, Date(attends.date_modified) as date, users.Image_link 
            from attends left join users on attends.username = users.username
            where attends.Event_name in (
            select attends.Event_name from attends where attends.username = '""" + username + "'" + """
            union
            select events_inf.Event_name from events_inf where events_inf.username = '""" + username + "') order by date desc;"
            
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        print "event testing \n\n"
        print queryResult
        eventactivity = {'data': []}
        data = []
        print "event"
        print ""
        for row in queryResult:
            print row
            data.append({'publisher': str(row[0]), 'eventName': str(row[2]), 'type': str(row[1]), 'pubdate': str(row[3]), 'img': str(row[4])})
        eventactivity['data'] = data
        return jsonify(eventactivity)

    @app.route('/mypublicevent')
    def my_public_event():
        print "My events has being asked"
        publicfanclubs = {'data': []}
        query = """
                select events_inf.Event_name, events_inf.date_modified, events_inf.username 
                from events_inf 
                where events_inf.Event_name not in (
                select attends.Event_name from attends where attends.username = '""" + current_user.username + "'" + """
                union
                select events_inf.Event_name from events_inf where events_inf.username = '""" + current_user.username + "');"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        resultQuery = cur.fetchall()
        cur.close()
        data = []
        for row in resultQuery:
            data.append({'name': str(row[0]), 'date': str(row[1]), 'host': str(row[2])})
        publicfanclubs['data'] = data
        return jsonify(publicfanclubs)
    
    @app.route('/myevents')
    def my_my_events():
        print "My events has being asked"
        myfanclubs = {'data': []}
        query = """
                select events_inf.Event_name, events_inf.date_modified, events_inf.username 
                from events_inf 
                where events_inf.Event_name in (
                select attends.Event_name from attends where attends.username = '""" + current_user.username + "'" + """
                union
                select events_inf.Event_name from events_inf where events_inf.username = '""" + current_user.username + "');"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        resultQuery = cur.fetchall()
        cur.close()
        data = []
        for row in resultQuery:
            data.append({'name': str(row[0]), 'date': str(row[1]), 'host': str(row[2])})
        myfanclubs['data'] = data
        return jsonify(myfanclubs)
    
    @app.route('/searchevents/<data2search>', methods=['GET'])
    def search_events(data2search):
        query = "select * from events_inf where lower(events_inf.Event_name) like lower('%" + data2search + "%');"
        conn = mysql()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        data = []
        for row in queryResult:
            data.append({'eventName': str(row[0]), 'username': str(row[5]), 'date': str(row[7])}) #deberia ser 6 en vez de 7
        
    #{eventName   : "", description: "", eventType: "", eventTime: 0 , eventLocation: "", user}
    @app.route('/createEvent', methods=['POST'])
    def create_event():
        print "Event is being added"
        data = request.get_json()
        print data
        conn = mysql.connect()
        cur = conn.cursor()
        if 'eventTime' not in data:
            return jsonify({'data': 'Event time was not specified'}), 400
            #abort(400, 'Event time was not specified')
        #if not isinstance(data['eventTime'], int):
        #    return jsonify({'data': 'Event time have to be an int'}), 400
            #abort(400, 'Event time have to be a int')
        if 'eventName' not in data or data['eventName'] == "":
            return jsonify({'data': "Event name have to be specified"}), 400
            #abort(400, "Event name have to be specified")
        cur.callproc('createEvent', (data['eventName'], data['description'], data['eventType'], int(data['eventTime']), data['eventLocation'], current_user.username ))
        conn.commit()
        conn.close()
        print "Event added"
        return jsonify({})

    @app.route('/deleteEvent', methods=['POST'])
    def delete_event():
        print "Event is being deleted"
        data = request.get_json()
        print data
        conn = mysql.connect()
        cur = conn.cursor()
        cur.callproc('deleteEvent', (current_user.username,data['event']))
        conn.commit()
        conn.close()
        print "Event added"
        return jsonify({})
  
    
    @app.route('/invitetoevent', methods=['POST'])
    def invite_event():
        data = request.get_json()
        print data
        eventName = str(data['eventName'])
        users = data['users']
        for user in users:
            query = """
            select account_belong_user.email
            from account_belong_user
            where account_belong_user.username = '""" + user + "';"
            conn = mysql.connect()
            cur = conn.cursor()
            cur.execute(query)
            queryResult = cur.fetchall()
            conn.close()
            userdata = {}
            for email in queryResult:
                userdata = {'user': str(user), 'email': str(email[0])}
            if('email' in userdata): #queire decir que el email esta en la cuenta
                print "enviando email"
                print userdata
                eventInvite_emailNotification(  userdata, current_user.username, eventName)
        
        return jsonify({})
        
    #==============================================================================
    def send_email(subject, sender, recipients, text_body, html_body):
        msg = Message(subject, sender=sender, recipients=recipients)
        msg.body = text_body
        msg.html = html_body
        mail.send(msg)
        
    def eventInvite_emailNotification(receiver, sender, eventName):
        send_email(sender + " invite you to " + eventName + " event.",
                   "filmshacktest123@gmail.com",
                   [str(receiver['email'])],
                   render_template("event_invite_email.txt", 
                                   user=receiver['user'], follower=sender, eventName=eventName),
                   render_template("event_invite_email.html", 
                                   user=receiver['user'], follower=sender, eventName=eventName))
        
        
        
        
        
        