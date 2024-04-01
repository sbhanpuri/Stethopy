# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

# # Initialize the extensions but do not associate them with any app yet.
# # db = SQLAlchemy()
# # migrate = Migrate()

# def create_app():
#   # Instantiate the Flask application
#   app = Flask(__name__, instance_relative_config=False)
  
#   # Configuration
#   app.config.from_object('config.Config')  # Adjust 'config.Config' as necessary for your project
  
#   # Initialize plugins
#   # db.init_app(app)
#   # migrate.init_app(app, db)
  
#   with app.app_context():
#     # Import parts of our application
#     from .models import models
#     from .api.routes import example
    
#     # Register Blueprints
#     # app.register_blueprint(example.bp)  # Example of registering a blueprint
    
#     # Create database tables for our data models
#     # db.create_all()

#     return app


# __init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# Import models here to ensure they are known to SQLAlchemy
# from models import *

# Initialize the extensions without any app associated
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """Application Factory Function"""
    app = Flask(__name__)

    # Load your configuration from 'config.py' or another module
    app.config.from_object('config.Config')

    # Initialize extensions with the app
    db.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        

        # Optionally, create database tables here if not using Flask-Migrate
        from models.patient import Patient
        from models.session import Session
        from models.audio_records import AudioRecords
        from models.audio_visualizations import AudioVisualizations
        from models.events import CalendarEvents, Appointments, Holidays
        from models.join_tables import DoctorPatient
        from models.doctor import Doctor
        db.create_all()  # Recommended to use Flask-Migrate instead

        # Import and register your blueprints here
        # from .api import your_blueprint
        # app.register_blueprint(your_blueprint)
        # from api.visualization_routes import visualization_blueprint
        # from api.recording_routes import recording_blueprint
        # from api.session_routes import session_blueprint
        # app.register_blueprint(visualization_blueprint, url_prefix='/visualizations')
        # app.register_blueprint(recording_blueprint, url_prefix='/recordings')
        # app.register_blueprint(session_blueprint, url_prefix='/sessions')

    return app
