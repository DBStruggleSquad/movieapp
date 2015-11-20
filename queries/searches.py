
from flask.json import jsonify
from flask.globals import request
from flask import render_template
import json

def addSearchesRouts(app, mysql, genres):
    
    @app.route('/search-results')
    def search_results():
        return render_template('search-results.html')
    
    #para hacer queries de search movies
    @app.route('/searchMovie/<movie_title>')
    def search_movie(movie_title):
        print "Haciendo search query"
        query = "select * from Movies where lower(movies.Title)  Like lower('%" + movie_title + "%')"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        qresult = cur.fetchall()
        conn.close()
        
        result = []

        for info in qresult:
            print info
            dicResult = {}
            dicResult['name'] = str(info[0])
            dicResult['year'] = str(info[2])
            dicResult['genre'] = str(info[4])
            dicResult['poster'] = str(info[3])
            #dicResult['rating'] = str(info[8])
            dicResult['synopsis'] = str(info[1])
            result.append(dicResult)
            print "salio de aqui"
        print result
        tempResult = {"data": result}
        
        #tempResult = {"data": result}
        return jsonify(tempResult)