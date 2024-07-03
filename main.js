//Funcion fecha actual --
let fechaActual = () => {
  let hoy = new Date();
  return hoy.toLocaleDateString();
};
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
//Llamado de elementos del HTML --
let formulario = document.querySelector("form");
let inicio = document.querySelector(".titulo");
let iconos = document.querySelector("#icons");
let mainContent = document.querySelector("#mainContent");
let content = document.querySelector("#content");
let mensaje = document.querySelector("#mensaje");
let loginError = document.querySelector("#loginError");
let consultaStock = document.querySelector("#consultaStock");
let agregarStock = document.querySelector("#agregarStock");
let quitarStock = document.querySelector("#quitarStock");
let salirStock = document.querySelector("#salirStock");
let content2 = document.querySelector("#content2");
let button = document.querySelector("#botonVolver");

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
  }
});

//Stock ---
let stockNuevo = JSON.parse(localStorage.getItem("stockNuevo")) || [];
stockNuevo = stockNuevo.map(convertirAProducto);

consultaStock.addEventListener("click", () => {
  if (stockNuevo.length === 0) {
    Swal.fire({
      title: `Stock actual en fecha ${fechaActual()}: 0 `,
      icon: "info",
    });
  } else {
    let ul = document.createElement("ul");
    stockNuevo.forEach((producto) => {
      let li = document.createElement("li");
      li.textContent = producto.toString();
      ul.appendChild(li);
    });
    content2.textContent = "";
    content2.innerHTML = `<h3>Stock General</h3>`;
    content2.appendChild(ul);
    content.style.display = "none";
    content2.style.display = "flex";
    setTimeout(() => {
      content2.style.display = "none";
    }, 5000);
  }
});

// Sumar stock --
agregarStock.addEventListener("click", () => {
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
      content2.innerHTML = " ";
      content2.innerHTML = `<h3>Stock General</h3>`;
      stockNuevo.forEach((producto) => {
        const productItem = document.createElement("li");
        productItem.textContent = producto.toString();
        content2.appendChild(productItem);
      });
      content2.style.display = "flex";
      setTimeout(() => {
        content2.style.display = "none";
      }, 5000);
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
  content.style.display = "flex";
  mainContent.style.display = "none";
  content.textContent = " ";
  content.innerHTML = `
            <h3>Eliminar Productos</h3>
            <p class='eliminarP'>Seleccione un producto para eliminar:</p>
            <ul id="productList" class="listaE"></ul>
            <button type="button" class="btn btn-success botonAgregar" id="botonVolver2">Volver</button>`;

  let productList = document.querySelector("#productList");
  let button2 = document.querySelector("#botonVolver2");
  function eliminarProducto(index, li) {
    stockNuevo.splice(index, 1);
    localStorage.setItem("stockNuevo", JSON.stringify(stockNuevo));
    productList.removeChild(li);
    showMessage("Producto eliminado con éxito", "info");
  }

  stockNuevo.forEach((producto, index) => {
    let li = document.createElement("li");
    li.textContent = producto.nombre;
    li.classList.add("listaE");
    li.addEventListener("click", () => {
      eliminarProducto(index, li);
    });
    productList.appendChild(li);
  });
  button2.addEventListener("click", () => {
    content.style.display = "none";
    mainContent.style.display = "flex";
  });
});

// Salir del Sistema --
salirStock.addEventListener("click", () => {
  mainContent.style.display = "none";
  inicio.style.display = "block";
  iconos.style.display = "flex";
  message.style.display = "none";
});

let showMessage = (msg, type) => {
  mensaje.textContent = msg;
  mensaje.className = type === "error" ? "error-message" : "info-message";
  mensaje.style.display = "block";
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
};

//! Profe trate de darle funcionalidad y valor al 'mensaje' pero no lo logre,
//! quise hace algo distito a las alertas previas pero no pude. Si me da una mano con eso se lo agradezco !
