import { apiGet, apiPost } from '../services/api';
import PublicacionFigurita from '../models/PublicacionFigurita';

export default class PublicacionController {
  static async getAll() {
    const data = await apiGet('/publicaciones/');
    return data.map((p) => new PublicacionFigurita(p));
  }

  static async search(query) {
    const data = await apiGet(`/publicaciones/?q=${encodeURIComponent(query)}`);
    return data.map((p) => new PublicacionFigurita(p));
  }

  static async getByUsuario(usuarioId) {
    const data = await apiGet(`/publicaciones/?usuario_id=${usuarioId}`);
    return data.map((p) => new PublicacionFigurita(p));
  }

  static async create({ figuritaId, usuarioId, cantidad }) {
    const data = await apiPost('/publicaciones/', { figuritaId, usuarioId, cantidad });
    return new PublicacionFigurita(data);
  }
}
