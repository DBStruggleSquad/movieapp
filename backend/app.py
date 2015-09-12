'''
Created on Sep 12, 2015

@author: Glory
'''

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello"

if __name__ == '__main__':
    app.run()