from flask import Blueprint, jsonify, request

from models.figurita import Figurita
from views import figurita_view

figurita_bp = Blueprint("figurita", __name__)


@figurita_bp.route("/", methods=["GET"])
def list_figuritas():
    q = request.args.get("q")
    if q:
        return jsonify(figurita_view.serialize_list(Figurita.search(q)))
    return jsonify(figurita_view.serialize_list(Figurita.get_all()))


@figurita_bp.route("/<int:id>", methods=["GET"])
def get_figurita(id):
    f = Figurita.get_by_id(id)
    if not f:
        return jsonify({"error": "Figurita no encontrada"}), 404
    return jsonify(figurita_view.serialize(f))
