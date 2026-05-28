from flask import Blueprint, jsonify, request

from services.figurita_service import FiguritaService
from services.exceptions import NotFound
from views import figurita_view

figurita_bp = Blueprint("figurita", __name__)


@figurita_bp.route("/", methods=["GET"])
def list_figuritas():
    q = request.args.get("q")
    return jsonify(figurita_view.serialize_list(FiguritaService.list_or_search(q)))


@figurita_bp.route("/<int:id>", methods=["GET"])
def get_figurita(id):
    try:
        f = FiguritaService.get(id)
    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    return jsonify(figurita_view.serialize(f))
