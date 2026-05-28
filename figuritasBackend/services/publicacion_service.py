from dao.publicacion_dao import PublicacionDAO
from services.exceptions import NotFound, ValidationError


class PublicacionService:
    @staticmethod
    def list(usuario_id=None, query=None):
        if usuario_id:
            return PublicacionDAO.get_by_usuario(usuario_id)
        if query:
            return PublicacionDAO.search(query)
        return PublicacionDAO.get_all()

    @staticmethod
    def get(id):
        pub = PublicacionDAO.get_by_id(id)
        if not pub:
            raise NotFound("Publicacion no encontrada")
        return pub

    @staticmethod
    def create(figurita_id, usuario_id, cantidad):
        try:
            cantidad = int(cantidad)
        except (TypeError, ValueError):
            raise ValidationError("cantidad debe ser entero")
        if cantidad <= 0:
            raise ValidationError("cantidad debe ser mayor a 0")
        return PublicacionDAO.create(
            figurita_id=int(figurita_id),
            usuario_id=int(usuario_id),
            cantidad=cantidad,
        )
