import os
import app
import unittest
import tempfile

class FlaskrTestCase(unittest.TestCase):

	def setUp(self):
		app.app.config['TESTING'] = True
		app.app.config['DEBUG'] = True
		print "hi2"
		self.app = app.app.test_client()



	def test_thi_db(self):
    		rv = self.app.get("/listinfo/helloooo")
     		print "hi\n\n"
     		print rv.data
    		assert '{  "listinfo": {    "movies": [      {        "description": "hi",         "genre": "Action, Mystery, Sci-Fi",         "postTitle": "testing tester",         "poster": "http://www.filmofilia.com/wp-content/uploads/2010/04/Inception_poster.jpg",         "title": "Inception",         "year": "2010"      }    ],     "name": "helloooo"  }}' in rv.data

if __name__ == '__main__':
	unittest.main()


