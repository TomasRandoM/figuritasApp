import { apiGet, apiPost } from '../services/api';
import Usuario from '../models/Usuario';

export default class UsuarioController {
  static async getAll() {
    const data = await apiGet('/usuarios/');
    return data.map((u) => new Usuario(u));
  }

  static async getById(id) {
    const data = await apiGet(`/usuarios/${id}`);
    return new Usuario(data);
  }

  static async create(payload) {
    const data = await apiPost('/usuarios/', payload);
    return new Usuario(data);
  }
}
