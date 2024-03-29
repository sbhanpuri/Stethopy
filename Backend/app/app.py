from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import config as config


app = Flask(__name__)
# init my sql connection
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI  

# init the SQLAlchemy object
db = SQLAlchemy(app)

# import models
from models import *

# create db tables 
with app.app_context():
    db.create_all()



if __name__ == '__main__':
    from api.visualization_routes import visualization_blueprint
    from api.recording_routes import recording_blueprint
    from api.session_routes import session_blueprint
    app.register_blueprint(visualization_blueprint, url_prefix='/visualizations')
    app.register_blueprint(recording_blueprint, url_prefix='/recordings')
    app.register_blueprint(session_blueprint, url_prefix='/sessions')
    app.run(debug=True)
    # import api blueprint
    