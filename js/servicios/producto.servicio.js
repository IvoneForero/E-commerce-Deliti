const url = "https://my-json-server.typicode.com/ivoneforero/E-commerce-Delliti/productos";

const productos = () => 
    fetch(`${url}`).then((respuesta) => respuesta.json());

const crearProducto = (nombre, descripcion, categoria, precio, imagen) => {
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({id: uuid.v4(), nombre, descripcion, categoria, precio, imagen})
    });
};

const eliminarProducto = (id) => {
    return fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
};

const obtenerProducto = (id) =>
    fetch(`${url}/${id}`).then((respuesta) => respuesta.json());

const editarProducto = (id, nombre, descripcion, categoria, precio, imagen) => {
    return fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({nombre, descripcion, categoria, precio, imagen})
    });
};


export const ProductosServicio = {
    productos,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    editarProducto
};