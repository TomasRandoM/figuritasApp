from flask import Blueprint, jsonify, request

from services.publicacion_service import PublicacionService
from services.exceptions import NotFound, ValidationError
from views import publicacion_view

publicacion_bp = Blueprint("publicacion", __name__)


@publicacion_bp.route("/", methods=["GET"])
def list_publicaciones():
    usuario_id = request.args.get("usuario_id", type=int)
    q = request.args.get("q")
    return jsonify(
        publicacion_view.serialize_list(
            PublicacionService.list(usuario_id=usuario_id, query=q)
        )
    )


@publicacion_bp.route("/<int:id>", methods=["GET"])
def get_publicacion(id):
    try:
        pub = PublicacionService.get(id)
    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    return jsonify(publicacion_view.serialize(pub))


@publicacion_bp.route("/", methods=["POST"])
def create_publicacion():
    data = request.get_json() or {}
    figurita_id = data.get("figuritaId")
    usuario_id = data.get("usuarioId")
    cantidad = data.get("cantidad")
    if not figurita_id or not usuario_id or not cantidad:
        return jsonify(
            {"error": "Se requieren figuritaId, usuarioId y cantidad"}
        ), 400
    try:
        pub = PublicacionService.create(
            figurita_id=figurita_id,
            usuario_id=usuario_id,
            cantidad=cantidad,
        )
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    return jsonify(publicacion_view.serialize(pub)), 201
