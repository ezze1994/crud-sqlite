const productoRepository = require("../repositories/producto.repository");
const { validateProducto } = require("../validators/producto.validator");
const AppError = require("../errors/AppError");

class ProductoService {
  async getAll() {
    return await productoRepository.getAll();
  }

  async getById(id) {
    const producto = await productoRepository.getById(id);

    if (!producto) {
      throw new AppError("Producto no encontrado", 404);
    }

    return producto;
  }

  async create(data) {
    const cleanData = {
      nombre: data.nombre?.trim(),
      precio: data.precio,
    };

    const errors = validateProducto(cleanData);

    if (errors.length > 0) {
      throw new AppError("Error de validación", 400, errors);
    }

    return await productoRepository.create({
      nombre: cleanData.nombre,
      precio: Number(cleanData.precio),
    });
  }

  async update(id, data) {
    const cleanData = {
      nombre: data.nombre?.trim(),
      precio: data.precio,
    };

    const errors = validateProducto(cleanData);

    if (errors.length > 0) {
      throw new AppError("Error de validación", 400, errors);
    }

    const result = await productoRepository.update(id, {
      nombre: cleanData.nombre,
      precio: Number(cleanData.precio),
    });

    if (result.changes === 0) {
      throw new AppError("Producto no encontrado", 404);
    }

    return result.producto;
  }

  async delete(id) {
    const result = await productoRepository.delete(id);

    if (result.changes === 0) {
      throw new AppError("Producto no encontrado", 404);
    }

    return true;
  }
}

module.exports = new ProductoService();