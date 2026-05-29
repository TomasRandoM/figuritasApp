# controllers/places_controller.py

from flask import Blueprint, request, jsonify
import requests

places_bp = Blueprint("places", __name__)

GOOGLE_API_KEY = "tu_api_key"

@places_bp.route("/", methods=["GET"])
def autocomplete_places():
    query = request.args.get("q")

    url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"

    response = requests.get(url, params={
        "input": query,
        "key": GOOGLE_API_KEY,
        "language": "es",
        "components": "country:ar"
    })

    return jsonify(response.json())

@places_bp.route("/details", methods=["GET"])
def place_details():
    place_id = request.args.get("place_id")

    url = "https://maps.googleapis.com/maps/api/place/details/json"

    response = requests.get(url, params={
        "place_id": place_id,
        "key": GOOGLE_API_KEY,
        "fields": "formatted_address,geometry,place_id"
    })

    return jsonify(response.json())