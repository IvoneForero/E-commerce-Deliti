import { ProductosServicio } from "./../servicios/producto.servicio.js";
const productos = document.querySelector(".productos");

async function obtenerProductos() {
    productos.innerHTML = "";
    try {
        const url = new URL(window.location);
        const q = url.searchParams.get("q");
        const tipo = url.searchParams.get("tp__producto");
        const url_q = q == null ? q : q.toLowerCase();
        const url_tipo = tipo == null ? tipo : tipo.toLowerCase();
        const tipo_titulo = document.querySelector('[data-tipo_titulo]');

        const obtener_productos = await ProductosServicio.productos();

        obtener_productos.forEach((elemento) => {
            const producto = document.createElement("div");
            producto.classList.add("producto");

            const producto_contenido = `
                <a href="./producto.html?id=${elemento.id}" class="producto__sinlink" role="link">
                    <img src="${elemento.imagen}" alt="Producto 1" class="producto__imagen">
                </a>
                <p class="producto__nombre">
                    <a href="./producto.html?id=${elemento.id}" class="producto__sinlink" role="link">${elemento.nombre}</a>
                </p>
                <p class="producto__precio">${elemento.precio}</p>
                <a href="./producto.html?id=${elemento.id}" class="producto__link" role="link">Ver producto</a>
            `;
            producto.innerHTML = producto_contenido;

            if (url_q == null && url_tipo == null) {
                productos.insertBefore(producto, productos.children[0]);
            } else if (elemento.nombre.toLowerCase().includes(url_q)) {
                productos.insertBefore(producto, productos.children[0]);
            } else if (elemento.categoria.toLowerCase().includes(url_tipo)) {
                productos.insertBefore(producto, productos.children[0]);
            }
        });
        if(productos.childElementCount == 0) {
            productos.innerHTML = `
                <p class="producto__inexistente">Upps! No tenemos ningún producto con el nombre: ${q}</p>
            `;
        }

        if(url_tipo != null)
            tipo_titulo.innerText = `${tipo_titulo.innerHTML} de ${url_tipo}`;
    } catch (error) {
        console.log("error");
    }
}

obtenerProductos();
