export default class Usuario {
  constructor({ id, apellido, nombre, fechaNacimiento, mail, direccion, latitud, longitud, maps_link }) {
    this.id = id;
    this.apellido = apellido;
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.mail = mail;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.maps_link = maps_link;
  }

  get nombreCompleto() {
    return `${this.apellido} ${this.nombre}`;
  }

  get edad() {
    if (!this.fechaNacimiento) return null;
    const nacido = new Date(this.fechaNacimiento);
    if (isNaN(nacido.getTime())) return null;
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacido.getFullYear();
    const m = hoy.getMonth() - nacido.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacido.getDate())) edad--;
    return edad;
  }
}
