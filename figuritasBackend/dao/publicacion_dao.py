from db import get_connection
from entities.figurita import Figurita
from entities.usuario import Usuario
from entities.publicacion import PublicacionFigurita


class PublicacionDAO:
    _BASE_QUERY = (
        "SELECT p.id AS pub_id, p.cantidad, "
        "f.id AS fig_id, f.jugador, f.pais, f.nro_figurita, f.imagen_url, "
        "u.id AS usu_id, u.apellido, u.nombre, u.fecha_nacimiento, u.mail, u.direccion, "
        "u.latitud, u.longitud, u.maps_link "
        "FROM publicaciones p "
        "JOIN figuritas f ON p.figurita_id = f.id "
        "JOIN usuarios u ON p.usuario_id = u.id"
    )

    @staticmethod
    def _from_row(row):
        figurita = Figurita(
            id=row["fig_id"],
            jugador=row["jugador"],
            pais=row["pais"],
            nro_figurita=row["nro_figurita"],
            imagen_url=row.get("imagen_url"),
        )
        usuario = Usuario(
            id=row["usu_id"],
            apellido=row["apellido"],
            nombre=row["nombre"],
            fecha_nacimiento=row["fecha_nacimiento"],
            mail=row["mail"],
            direccion=row["direccion"],
            latitud=row.get("latitud"),
            longitud=row.get("longitud"),
            maps_link=row.get("maps_link"),
        )
        return PublicacionFigurita(
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
        return [cls._from_row(r) for r in rows]

    @classmethod
    def get_by_id(cls, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(cls._BASE_QUERY + " WHERE p.id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls._from_row(row) if row else None

    @classmethod
    def get_by_usuario(cls, usuario_id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(cls._BASE_QUERY + " WHERE u.id = %s ORDER BY p.id DESC", (usuario_id,))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls._from_row(r) for r in rows]

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
        return [cls._from_row(r) for r in rows]

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

    @classmethod
    def delete(cls, publicacion_id):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM publicaciones WHERE id = %s",
            (publicacion_id,),
        )
        conn.commit()
        cursor.close()
        conn.close()
        return True
