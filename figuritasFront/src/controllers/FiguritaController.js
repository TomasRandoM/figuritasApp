import { apiGet } from '../services/api';
import Figurita from '../models/Figurita';

export default class FiguritaController {
  static async getAll() {
    const data = await apiGet('/figuritas/');
    return data.map((f) => new Figurita(f));
  }

  static async search(query) {
    const data = await apiGet(`/figuritas/?q=${encodeURIComponent(query)}`);
    return data.map((f) => new Figurita(f));
  }

  static async getById(id) {
    const data = await apiGet(`/figuritas/${id}`);
    return new Figurita(data);
  }
}
