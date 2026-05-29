from flask import Flask, jsonify
from flask_cors import CORS

from controllers.usuario_controller import usuario_bp
from controllers.figurita_controller import figurita_bp
from controllers.publicacion_controller import publicacion_bp
from controllers.google_places_controller import places_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(usuario_bp, url_prefix="/api/usuarios")
    app.register_blueprint(figurita_bp, url_prefix="/api/figuritas")
    app.register_blueprint(publicacion_bp, url_prefix="/api/publicaciones")
    app.register_blueprint(places_bp, url_prefix="/api/places")

    @app.route("/")
    def index():
        return jsonify({"status": "ok", "service": "figuritas-api"})

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
