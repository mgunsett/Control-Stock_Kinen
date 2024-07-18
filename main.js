//Funcion fecha actual --
let fechaActual = () => {
  let hoy = new Date();
  return hoy.toLocaleDateString();
};

// API Dolar

// const criptoYa = "https://criptoya.com/api/dolar";

// let divDolar = document.querySelector("#divDolar");

// fetch(criptoYa)
//   .then((response) => response.json())
//   .then(({ blue, ccl, mep, oficial }) => {
//     Toastify({
//       text: `Ten en cuenta!
//       Usd$ Oficial: ${oficial.price}
//       Usd$ MEP: ${mep.gd30.ci.price}
//       Usd$ CCL: ${ccl.gd30.ci.price}
//       Usd$ Blue: ${blue.ask}`,
//       duration: 3000,
//       gravity: "top",
//       position: "right",
//       backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//       stopOnFocus: true,
//     }).showToast();
//     console.log(blue, ccl, mep, oficial);
//   })
//   .catch((error) => console.error(error));

// fetch(criptoYa)
// .then((response) => response.json())
// .then(({ blue, ccl, mep, oficial }) => {
//   divDolar.innerHTML = `
//           <h3>Ten en cuenta!</h3>
//           <p>Usd$ Oficial: ${oficial.price} </p>
//           <p>Usd$ MEP: ${mep.gd30.ci.price} </p>
//           <p>Usd$ CCL: ${ccl.gd30.ci.price} </p>
//           <p>Usd$ Blue: ${blue.ask} </p>
//         `;
// })
// .catch((error) => console.error(error));

//Funcion PRODUCTOS --
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre.toUpperCase();
    this.precio = precio;
    this.stock = stock;
  }
  actualizarStock(cantidad) {
    this.stock = ++cantidad;
  }
  toString = () =>
    `${this.nombre} - Precio: $${this.precio} - Stock: ${this.stock}`;
}
// Convertir PRODUCTOS para HTML --
let convertirAProducto = (obj) => {
  return new Producto(obj.nombre, obj.precio, obj.stock);
};

//Llamado del DOM --
let formulario = document.querySelector("form");
let inicio = document.querySelector(".titulo");
let iconos = document.querySelector("#icons");
let mainContent = document.querySelector("#mainContent");
let content = document.querySelector("#content");
let loginError = document.querySelector("#loginError");
let consultaStock = document.querySelector("#consultaStock");
let agregarStock = document.querySelector("#agregarStock");
let quitarStock = document.querySelector("#quitarStock");
let salirStock = document.querySelector("#salirStock");
let content2 = document.querySelector("#content2");
let button = document.querySelector("#botonVolver");
let content_rest = document.querySelector(".content_rest");

//Carga de Usuarios a LocalStorage --

let usuariosCargados = [
  { username: "sucursal1", password: "kinen1" },
  { username: "sucursal2", password: "kinen2" },
  { username: "sucursal3", password: "kinen3" },
];
let usuariosValidos = JSON.stringify(usuariosCargados);
localStorage.setItem("usuarios", usuariosValidos);

//Validacion de Usuario & Pass --

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let usuario = formulario[0].value.toLowerCase();
  let pass = formulario[1].value;
  let usuarios = JSON.parse(usuariosValidos);

  let usuarioValido = usuarios.find(
    (user) => user.username === usuario && user.password === pass
  );

  if (usuarioValido) {
    inicio.style.display = "none";
    mainContent.style.display = "flex";
    iconos.style.display = "none";
    Swal.fire({
      title: `Bienvenido  ${usuario} !`,
      icon: "success",
    });
    localStorage.setItem("logueado", JSON.stringify(usuarioValido)); //Guardamos Logueo
  } else {
    loginError.textContent = "Usuario Desconocido, intente nuevamente";
    loginError.style.display = "block";
    formulario.reset();
  }
});

//Stock ---

let stockNuevo = JSON.parse(localStorage.getItem("stockNuevo")) || [];
stockNuevo = stockNuevo.map(convertirAProducto);

