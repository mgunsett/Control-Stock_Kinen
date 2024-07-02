//Funcion fecha actual --
let fechaActual = () => {
  let hoy = new Date();
  return hoy.toLocaleDateString();
};
//Funcion PRODUCTOS --
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  actualizarStock(cantidad) {
    this.stock = ++cantidad;
  }
  toString() {
    return `${this.nombre} - Precio: $${this.precio} - Stock: ${this.stock}`;
  }
}

//Llamado de elementos del HTML --
let formulario = document.querySelector("form");
let inicio = document.querySelector(".titulo");
let iconos = document.querySelector("#icons");
let mainContento = document.querySelector("#mainContent");
let welcomeMessage = document.querySelector("#welcomeMessage");
let content = document.querySelector("#content");
let message = document.querySelector("#message");
let loginError = document.querySelector("#loginError");
let consultaStock = document.querySelector("#consultaStock");
let agregarStock = document.querySelector("#agregarStock");
let quitarStock = document.querySelector("#quitarStock");
let salirStock = document.querySelector("#salirStock");

let stockNuevo = JSON.parse(localStorage.getItem("stockNuevo")) || [];

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
    mainContento.style.display = "flex";
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
    content.appendChild(ul);
  }
  message.style.display = "none";
});

agregarStock.addEventListener("click", () => {
  content.style.display = "flex";
  mainContento.style.display = "none";
  let addProductForm = document.getElementById("addProductForm");
  addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombre = document.querySelector("#nombreP").value.toLowerCase();
    let precio = Number(document.querySelector("#precioP").value);
    let stock = Number(document.querySelector("#stockP").value);

    if (nombre && precio >= 0 && stock >= 0) {
      stockNuevo.push(new Producto(nombre, precio, stock));
      localStorage.setItem("stockNuevo", JSON.stringify(stockNuevo));
      showMessage("Producto agregado con éxito", "info");
      content.innerHTML = "";
    } else {
      showMessage("Por favor, ingrese valores válidos", "error");
    }
  });
});

quitarStock.addEventListener("click", () => {
  content.innerHTML = `
            <h3>Eliminar Productos</h3>
            <p>Seleccione un producto para eliminar:</p>
            <ul id="productList"></ul>
        `;
  let productList = document.getElementById("productList");
  stockNuevo.forEach((producto, index) => {
    let li = document.createElement("li");
    li.textContent = producto.nombre;
    li.addEventListener("click", () => {
      stockNuevo.splice(index, 1);
      localStorage.setItem("stockNuevo", JSON.stringify(stockNuevo));
      showMessage("Producto eliminado con éxito", "info");
      showRemoveProductFormBtn.click(); // Refrescar la lista
    });
    productList.appendChild(li);
  });
});

salirStock.addEventListener("click", () => {
  mainContent.style.display = "none";
  incio.style.display = "flex";
  message.style.display = "none";
});

let showMessage = (msg, type) => {
  message.textContent = msg;
  message.className = type === "error" ? "error-message" : "info-message";
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
};
