# from flask import Flask
# import config

# def create_app():
#   app = Flask(__name__)
#   app.config.from_object(config)
  
#   from .models import db
#   db.init_app(app)
  
#   from ..api.routes import main as main_blueprint
#   app.register_blueprint(main_blueprint)
  
#   return app
