from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# init my sql connection
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI  

# init the SQLAlchemy object
db = SQLAlchemy(app)

# import models
from app.models.models import *

# create db tables 
with app.app_context():
    db.create_all()

# import api blueprint
from app.api.routes import api_blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)