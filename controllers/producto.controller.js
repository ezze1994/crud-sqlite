const productoService = require("../services/producto.service");
const { success } = require("../utils/response");

class ProductoController {
  async getAll(req, res) {
    const productos = await productoService.getAll();
    return success(res, productos, "Productos obtenidos");
  }

  async getById(req, res) {
    const producto = await productoService.getById(req.params.id);
    return success(res, producto, "Producto obtenido");
  }

  async create(req, res) {
    const nuevoProducto = await productoService.create(req.body);
    return success(res, nuevoProducto, "Producto creado", 201);
  }

  async update(req, res) {
    const productoActualizado = await productoService.update(req.params.id, req.body);
    return success(res, productoActualizado, "Producto actualizado");
  }

  async delete(req, res) {
    await productoService.delete(req.params.id);
    return success(res, null, "Producto eliminado");
  }
}

module.exports = new ProductoController();