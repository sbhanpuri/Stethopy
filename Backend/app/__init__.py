from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize the extensions but do not associate them with any app yet.
db = SQLAlchemy()
migrate = Migrate()

def create_app():
  # Instantiate the Flask application
  app = Flask(__name__, instance_relative_config=False)
  
  # Configuration
  app.config.from_object('config.Config')  # Adjust 'config.Config' as necessary for your project
  
  # Initialize plugins
  db.init_app(app)
  migrate.init_app(app, db)
  
  with app.app_context():
    # Import parts of our application
    from .models import models
    from .routes import example
    
    # Register Blueprints
    # app.register_blueprint(example.bp)  # Example of registering a blueprint
    
    # Create database tables for our data models
    db.create_all()

    return app
