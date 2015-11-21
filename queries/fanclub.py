'''
Created on Nov 20, 2015

@author: galarwen
'''
from flask.json import jsonify
from flask.globals import request
from flask import render_template
import json

def addFanClubRoutes(app, mysql, genres):
    @app.route('/fanclub-page')
    def fanclub_page():
        return render_template('fanclub-page.html')
    
    @app.route('/fanclubs')
    def fanclubs():
        return render_template('fanclubs.html')
