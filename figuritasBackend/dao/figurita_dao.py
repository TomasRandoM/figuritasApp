from db import get_connection
from entities.figurita import Figurita


class FiguritaDAO:
    @staticmethod
    def _from_row(row):
        return Figurita(
            id=row["id"],
            jugador=row["jugador"],
            pais=row["pais"],
            nro_figurita=row["nro_figurita"],
            imagen_url=row.get("imagen_url"),
        )

    @classmethod
    def get_all(cls):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM figuritas ORDER BY nro_figurita")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls._from_row(r) for r in rows]

    @classmethod
    def get_by_id(cls, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM figuritas WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls._from_row(row) if row else None

    @classmethod
    def search(cls, query):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        like = f"%{query}%"

        sql = (
            "SELECT * FROM figuritas "
            "WHERE jugador LIKE %s OR pais LIKE %s OR nro_figurita LIKE %s "
            "ORDER BY nro_figurita"
        )

        params = (like, like, like)

        cursor.execute(sql, params)

        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return [cls._from_row(r) for r in rows]
