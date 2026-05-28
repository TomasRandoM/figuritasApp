from dao.figurita_dao import FiguritaDAO
from services.exceptions import NotFound


class FiguritaService:
    @staticmethod
    def list_or_search(query=None):
        if query:
            return FiguritaDAO.search(query)
        return FiguritaDAO.get_all()

    @staticmethod
    def get(id):
        f = FiguritaDAO.get_by_id(id)
        if not f:
            raise NotFound("Figurita no encontrada")
        return f
