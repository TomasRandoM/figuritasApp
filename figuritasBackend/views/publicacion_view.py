from views.figurita_view import serialize as serialize_figurita
from views.usuario_view import serialize as serialize_usuario


def serialize(pub):
    return {
        "id": pub.id,
        "cantidad": pub.cantidad,
        "figurita": serialize_figurita(pub.figurita),
        "usuario": serialize_usuario(pub.usuario),
    }

def serialize_deleteAnswer(pub):
    return {
        "success": True,
    }

def serialize_list(pubs):
    return [serialize(p) for p in pubs]
