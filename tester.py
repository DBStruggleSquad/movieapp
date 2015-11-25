import os, json
import app
import unittest
import tempfile

class FlaskrTestCase(unittest.TestCase):

	def setUp(self):
		app.app.config['TESTING'] = True
		app.app.config['DEBUG'] = True
		self.app = app.app.test_client()
		self.login('tester@gmail.com', '1234')

	def tearDown(self):
		self.logout()



	def test_thi_db(self):
		print "Fists test \n\n"
		rv = self.app.get("/listinfo/helloooo")
		expected_dict = {'listinfo': {'movies': [{'description': 'No person should die before watching this movie', 'title': 'Constantine', 'poster': 'https://modernmythologies.files.wordpress.com/2015/08/constantine-poster.jpg', 'year': '2005', 'genre': 'Drama, Fantasy, Horror', 'postTitle': 'My number 1'}, {'description': 'This movie will change your life', 'title': 'Inception', 'poster': 'http://www.filmofilia.com/wp-content/uploads/2010/04/Inception_poster.jpg', 'year': '2010', 'genre': 'Action, Mystery, Sci-Fi', 'postTitle': 'My number 2'}, {'description': 'This movie is ok', 'title': 'Avatar', 'poster': 'http://moviecultists.com/wp-content/uploads/2009/11/avatar-poster.jpg', 'year': '2009', 'genre': 'Action, Adventure, Fantasy', 'postTitle': 'My number 3'}, {'description': 'hi1', 'title': 'The Purge', 'poster': 'http://vignette1.wikia.nocookie.net/horrormovies/images/1/19/Purge_Poster.jpg/revision/latest?cb=20140104044620', 'year': '2013', 'genre': 'Horror, Sci-Fi, Thriller', 'postTitle': 'wut1'}], 'name': 'My top 3'}}
		expected_dict_json = json.dumps(expected_dict)
		self.assertTrue(json.loads(rv.data), expected_dict)

	def test_list_insert(self):
		print "SEcond test \n\n"
		rv = self.app.get("/my-lists?mylist")
		expected_dict = {'mylist': []}
		self.assertTrue(json.loads(rv.data), expected_dict)
		rv2 = self.app.post('/addlist2user',data =json.dumps({'title': 'listfortest','category': 'Movies'}), follow_redirects=True,content_type = 'application/json')
		expected_dict2 = {}
		#rv = self.app.get("/my-lists?mylist")
		hi = rv2.data
		print hi
		self.assertTrue(json.loads(hi), expected_dict2)
		rv = self.app.delete("/deleteList/listfortest")
		print rv.data
		print "\n\n"
		expected_dict2 = {"data": "<center>Your list \"listfortest\" has been deleted.</center>", "title": "List Deleted"}
		self.assertTrue(json.loads(hi), expected_dict2)

	def test_fan_insert(self):
		print "third test \n\n"
		rv = self.app.get("/myfanclubs")
		expected_dict = {'data': []}
		self.assertTrue(json.loads(rv.data), expected_dict)
		rv2 = self.app.post('/addfanclub',data =json.dumps({'clubname':'fanclubtester','rol':'Movies','description':'tester'}), follow_redirects=True,content_type = 'application/json')
		expected_dict2 = {'worked': ""}
		#expected_dict2 = {"data": [{"creator": "tester","name": "fanclubtester","type": "Movies" }]}  {worked: ""}
		#rv = self.app.get("/my-lists?mylist")
		hi = rv2.data
		print hi
		self.assertTrue(json.loads(hi), expected_dict2)
		rv = self.app.post('/deletefanclub',data =json.dumps({'fan':'fanclubtester'}), follow_redirects=True,content_type = 'application/json')
		print rv.data
		print "\n\n"
		self.assertTrue(json.loads(rv.data), expected_dict2)

	def test_event_insert(self):
		print "fourth test \n\n"
		rv = self.app.get("/myuserreviews")
		expected_dict = {'data': []}
		self.assertTrue(json.loads(rv.data), expected_dict)
		rv2 = self.app.post('/createEvent',data =json.dumps({'eventName':'tester','description':'tester','eventType':'tester','eventTime':'1234','eventLocation':'tester'}), follow_redirects=True,content_type = 'application/json')
		expected_dict2 = {'worked': ""}
		#expected_dict2 = {"data": [{"creator": "tester","name": "fanclubtester","type": "Movies" }]}  {worked: ""}
		#rv = self.app.get("/my-lists?mylist")
		hi = rv2.data
		print hi
		self.assertTrue(json.loads(hi), expected_dict2)
		# rv = self.app.post('/deletefanclub',data =json.dumps({'fan':'fanclubtester'}), follow_redirects=True,content_type = 'application/json')
		# print rv.data
		# print "\n\n"
		# self.assertTrue(json.loads(rv.data), expected_dict2)

	def login(self, username, password):
		return self.app.post('/userLogin',data =json.dumps({'email': username,'password': password}), follow_redirects=True,content_type = 'application/json')

	def logout(self):
	    return self.app.post('/userLogout', data=dict(email=""),follow_redirects=True,content_type = 'application/json')


if __name__ == '__main__':
	unittest.main()





