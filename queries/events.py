'''
Created on Nov 21, 2015

@author: galarwen
'''

from flask.json import jsonify
from flask import render_template, request

def addEventsRoutes(app, mysql, genres, current_user):
    @app.route('/event-page')
    def event_page():
        return render_template('event-page.html')
    
    @app.route('/events')
    def events():
        return render_template('events.html')
    
    #{eventName   : "", description: "", eventType: "", eventTime: 0 , eventLocation: "", user}
    @app.route('/createEvent')
    def create_event():
           
        return jsonify()