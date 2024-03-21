from flask import Blueprint, request, jsonify

visualization_blueprint = Blueprint('visualizations', __name__)

from services.visualization_service import *

# POST /api/visualizations to create a visualization for a recording
@visualization_blueprint.route('/', methods=['POST'])
def create_visualization_route():
    data = request.get_json()
    new_visualization = create_visualization(data)  # Use the service function
    return jsonify(new_visualization.to_dict()), 201

# GET /api/visualizations/{sessionId} to get all visualizations for a session
@visualization_blueprint.route('/<int:session_id>', methods=['GET'])
def get_visualizations_by_session_route(session_id):
    visualizations = get_visualizations_by_session(session_id)  # Use the service function
    return jsonify([visualization.to_dict() for visualization in visualizations]), 200


