from flask import Blueprint, jsonify, request

from models.usuario import Usuario
from views import usuario_view

usuario_bp = Blueprint("usuario", __name__)


@usuario_bp.route("/", methods=["GET"])
def list_usuarios():
    return jsonify(usuario_view.serialize_list(Usuario.get_all()))


@usuario_bp.route("/<int:id>", methods=["GET"])
def get_usuario(id):
    u = Usuario.get_by_id(id)
    if not u:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(usuario_view.serialize(u))


@usuario_bp.route("/", methods=["POST"])
def create_usuario():
    data = request.get_json() or {}
    required = ["apellido", "nombre", "mail"]
    if not all(data.get(k) for k in required):
        return jsonify({"error": f"Faltan campos requeridos: {required}"}), 400
    u = Usuario.create(
        apellido=data.get("apellido"),
        nombre=data.get("nombre"),
        fecha_nacimiento=data.get("fechaNacimiento"),
        mail=data.get("mail"),
        direccion=data.get("direccion"),
    )
    return jsonify(usuario_view.serialize(u)), 201
