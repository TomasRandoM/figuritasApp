from dao.usuario_dao import UsuarioDAO
from services.exceptions import DuplicateEmail, InvalidCredentials, NotFound


class UsuarioService:
    @staticmethod
    def list_all():
        return UsuarioDAO.get_all()

    @staticmethod
    def get(id):
        u = UsuarioDAO.get_by_id(id)
        if not u:
            raise NotFound("Usuario no encontrado")
        return u

    @staticmethod
    def register(apellido, nombre, fecha_nacimiento, mail, direccion, latitud, longitud, maps_link, password):
        if UsuarioDAO.get_by_mail(mail):
            raise DuplicateEmail("El mail ya está registrado")
        return UsuarioDAO.create(
            apellido=apellido,
            nombre=nombre,
            fecha_nacimiento=fecha_nacimiento,
            mail=mail,
            direccion=direccion,
            latitud=latitud,
            longitud=longitud,
            maps_link=maps_link,
            password=password,
        )

    @staticmethod
    def login(mail, password):
        u = UsuarioDAO.get_by_mail(mail)
        # Comparación en texto plano: proyecto de aprendizaje, no usar en producción.
        if not u or u.password != password:
            raise InvalidCredentials("Credenciales inválidas")
        return u
