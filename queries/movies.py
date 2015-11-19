'''
Created on Nov 19, 2015

@author: galarwen
'''
from flask.json import jsonify
from flask.globals import request
from flask import render_template
from forms import moviesForm
import json

def addRoutes(app, mysql, genres):
    
    
    
    
    @app.route('/movie-profile')
    def movie_profile():
        form = moviesForm.AddMovie2ListForm()
        
        return render_template('movie-profile.html', form = form)
    
    
    
    
    

    @app.route('/movies', methods = ['GET'])
    def movies_main():
        if 'mostreviewed' in request.args:
            
            query = """ Select m.*, count(Movie_title) r_num from Reviews as r join Movies m on r.Movie_title = m.Title
                        group by Movie_title
                        order by r_num DESC"""
            conn = mysql.connect()
            cur = conn.cursor()
            cur.execute(query)
            qresult = cur.fetchall()
            conn.close()
            result = {"movies": []}
            for movie in qresult:
                result["movies"].append({'name': str(movie[0]), 'genre': movie[4], 'img': movie[3]}) #'img': 'static/img/movie-placeholder.svg'
                    
            return jsonify(result), 200
        elif 'bygender' in request.args:
            data = {"genrelist": []}     
            for genre in genres:
                query = "Select m.*, avg(rating) r_num from Reviews as r join Movies m on r.Movie_title = m.Title where genre like '%"  + str(genre) + "%' group by Movie_title order by r_num DESC"
                conn = mysql.connect()
                cur = conn.cursor()
                cur.execute(query)
                qresult = cur.fetchall()
                conn.close()
                tempdata = {'name': genre, "movies":[]}
                for movie in qresult:
                    tempdata["movies"].append({'name': movie[0], 'poster': movie[3]})
                if len(tempdata["movies"]) > 0:
                    data["genrelist"].append(tempdata)
                
            
            
            
            return jsonify(data), 200
        
        
        elif 'toprated' in request.args:
            data = {"toprated": []}
            query = """Select m.*, avg(rating) r_num
                         from Reviews as r join Movies m on r.Movie_title = m.Title
                         group by Movie_title
                         order by r_num DESC"""
            conn = mysql.connect()
            cur = conn.cursor()
            cur.execute(query)
            qresult = cur.fetchall()
            conn.close()
            
            for i in qresult:
                data['toprated'].append({'name': str(i[0]), 'poster': str(i[3])})
         
            return jsonify(data), 200
        else:
            return render_template('movies.html')
    
    @app.route('/movieinfo/<movie_title>')
    def movieinfo(movie_title):
        result = {}
        
        #query = "select * from movies where movies.title = '" + movie_title + "'"
        query = "Select m.*, avg(rating) r_num from Reviews as r join Movies m on r.Movie_title = m.Title where m.title = '" + movie_title + "' group by Movie_title"
        
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        qresult = cur.fetchall()
        conn.close()
        for info in qresult:
            print info
            result['name'] = str(info[0])
            result['year'] = str(info[2])
            result['genres'] = str(info[4])
            result['poster'] = str(info[3])
            result['rating'] = str(info[8])
            result['synopsis'] = str(info[1])
            print "salio de aqui"
        
        
        #anade los actores que partisiparon en la movie
        query = "select * from actors_in_movie where actors_in_movie.Title_mov = '" + movie_title + "'"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        qresult = cur.fetchall()
        conn.close()
        result['cast'] = []
        for actors in qresult:
            result['cast'].append({'name': actors[1], 'img': 'static/img/profile-picture-placeholder.svg'})
            pass
        
        return jsonify(result)
    
    @app.route('/moviesearch/<movie_title>')
    def moviesearch(movie_title):
        movie_info = {'hola':'dummydata'}
        return jsonify(movie_info)
    
    @app.route('/moviereviews/<movie_title>')
    def movie_reviews(movie_title):
        movieriviews = {"movies": []}
        query = "select * from reviews where reviews.Movie_title = '" + movie_title + "'"
        conn = mysql.connect()
        cur = conn.cursor()
        cur.execute(query)
        qresult = cur.fetchall()
        conn.close()
        for review in qresult:
            movieriviews["movies"].append({'reviewer': review[1], 'Movie_title': review[2], 'Review_title': review[0], 'Rating': str(review[7]),'review': review[3]})
        return jsonify(movieriviews)
    
    @app.route('/addmovie2list', methods=['POST'])
    def add_movie2list():
        data = request.get_json()
        temp = json.loads(str(data['listName']))
        conn = mysql.connect()
        cur = conn.cursor()
        cur.callproc('addListPost', (data['title'], temp['name'], 'Movies' , data['description'], data['movieTitle'] ))
        conn.commit()
        conn.close()
        
        return jsonify({})
