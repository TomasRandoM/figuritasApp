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
        "latitud": float(usuario.latitud) if usuario.latitud is not None else None,
        "longitud": float(usuario.longitud) if usuario.longitud is not None else None,
        "mapsLink": usuario.maps_link,
    }


def serialize_list(usuarios):
    return [serialize(u) for u in usuarios]
