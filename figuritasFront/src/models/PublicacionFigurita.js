import Figurita from './Figurita';
import Usuario from './Usuario';

export default class PublicacionFigurita {
  constructor({ id, figurita, usuario, cantidad }) {
    this.id = id;
    this.cantidad = cantidad;
    this.figurita = figurita instanceof Figurita ? figurita : new Figurita(figurita);
    this.usuario = usuario instanceof Usuario ? usuario : new Usuario(usuario);
  }
}
