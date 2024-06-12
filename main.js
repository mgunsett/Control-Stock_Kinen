//! FUNCIONES //

// Función para obtener la fecha actual
const fechaActual = () => {
  const hoy = new Date();
  return hoy.toLocaleDateString();
};
// Función de ingreso numérico correcto
const ingresoValido = (valor) => {
  while (isNaN(valor) || valor < 0 || valor === "") {
    valor = Number(prompt("Ingrese valores correctos:"));
  }
  return valor;
};
// Función de ingreso correcto de usuario y password
// Usuario -- 'Matias'
// Contraseña -- '12345'
const usuarios = () => {
  let usuario = prompt("Ingrese nombre de Usuario:").toLowerCase();
  let password = Number(prompt("Ingrese contraseña:"));

  while (isNaN(password) || password < 0 || usuario === "") {
    alert("Ingrese valores correctos");
    usuario = prompt("Ingrese nombre de Usuario:").toLowerCase();
    password = Number(prompt("Ingrese contraseña:"));
  }

  if (usuario === "matias" && password === 12345) {
    return usuario;
  } else {
    alert("Usuario Desconocido, intente nuevamente");
    return null;
  }
};
// Función para consulta de productos
const sectores = () => {
  let opciones = Number(
    prompt(
      "Qué sector de Productos desea consultar? :\n" +
        "1 -Movilidad y Postura\n" +
        "2 -Ortesis y Protesis\n" +
        "3 -Productos Ortopedia\n" +
        "4 -Salir."
    )
  );

  while (isNaN(opciones) || opciones < 1 || opciones > 4) {
    alert("Los valores ingresados son INCORRECTOS, intente nuevamente");
    opciones = Number(
      prompt(
        "Qué sector de Productos desea consultar? :\n" +
          "1 -Movilidad y Postura\n" +
          "2 -Ortesis y Protesis\n" +
          "3 -Productos Ortopedia\n" +
          "4 -Salir."
      )
    );
  }
  return opciones;
};
// Función para eliminar mercadería
const eliminarMercaderia = (mercaderia) => {
  while (true) {
    alert(
      "Mercadería en Stock: \n" +
        mercaderia.map((m) => `${m.nombre} (${m.stock} en stock)`).join("\n")
    );

    if (!confirm("¿Desea eliminar mercadería?")) {
      break;
    }
    let borrar = Number(prompt("¿Cuántos elementos desea eliminar?"));
    if (isNaN(borrar) || borrar <= 0) {
      alert("Por favor, ingrese un número válido de elementos a eliminar");
      continue;
    }
    let desde_donde = Number(
      prompt(
        "Coloque 0 si desea eliminar desde el principio o el índice desde donde eliminar:"
      )
    );
    if (
      isNaN(desde_donde) ||
      desde_donde < 0 ||
      desde_donde >= mercaderia.length
    ) {
      alert("Por favor, ingrese un índice válido");
      continue;
    }

    const eliminados = mercaderia.splice(desde_donde, borrar);
    if (eliminados.length === 0) {
      alert(
        "No se eliminó ningún elemento. Por favor, verifique los valores ingresados"
      );
    } else {
      alert(
        "Mercadería eliminada:\n" + eliminados.map((m) => m.nombre).join("\n")
      );
    }
    alert(
      "Mercadería actualizada en stock:\n" +
        mercaderia.map((m) => `${m.nombre} (${m.stock} en stock)`).join("\n")
    );
  }
};

// Clase para ingreso de productos
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  actualizarStock(cantidad) {
    this.stock += cantidad;
  }

  toString() {
    return `${this.nombre}
    - Precio: $${this.precio} 
    - Stock:  ${this.stock}`;
  }
}

//! Inicio del Sistema
const main = () => {
  let stock_nuevo = []; // array de Productos a cargar

  let saludo = confirm("Bienvenido a Ortopedia Kinen! Ingresamos?");
  let usuario;

  while (saludo) {
    usuario = usuarios();
    if (usuario) {
      alert(`Bienvenido:  ${usuario}  al sistema de stock KINEN`);
      break;
    } else {
      saludo = confirm("¿Desea intentar nuevamente?");
      if (!saludo) {
        alert("Hasta pronto!");
        return;
      }
    }
  }

  while (true) {
    let opcion = Number(
      prompt(
        `Usuario: ${usuario} - Fecha: ${fechaActual()} \nSeleccione una opción: \n1- Consultar Stock \n2- Cargar Productos \n3- Eliminar Productos \n4- Salir`
      )
    );
    opcion = ingresoValido(opcion);

    if (opcion === 1) {
      alert(
        "Stock actual en fecha " +
          fechaActual() +
          " :\n" +
          stock_nuevo.map((producto) => producto.toString()).join("\n")
      );
    } else if (opcion === 2) {
      let nombre = prompt("Ingrese nombre del producto:").toLowerCase();
      let precio = ingresoValido(Number(prompt("Ingrese precio:")));
      let stock = ingresoValido(Number(prompt("Ingrese cantidad en stock:")));

      stock_nuevo.push(new Producto(nombre, precio, stock));
    } else if (opcion === 3) {
      eliminarMercaderia(stock_nuevo);
    } else if (opcion === 4) {
      if (confirm("Desea salir del sistema?")) {
        break;
      }
    } else {
      alert("Opción no válida, intente nuevamente");
    }
  }
};

// Ejecutar la función principal
main();

//! Mostrar Productos de menor a mayor en $$ :
// productos.sort((a, b) => a.precio - b.precio); // Corregir función de comparación // de + a - en precios

// console.log(productos);

//!recorrer un array:
// let numeros = [5, 4, 3, 2, 1];

// let dobles = [];

// numeros.forEach((elm) => {
// Asi recorremos el array al igual q con el 'for' //
//   dobles.push(elm * 2);
// });

//! otro recorrido de array:
// if (productos.map((elm) => elm.precio > 5000)) {
//   alert("Tiene un descuento del -10%");
// } else {
//   alert("No llega al tope min para descuentos,lo siento");
// }
