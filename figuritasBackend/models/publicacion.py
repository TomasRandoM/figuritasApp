from db import get_connection
from models.figurita import Figurita
from models.usuario import Usuario


class PublicacionFigurita:
    def __init__(self, id, figurita, usuario, cantidad):
        self.id = id
        self.figurita = figurita
        self.usuario = usuario
        self.cantidad = cantidad

    _BASE_QUERY = (
        "SELECT p.id AS pub_id, p.cantidad, "
        "f.id AS fig_id, f.jugador, f.pais, f.nro_figurita, "
        "u.id AS usu_id, u.apellido, u.nombre, u.fecha_nacimiento, u.mail, u.direccion "
        "FROM publicaciones p "
        "JOIN figuritas f ON p.figurita_id = f.id "
        "JOIN usuarios u ON p.usuario_id = u.id"
    )

    @classmethod
    def _build(cls, row):
        figurita = Figurita(
            id=row["fig_id"],
            jugador=row["jugador"],
            pais=row["pais"],
            nro_figurita=row["nro_figurita"],
        )
        usuario = Usuario(
            id=row["usu_id"],
            apellido=row["apellido"],
            nombre=row["nombre"],
            fecha_nacimiento=row["fecha_nacimiento"],
            mail=row["mail"],
            direccion=row["direccion"],
        )
        return cls(
            id=row["pub_id"],
            figurita=figurita,
            usuario=usuario,
            cantidad=row["cantidad"],
        )

    @classmethod
    def get_all(cls):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(cls._BASE_QUERY + " ORDER BY p.id DESC")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls._build(r) for r in rows]

    @classmethod
    def get_by_id(cls, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(cls._BASE_QUERY + " WHERE p.id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls._build(row) if row else None

    @classmethod
    def get_by_usuario(cls, usuario_id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(cls._BASE_QUERY + " WHERE u.id = %s ORDER BY p.id DESC", (usuario_id,))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls._build(r) for r in rows]

    @classmethod
    def search(cls, query):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        like = f"%{query}%"
        cursor.execute(
            cls._BASE_QUERY
            + " WHERE f.jugador LIKE %s OR f.pais LIKE %s OR f.nro_figurita LIKE %s "
            "ORDER BY p.id DESC",
            (like, like, like),
        )
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls._build(r) for r in rows]

    @classmethod
    def create(cls, figurita_id, usuario_id, cantidad):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO publicaciones (figurita_id, usuario_id, cantidad) VALUES (%s, %s, %s)",
            (figurita_id, usuario_id, cantidad),
        )
        new_id = cursor.lastrowid
        conn.commit()
        cursor.close()
        conn.close()
        return cls.get_by_id(new_id)
