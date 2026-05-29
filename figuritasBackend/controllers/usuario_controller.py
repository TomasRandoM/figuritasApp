from flask import Blueprint, jsonify, request

from services.usuario_service import UsuarioService
from services.exceptions import DuplicateEmail, InvalidCredentials, NotFound
from views import usuario_view

usuario_bp = Blueprint("usuario", __name__)


@usuario_bp.route("/", methods=["GET"])
def list_usuarios():
    return jsonify(usuario_view.serialize_list(UsuarioService.list_all()))


@usuario_bp.route("/<int:id>", methods=["GET"])
def get_usuario(id):
    try:
        u = UsuarioService.get(id)
    except NotFound as e:
        return jsonify({"error": str(e)}), 404
    return jsonify(usuario_view.serialize(u))


@usuario_bp.route("/", methods=["POST"])
def create_usuario():
    data = request.get_json() or {}
    required = ["apellido", "nombre", "mail", "password"]
    if not all(data.get(k) for k in required):
        return jsonify({"error": f"Faltan campos requeridos: {required}"}), 400
    try:
        u = UsuarioService.register(
            apellido=data.get("apellido"),
            nombre=data.get("nombre"),
            fecha_nacimiento=data.get("fechaNacimiento"),
            mail=data.get("mail"),
            direccion=data.get("direccion"),
            latitud=data.get("latitud"),
            longitud=data.get("longitud"),
            maps_link=data.get("maps_link") or data.get("mapsLink"),
            password=data.get("password"),
        )
    except DuplicateEmail as e:
        return jsonify({"error": str(e)}), 409
    return jsonify(usuario_view.serialize(u)), 201


@usuario_bp.route("/login", methods=["POST"])
def login_usuario():
    data = request.get_json() or {}
    mail = data.get("mail")
    password = data.get("password")
    if not mail or not password:
        return jsonify({"error": "Se requieren mail y password"}), 400
    try:
        u = UsuarioService.login(mail, password)
    except InvalidCredentials as e:
        return jsonify({"error": str(e)}), 401
    return jsonify(usuario_view.serialize(u))
