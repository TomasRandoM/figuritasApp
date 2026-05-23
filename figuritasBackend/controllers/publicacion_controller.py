from flask import Blueprint, jsonify, request

from models.publicacion import PublicacionFigurita
from views import publicacion_view

publicacion_bp = Blueprint("publicacion", __name__)


@publicacion_bp.route("/", methods=["GET"])
def list_publicaciones():
    usuario_id = request.args.get("usuario_id", type=int)
    q = request.args.get("q")
    if usuario_id:
        return jsonify(
            publicacion_view.serialize_list(
                PublicacionFigurita.get_by_usuario(usuario_id)
            )
        )
    if q:
        return jsonify(
            publicacion_view.serialize_list(PublicacionFigurita.search(q))
        )
    return jsonify(
        publicacion_view.serialize_list(PublicacionFigurita.get_all())
    )


@publicacion_bp.route("/<int:id>", methods=["GET"])
def get_publicacion(id):
    pub = PublicacionFigurita.get_by_id(id)
    if not pub:
        return jsonify({"error": "Publicacion no encontrada"}), 404
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
        cantidad = int(cantidad)
    except (TypeError, ValueError):
        return jsonify({"error": "cantidad debe ser entero"}), 400
    if cantidad <= 0:
        return jsonify({"error": "cantidad debe ser mayor a 0"}), 400

    pub = PublicacionFigurita.create(
        figurita_id=int(figurita_id),
        usuario_id=int(usuario_id),
        cantidad=cantidad,
    )
    return jsonify(publicacion_view.serialize(pub)), 201
