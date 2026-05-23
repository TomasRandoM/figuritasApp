def serialize(usuario):
    return {
        "id": usuario.id,
        "apellido": usuario.apellido,
        "nombre": usuario.nombre,
        "fechaNacimiento": (
            usuario.fecha_nacimiento.isoformat()
            if hasattr(usuario.fecha_nacimiento, "isoformat")
            else usuario.fecha_nacimiento
        ),
        "mail": usuario.mail,
        "direccion": usuario.direccion,
    }


def serialize_list(usuarios):
    return [serialize(u) for u in usuarios]
