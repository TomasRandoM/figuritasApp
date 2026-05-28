class Usuario:
    def __init__(self, id, apellido, nombre, fecha_nacimiento, mail, direccion, latitud=None, longitud=None, maps_link=None, password=None):
        self.id = id
        self.apellido = apellido
        self.nombre = nombre
        self.fecha_nacimiento = fecha_nacimiento
        self.mail = mail
        self.direccion = direccion
        self.latitud = latitud
        self.longitud = longitud
        self.maps_link = maps_link
        self.password = password
