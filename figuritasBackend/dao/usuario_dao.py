from db import get_connection
from entities.usuario import Usuario


class UsuarioDAO:
    @staticmethod
    def _from_row(row):
        return Usuario(
            id=row["id"],
            apellido=row["apellido"],
            nombre=row["nombre"],
            fecha_nacimiento=row["fecha_nacimiento"],
            mail=row["mail"],
            direccion=row["direccion"],
            latitud=row.get("latitud"),
            longitud=row.get("longitud"),
            maps_link=row.get("maps_link"),
            password=row.get("password"),
        )

    @classmethod
    def get_all(cls):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios ORDER BY id")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls._from_row(r) for r in rows]

    @classmethod
    def get_by_id(cls, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls._from_row(row) if row else None

    @classmethod
    def get_by_mail(cls, mail):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE mail = %s", (mail,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls._from_row(row) if row else None

    @classmethod
    def create(cls, apellido, nombre, fecha_nacimiento, mail, direccion, latitud, longitud, maps_link, password):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO usuarios "
            "(apellido, nombre, fecha_nacimiento, mail, direccion, latitud, longitud, maps_link, password) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (apellido, nombre, fecha_nacimiento, mail, direccion, latitud, longitud, maps_link, password),
        )
        new_id = cursor.lastrowid
        conn.commit()
        cursor.close()
        conn.close()
        return cls.get_by_id(new_id)
