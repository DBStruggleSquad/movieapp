'''
Created on Nov 21, 2015

@author: galarwen
'''

from flask.json import jsonify
from flask import render_template, request, abort

def addEventsRoutes(app, mysql, genres, current_user):
    @app.route('/event-page')
    def event_page():
        return render_template('event-page.html')
    
    @app.route('/events')
    def events():
        return render_template('events.html')
    
    @app.route('/myeventactivity')
    def myeventactivity():
        print "Event activity is beaing asked"
        username = current_user.username
        query = """
            select events_inf.username, 'creates' as 'type', events_inf.Event_name , Date(events_inf.date_modified) as 'date', users.Image_link 
            from events_inf left join users on events_inf.username = users.username
            where events_inf.Event_name in (
            select attends.Event_name from attends where attends.username = '""" + username + "'" + """
            union
            select events_inf.Event_name from events_inf where events_inf.username = '""" + username + "'" + """
            )
            union
            select attends.username, 'is now attending' as 'type', attends.Event_name, Date(attends.date_modified) as 'date', users.Image_link 
            from attends left join users on attends.username = users.username
            where attends.Event_name in (
            select attends.Event_name from attends where attends.username = '""" + username + "'" + """
            union
            select events_inf.Event_name from events_inf where events_inf.username = '""" + username + "');"
            
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        queryResult = cur.fetchall()
        conn.close()
        eventactivity = {'data': []}
        data = []
        print "event"
        print ""
        for row in queryResult:
            print row
            data.append({'publisher': str(row[0]), 'eventName': str(row[2]), 'type': str(row[1]), 'pubdate': str(row[3]), 'img': str(row[4])})
        eventactivity['data'] = data
        return jsonify(eventactivity)

    @app.route('/getpublicevent')
    def get_public_event():
        pass
    
    @app.route('/getmyevents')
    def get_my_events():
        pass
    
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