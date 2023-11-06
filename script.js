const carrito = []; // Array para almacenar los productos en el carrito

function agregarAlCarrito(productoId, nombre, precio) {
    // Obtener la cantidad seleccionada para este producto
    const cantidadInput = document.getElementById(`cantidadProducto${productoId}`);
    const cantidad = parseInt(cantidadInput.value);

    // Busca el producto en el carrito
    const productoEnCarrito = carrito.find((producto) => producto.id === productoId);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        productoEnCarrito.cantidad += cantidad;
    } else {
        // Si el producto no está en el carrito, agregarlo
        const producto = {
            id: productoId,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
        };
        carrito.push(producto);
    }

    // Mostrar el formulario de datos de entrega
    const datosEntregaForm = document.getElementById('datos-entrega-form');
    datosEntregaForm.style.display = 'block';
    document.getElementById('realizar-pedido-btn').style.display = 'block';

    // Actualizar la vista del carrito
    actualizarCarrito();
}

function eliminarDelCarrito(productoId) {
    // Busca el producto en el carrito
    const index = carrito.findIndex((producto) => producto.id === productoId);

    if (index !== -1) {
        carrito.splice(index, 1);
    }

    // Actualizar la vista del carrito
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoElement = document.getElementById('carrito-list');

    // Limpia el contenido existente en el carrito antes de actualizar
    carritoElement.innerHTML = '';

    if (carrito.length === 0) {
        carritoElement.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carritoElement.innerHTML = '<h4>Productos agregados</h4><ul>';
        let totalCosto = 0;

        carrito.forEach((producto) => {
            const costoProducto = producto.precio * producto.cantidad;
            totalCosto += costoProducto;
            carritoElement.innerHTML += `
                <li style="margin-bottom: 20px">${producto.nombre} x${producto.cantidad} - Costo: $${costoProducto}
                <button class="btn btn-danger" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button></li>
            `;
        });

        carritoElement.innerHTML += `<li><strong>Total: $${totalCosto}</strong></li>`;
        carritoElement.innerHTML += '</ul>';
    }
}

function realizarPedido() {
    // Obtén los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;

    // Validar que se ingresen datos de entrega
    if (!nombre || !telefono || !direccion) {
        alert('Por favor, ingresa todos los datos de entrega.');
        return;
    }

    // Calcular el total del pedido
    let totalCosto = 0;

    carrito.forEach((producto) => {
        const costoProducto = producto.precio * producto.cantidad;
        totalCosto += costoProducto;
    });

    // Mostrar la modal con el resumen del pedido
    const modalContent = `
        <h3>Resumen del Pedido</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección de Entrega:</strong> ${direccion}</p>
        <p><strong>Productos en el Carrito:</strong></p>
        <ul>
            ${carrito.map((producto) => `<li>${producto.nombre} x${producto.cantidad}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> $${totalCosto}</p>
        <p><strong>Número de Guía:</strong> ${generarNumeroGuia()}</p>
        <p><strong>Fecha Estimada de Entrega:</strong> ${calcularFechaEstimada()}</p>
    `;

    // Actualiza el contenido del modal
    document.getElementById('modal-body').innerHTML = modalContent;

    // Abre la modal
    $('#resumenPedidoModal').modal('show');
}

function generarNumeroGuia() {
    // Implementa la lógica para generar un número de guía único aquí
    return 'GUÍA123456';
}

function calcularFechaEstimada() {
    // Implementa la lógica para calcular la fecha estimada de entrega aquí
    const fechaHoy = new Date();
    const diasEstimados = 3; // Ejemplo: entrega en 3 días
    fechaHoy.setDate(fechaHoy.getDate() + diasEstimados);
    return fechaHoy.toDateString();
}
