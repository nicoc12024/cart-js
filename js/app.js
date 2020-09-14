const listaCursos = document.getElementById("lista-cursos");
const contenedorCursos = document.querySelector("#carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
let cursosCarrito = [];

allEventListeners();
function allEventListeners() {
  listaCursos.addEventListener("click", leerCurso);
  contenedorCursos.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", () => {
    cursosCarrito = JSON.parse(localStorage.getItem("carrito") || []);
    cursoCarritoAlDOM();
  });
}

// Leer curso/card para luego hacer el objeto
function leerCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    cursoAObjeto(cursoSeleccionado);
  }
}

// Crear objeto con el contenido del curso/card
function cursoAObjeto(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    nombre: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // actualizar la cantidad
  const existe = cursosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursoActualizado = cursosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    cursosCarrito = [...cursoActualizado];
  } else {
    cursosCarrito = [...cursosCarrito, infoCurso];
  }

  cursoCarritoAlDOM();
}

// Mostrar arreglo en el carrito de compras
function cursoCarritoAlDOM() {
  limpiarHTML();

  cursosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td> <img src="${curso.imagen}" width="100">  </td>
    <td>${curso.nombre}</td>
    <td>${curso.precio}</td>
    <td>${curso.cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X</a></td>
    `;
    contenedorCursos.appendChild(row);
  });

  agregarLocalStorage();
}

function agregarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(cursosCarrito));
}

function limpiarHTML() {
  contenedorCursos.innerHTML = "";
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    cursosCarrito = cursosCarrito.filter((curso) => curso.id !== cursoId);
    cursoCarritoAlDOM();
  }
}

function vaciarCarrito() {
  cursosCarrito = [];
  cursoCarritoAlDOM();
}
