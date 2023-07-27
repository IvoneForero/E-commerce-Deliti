import { ProductosServicio } from "./../servicios/producto.servicio.js";


async function cargarDatos() {
    const productos_cupcakes = document.querySelector('[data-categoria="Cupcakes"]');
    const productos_paletas = document.querySelector('[data-categoria="Paletas"]');
    const productos_combos = document.querySelector('[data-categoria="Combo-Box"]');

    const productos = await ProductosServicio.productos();
    let conteoCup = 0
    let conteoPal = 0
    let conteoBox = 0

    productos.forEach(elemento => {
        const producto = document.createElement("div");
        producto.classList.add("producto");

        const producto_contenido = `
            <a href="./htmls/producto.html?id=${elemento.id}" class="producto__sinlink" role="link">
                <img src="${elemento.imagen}" alt="Producto 1" class="producto__imagen">
            </a>
            <p class="producto__nombre">
                <a href="./htmls/producto.html?id=${elemento.id}" class="producto__sinlink" role="link">${elemento.nombre}</a>
            </p>
            <p class="producto__precio">${elemento.precio}</p>
            <a href="./htmls/producto.html?id=${elemento.id}" class="producto__link" role="link">Ver producto</a>
        `;
        producto.innerHTML = producto_contenido;
         
        if (elemento.categoria.toLowerCase().includes('cupcakes')) {
            conteoCup++;
            if  (conteoCup <= 5) {
                productos_cupcakes.insertBefore(producto, productos_cupcakes.children[0]);

            }
        }
        if (elemento.categoria.toLowerCase().includes('paletas')) {
            conteoPal++;
            if  (conteoPal <= 5) {
                productos_paletas.insertBefore(producto, productos_paletas.children[0]);
            }
        }
        if (elemento.categoria.toLowerCase().includes('combo-box')) {
            conteoBox++;
            if  (conteoBox <= 5) {
                productos_combos.insertBefore(producto, productos_combos.children[0]);
            }
        }
    });
}

cargarDatos();