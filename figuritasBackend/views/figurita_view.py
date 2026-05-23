def serialize(figurita):
    return {
        "id": figurita.id,
        "jugador": figurita.jugador,
        "pais": figurita.pais,
        "nroFigurita": figurita.nro_figurita,
        "imagenUrl": figurita.imagen_url,
    }


def serialize_list(figuritas):
    return [serialize(f) for f in figuritas]
