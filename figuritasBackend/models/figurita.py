from db import get_connection


class Figurita:
    def __init__(self, id, jugador, pais, nro_figurita):
        self.id = id
        self.jugador = jugador
        self.pais = pais
        self.nro_figurita = nro_figurita

    @classmethod
    def from_row(cls, row):
        return cls(
            id=row["id"],
            jugador=row["jugador"],
            pais=row["pais"],
            nro_figurita=row["nro_figurita"],
        )

    @classmethod
    def get_all(cls):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM figuritas ORDER BY nro_figurita")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls.from_row(r) for r in rows]

    @classmethod
    def get_by_id(cls, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM figuritas WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls.from_row(row) if row else None

    @classmethod
    def search(cls, query):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        like = f"%{query}%"
        cursor.execute(
            "SELECT * FROM figuritas "
            "WHERE jugador LIKE %s OR pais LIKE %s OR nro_figurita LIKE %s "
            "ORDER BY nro_figurita",
            (like, like, like),
        )
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls.from_row(r) for r in rows]
