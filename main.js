// Ingreso solo para EMPLEADOS //

//cantidad de empleados = 3

//Ingreso con Usuario y Contraseña
const usuario1 = "Matias";
const pass = 12345;

//Funcion ingreso Numérico correcto

function ingresoValido() {
  while (isNaN(ingresoValido()) && ingresoValido() < 0) {
    alert("Ingrese valores correctos");
  }
}

//Funcion de Ingreso correcto de usuario y password
function usuarios() {
  let usuario = prompt("Ingrese nombre de Usuario:").toLowerCase();
  let password = Number(prompt("Ingrese contraseña:"));
  //Bucle para ingreso correcto numérico de pass
  while (isNaN(password) || password < 0 || usuario == " ") {
    alert("Ingrese valores correctos");
    let usuario = prompt("Ingrese nombre de Usuario:").toLowerCase();
    let password = Number(prompt("Ingrese contraseña:"));

    if (usuario != "matias" || password != 12345) {
      alert("Usuario Desconocido,intente nuevamente");
      let usuario = prompt("Ingrese nombre de Usuario:").toLowerCase();
      let password = Number(prompt("Ingrese contraseña:"));
    } else if (usuario === "matias" && password === 12345) {
      break;
    } else {
      alert("Por favor debe ingresar algo");
    }
  }
  return usuario;
}
//Funcion para consulta de Productos
function productos() {
  let productoNumero = Number(
    prompt(
      "Qué sector de Productos desea consultar? :\n" +
        "1 -Movilidad y Postura\n" +
        "2 -Ortesis y Protesis\n" +
        "3 -Productos Ortopedia\n" +
        "4 -Salir."
    )
  );
  //Volvemos a crear un Bucle en para que el usuario ingrese valores correctos numéricos
  while (isNaN(productoNumero) || (productoNumero < 1 && productoNumero > 4)) {
    alert("Los valores ingresados son INCORRECTOS, intente nuevamente");
    let productoNumero = Number(
      prompt(
        "Qué sector de Productos desea consultar? :\n" +
          "1 -Movilidad y Postura\n" +
          "2 -Ortesis y Protesis\n" +
          "3 -Productos Ortopedia\n" +
          "4 -Salir."
      )
    );
  }
  return productoNumero;
}

//Ingreso al Sistema
let saludo = confirm("Bienvenido a Ortopedia Kinen! ingresamos?");

while (saludo) {
  let empleado = usuarios();
  if (usuarios) {
    alert("Bienvenido " + empleado + " al sistema de stock KINEN");
    break;
  } else {
    alert("Usuario Desconocido,intente nuevamente");
  }
}
//Seleccion de sector para stock
const sector = [
  "Movilidad y Postura",
  "Ortesis y Protesis",
  "Productos Ortopedia",
];
let stockTotal = 0;
while (true) {
  let seleccion = productos();
  switch (seleccion) {
    case 1:
      confirm("Estas accediendo a stock : " + sector[0]);
      break;
    case 2:
      confirm("Estas accediendo a stock : " + sector[1]);
      break;
    case 3:
      confirm("Estas accediendo a stock : " + sector[2]);
      break;
    case 4:
      confirm("Seguro desea salir del Sistema?");
      alert("Hasta Pronto!");
      break;
  }
  let stockTotal = 0;

  let stockInicial = Number(prompt("Indique stock Inicial"));
  if (stockInicial >= 0) {
    alert("Su stock es de : " + stockInicial + " undidades");
  } else {
    ingresoValido(stockInicial);
  }
  confirm("Desea realizar cambios en stock al Sector?");

  if (confirm) {
    let gestion = Number(prompt("Indique cantidad de gestiones a realizar:"));
    let selector = prompt("Desea SUMAR(+) o RESTAR(-) unidades al stock?");
    if (selector === "sumar" || selector === "+") {
      for (let i = 0; i < gestion; i++) {
        let suma = Number(prompt("Indique unidades a sumar"));
        stockTotal = (stockInicial + suma) * i;
        alert("Stock actualizado total: " + stockTotal + " unidades");
      }
      break;
    } else if (selector === "restar" || selector === "-") {
      for (let i = 0; i < gestion; i++) {
        let resta = Number(prompt("Indique unidades a descontar"));
        stockTotal = (stockInicial - resta) * i;
        alert("Stock actualizado total: " + stockTotal + " unidades");
      }
      break;
    } else {
      alert("Ingrese una de las 2 acciones por favor :");
    }
  }
}
alert("Tu trabajo ha sido realido con éxito! HASTA PRONTO !");
