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

        const obtener_productos = await ProductosServicio.productos();

        obtener_productos.forEach((elemento) => {
            const producto = document.createElement("div");
            producto.classList.add("producto");

            const producto_contenido = `
                <a href="#" class="producto__sinlink" role="link">
                    <img src="${elemento.imagen}" alt="Producto 1" class="producto__imagen">
                </a>
                <p class="producto__nombre">
                    <a href="#" class="producto__sinlink" role="link">${elemento.nombre}</a>
                </p>
                <p class="producto__precio">${elemento.precio}</p>
                <div class="producto__botones" data-id="${elemento.id}">
                    <a href="./editar_producto.html?id=${elemento.id}" rol="link">
                        <i class="icono icono__editar productoEditar" ></i>
                    </a>
                    <i class="icono icono__eliminar productoEliminar"></i>
                </div>
            `;
            producto.innerHTML = producto_contenido;

            const boton_eliminar = producto.querySelector(".productoEliminar");
            boton_eliminar.addEventListener("click", eliminarProducto);

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
    } catch (error) {
        console.log("error");
    }
}

function eliminarProducto() {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "Desea eliminar el producto?",
        showConfirmButton: true,
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) {
            ProductosServicio.eliminarProducto(
                this.parentElement.dataset.id
            ).then((respuesta) => {
                if (respuesta.ok) {
                    obtenerProductos();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se ha eliminado correctamente",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
            });
        }
    });
}

obtenerProductos();
