process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const { clearProductos, closeDb } = require("../config/testDb");

describe("API /productos", () => {
  beforeEach(async () => {
    await clearProductos();
  });

  afterAll(async () => {
    await closeDb();
  });

  test("debería crear un producto correctamente", async () => {
    const response = await request(app)
      .post("/productos")
      .send({
        nombre: "Teclado",
        precio: 1500,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Producto creado");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.nombre).toBe("Teclado");
    expect(response.body.data.precio).toBe(1500);
  });

  test("debería devolver error si faltan campos obligatorios", async () => {
    const response = await request(app)
      .post("/productos")
      .send({
        nombre: "",
        precio: null,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Error de validación");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  test("debería listar productos", async () => {
    await request(app).post("/productos").send({
      nombre: "Mouse",
      precio: 900,
    });

    const response = await request(app).get("/productos");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].nombre).toBe("Mouse");
  });

  test("debería devolver 404 si el producto no existe", async () => {
    const response = await request(app).get("/productos/9999");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Producto no encontrado");
  });

  test("debería eliminar un producto", async () => {
    const createResponse = await request(app)
      .post("/productos")
      .send({
        nombre: "Monitor",
        precio: 3000,
      });

    const id = createResponse.body.data.id;

    const deleteResponse = await request(app).delete(`/productos/${id}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
    expect(deleteResponse.body.message).toBe("Producto eliminado");

    const getResponse = await request(app).get(`/productos/${id}`);

    expect(getResponse.statusCode).toBe(404);
  });
});