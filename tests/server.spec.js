const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // 1. Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
    // es un arreglo con por lo menos 1 objeto.
    it("code 200 GET/cafes", async () => {
        const respuesta = await request(server).get("/cafes").send();
        expect(respuesta.statusCode).toBe(200);
    });
    // 2. Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que
    // no existe.
    it("code 404 Id no existe", async () => {
        const respuesta = await request(server).delete(`/cafes/5`).set('Authorization', 'token').send();
        expect(respuesta.statusCode).toBe(404);
    });
    //  3. Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    it("code 201 agregar cafe", async () => {
        const nombre = "Té Chai"
        const { statusCode: status} = await request(server).post("/cafes").send({id : 5, nombre})
        console.log(status)
        expect(status).toBe(201);
    });
    // Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
    // café enviando un id en los parámetros que sea diferente al id dentro del payload.
    it("code 400 Modificar cafe", async () => {
        const nombre = "Capuchino Vainilla"
        const respuesta = await request(server).put(`/cafes/2`).send({id : 5, nombre})
        expect(respuesta.statusCode).toBe(400);
    })
});
