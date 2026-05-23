from db import get_connection


class Usuario:
    def __init__(self, id, apellido, nombre, fecha_nacimiento, mail, direccion):
        self.id = id
        self.apellido = apellido
        self.nombre = nombre
        self.fecha_nacimiento = fecha_nacimiento
        self.mail = mail
        self.direccion = direccion

    @classmethod
    def from_row(cls, row):
        return cls(
            id=row["id"],
            apellido=row["apellido"],
            nombre=row["nombre"],
            fecha_nacimiento=row["fecha_nacimiento"],
            mail=row["mail"],
            direccion=row["direccion"],
        )

    @classmethod
    def get_all(cls):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios ORDER BY id")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return [cls.from_row(r) for r in rows]

    @classmethod
    def get_by_id(cls, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        return cls.from_row(row) if row else None

    @classmethod
    def create(cls, apellido, nombre, fecha_nacimiento, mail, direccion):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO usuarios (apellido, nombre, fecha_nacimiento, mail, direccion) "
            "VALUES (%s, %s, %s, %s, %s)",
            (apellido, nombre, fecha_nacimiento, mail, direccion),
        )
        new_id = cursor.lastrowid
        conn.commit()
        cursor.close()
        conn.close()
        return cls.get_by_id(new_id)