// Funcion actualizar y mostrar stock
function actualizarTablaStock(templateClass) {
  let template = document.querySelector(templateClass).content.cloneNode(true);
  let tbody = template.querySelector("tbody");

  // Limpiar el cuerpo de la tabla
  tbody.innerHTML = "";

  stockNuevo.forEach((producto, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${index + 1}</th> 
      <td>${producto.nombre}</td>
      <td>${producto.stock}</td>
      <td>$${producto.precio}</td>
      <td><button class="btn btn-danger btn-sm eliminarProducto" data-index="${index}">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
  return template;
}

consultaStock.addEventListener("click", () => {
  if (stockNuevo.length === 0) {
    Swal.fire({
      title: `Stock actual en fecha ${fechaActual()}: 0 `,
      icon: "info",
    });
  } else {
    content2.style.display = "flex";
    let template = actualizarTablaStock(".temp_stock");
    content2.textContent = "";
    content2.innerHTML = `
        <h3>Stock General</h3>
        <button id="closeContent2" class="btn btn-danger"><i class="bi bi-x-lg"></i></button>`;
    content2.appendChild(template);

    // Cerrar ventana de stock
    let closeContent2 = document.querySelector("#closeContent2");
    closeContent2.addEventListener("click", () => {
      content2.style.display = "none";
    });
  }
});

// Sumar stock --

agregarStock.addEventListener("click", () => {
  //Api Dolar------------------------------------------------------------
  const criptoYa = "https://criptoya.com/api/dolar";

  fetch(criptoYa)
    .then((response) => response.json())
    .then(({ blue, ccl, mep, oficial }) => {
      Toastify({
        text: `Ten en cuenta!
      Usd$ Oficial: ${oficial.price}
      Usd$ MEP: ${mep.gd30.ci.price}
      Usd$ CCL: ${ccl.gd30.ci.price}
      Usd$ Blue: ${blue.ask}`,
        duration: 5000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
      }).showToast();
      console.log(blue, ccl, mep, oficial);
    })
    .catch((error) => console.error(error));
  //--------------------------------------------------------------------
  content.style.display = "flex";
  mainContent.style.display = "none";
  let addProductForm = document.querySelector("#addProductForm");

  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombre = document.querySelector("#nombreP").value.toLowerCase();
    let precio = Number(document.querySelector("#precioP").value);
    let stock = Number(document.querySelector("#stockP").value);

    if (nombre && precio >= 0 && stock >= 0) {
      stockNuevo.push(new Producto(nombre, precio, stock));
      localStorage.setItem("stockNuevo", JSON.stringify(stockNuevo));
      Swal.fire({
        title: `Producto agregado con Éxito`,
        icon: "success",
      });
      actualizarTablaStock(".temp_stock");
      addProductForm.reset(); // Limpiar formulario
    } else {
      Swal.fire({
        title: `Ingrese valores Correctos`,
        icon: "error",
      });
    }
  });
  button.addEventListener("click", () => {
    content.style.display = "none";
    mainContent.style.display = "flex";
  });
});

// Restar Stock --

quitarStock.addEventListener("click", () => {
  content_rest.style.display = "flex";
  mainContent.style.display = "none";
  let template = actualizarTablaStock(".temp_rest");
  content_rest.textContent = "";
  content_rest.innerHTML = `
        <h3>Eliminar Productos</h3>
        <button id="closeContent2" class="btn btn-danger close_rest"><i class="bi bi-x-lg"></i></button>
        <p>Seleccione un producto para eliminar:</p>`;
  content_rest.appendChild(template);
  // Cerrar ventana
  let close_rest = document.querySelector(".close_rest");
  close_rest.addEventListener("click", () => {
    content_rest.style.display = "none";
    mainContent.style.display = "flex";
  });

  content_rest.querySelectorAll(".eliminarProducto").forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      // Alerta!
      Swal.fire({
        title: "Seguro desea eliminar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, ELIMINAR!",
      }).then((result) => {
        if (result.isConfirmed) {
          stockNuevo.splice(index, 1);
          localStorage.setItem("stockNuevo", JSON.stringify(stockNuevo));
          //Elimnacion de elemento en tabla
          let tr = e.target.closest("tr");
          tr.parentNode.removeChild(tr);
          //Cofirma Eliminacion
          Swal.fire({
            title: "Eliminado!",
            text: "Producto se ha eliminado!",
            icon: "success",
          });
          actualizarTablaStock(".temp_rest");
        }
      });
    });
  });
});

// Salir del Sistema --

salirStock.addEventListener("click", () => {
  mainContent.style.display = "none";
  inicio.style.display = "block";
  iconos.style.display = "flex";
});
