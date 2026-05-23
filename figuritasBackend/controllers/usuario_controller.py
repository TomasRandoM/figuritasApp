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
    required = ["apellido", "nombre", "mail", "password"]
    if not all(data.get(k) for k in required):
        return jsonify({"error": f"Faltan campos requeridos: {required}"}), 400
    if Usuario.get_by_mail(data["mail"]):
        return jsonify({"error": "El mail ya está registrado"}), 409
    u = Usuario.create(
        apellido=data.get("apellido"),
        nombre=data.get("nombre"),
        fecha_nacimiento=data.get("fechaNacimiento"),
        mail=data.get("mail"),
        direccion=data.get("direccion"),
        password=data.get("password"),
    )
    return jsonify(usuario_view.serialize(u)), 201


@usuario_bp.route("/login", methods=["POST"])
def login_usuario():
    data = request.get_json() or {}
    mail = data.get("mail")
    password = data.get("password")
    if not mail or not password:
        return jsonify({"error": "Se requieren mail y password"}), 400
    u = Usuario.get_by_mail(mail)
    # Comparación en texto plano: proyecto de aprendizaje, no usar en producción.
    if not u or u.password != password:
        return jsonify({"error": "Credenciales inválidas"}), 401
    return jsonify(usuario_view.serialize(u))
