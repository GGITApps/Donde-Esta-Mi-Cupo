/*VARIABLES*/ 
var opcHorario = 1;
const MAX_OPC = 5;
const HTML_MATERIA = '<td><input type="text" name="materia" placeholder="Ingresa el nombre" class="materia"></td><td><input type="text" name="código" placeholder="Ingresa el código" class="codigo"></td><td><input type="number" name="NRC" placeholder="Ingresa el NRC" class="nrc"></td>';
var html_horario = (num) =>{
  return `<div class="card margin-top animated fadeInRight"> 
    <h4>Horario `+num+`</h4>
    <table class="opc-horario">
      <thead>
        <th>Materia</th>
        <th>Código</th>
        <th>NRC</th>
      </thead>
      <tbody id="tb`+num+`">
        <tr>
          <td><input type="text" name="materia" placeholder="Ingresa el nombre" class="materia"></td>
          <td><input type="text" name="código" placeholder="Ingresa el código" class="codigo"></td>
          <td><input type="number" name="NRC" placeholder="Ingresa el NRC" class="nrc"></td>
        </tr>
      </tbody>
    </table>
    <div class="align-but">
      <button type="button" name="Añadir materia" class="add-m" value="tb`+num+`"><i class="fas fa-plus"></i>Añadir Materia</button>
      <button type="button" name="Quitar última" class="remove-m" value="tb`+num+`"><i class="fas fa-eraser"></i>Quitar Materia</button>
    </div>
  </div>`};

/*OBJETOS*/
function Materia(nombre, prefijo, nrc)
{
  this.nombre = nombre;
  this.prefijo = prefijo;
  this.nrc = nrc;
}
function Horario(materias)
{
  this.cantidadMaterias = materias.length;
  this.materias = materias;
}
function Horarios(horarios)
{
  this.cantidadHorarios = horarios.length;
  this.horarios = horarios;
}

/*
Función que cambia la animación de las tarjetas SOLAMENTE
*/
function changeAnimationCards(cards)
{
  cards.forEach((card)=>{
    card.classList.remove("fadeInRight");
    card.classList.remove("animated");

    card.classList.add("fadeOutLeft");
    card.classList.add("animated");
  });
  console.log("ANIMATION CHANGES");
}

/*
Función que cambia la animación de los botones SOLAMENTE
si es true aparece, si es false desaparece.
*/
function changeAnimationButtons(buttons, appears)
{
  buttons.forEach((but)=>{
    if(appears)
    {
      but.classList.remove("display-none");
  
      but.classList.add("zoomIn");
      but.classList.add("animated");
    }
    else
    {
      but.classList.remove("zoomIn");
      but.classList.remove("animated");
  
      but.classList.add("zoomOut");
      but.classList.add("animated");
      setTimeout(()=>{
        but.classList.add("display-none");
      }, 800);
    }

  });
  console.log("BUTTON ANIMATION CHANGES");
}

/*
función que añade o quita una materia al horario respectivo.
*/
function accionMateria(tbHorario, add)
{
  let buscado = document.getElementById(tbHorario);
  if(add)
  {
    let new_tr = document.createElement("tr");
    new_tr.innerHTML = HTML_MATERIA;
    buscado.appendChild(new_tr);
  }
  else
  {
    if(buscado.childElementCount > 1)
    {
      buscado.removeChild(buscado.lastChild);
    }
  }
}

/*
función que añade o quita un horario al horario respectivo.
*/
function accionHorario(add)
{
  let buscado = document.querySelector(".content");
  if(!(opcHorario >= MAX_OPC) && add)
  {
    opcHorario++;
    let new_card = document.createElement("div");
    new_card.innerHTML = html_horario(opcHorario.toString());
    buscado.appendChild(new_card);
  }
  else if(!add)
  {
    if(!(buscado.lastChild.classList.contains("default")) && buscado.childElementCount > 2)
    {
      let arr = [buscado.lastChild];
      changeAnimationCards(arr);
      setTimeout(()=>{
        buscado.removeChild(buscado.lastChild);
      }, 700);
      opcHorario--;
    }
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("start")) 
  {
    let cards = document.querySelectorAll(".card");
    changeAnimationCards(cards);

    setTimeout(()=>{
        location.href = "redirect/plans.html";
        console.log("LOCATION CHANGES");
    }, 700);
  }
  else if(e.target.classList.contains("search"))
  {
    let cards = document.querySelectorAll(".card");
    changeAnimationCards(cards);

    setTimeout(()=>{
        location.href = "redirect/search.html";
        console.log("LOCATION CHANGES");
    }, 700);

  }
  else if(e.target.classList.contains("last"))
  {
    //FALTA LOGICA
  }
  else if(e.target.classList.contains("search-action"))
  {
    //FALTA LOGICA
  }
  else if(e.target.classList.contains("back"))
  {
    let loc = location.href;
    if(loc.includes("plans"))
    {
      let cards = document.querySelectorAll(".card");
      let butts = document.querySelectorAll("button.animated");
      changeAnimationCards(cards);
      changeAnimationButtons(butts, false);

      setTimeout(()=>{
        location.href = "../popup.html";
        console.log("LOCATION BACK");
      }, 700);
    }
    else if(loc.includes("search"))
    {
      let cards = document.querySelectorAll(".card");
      let cards2 = document.querySelectorAll(".card-s");
      let butts = document.querySelectorAll("button.animated");
      changeAnimationCards(cards);
      changeAnimationCards(cards2);
      changeAnimationButtons(butts, false);

      setTimeout(()=>{
        location.href = "../popup.html";
        console.log("LOCATION BACK");
      }, 700);
    }
    else if(loc.includes("cupos"))
    {
      let cards = document.querySelectorAll(".card");
      let butts = document.querySelectorAll("button.animated");
      changeAnimationCards(cards);
      changeAnimationButtons(butts, false);

      setTimeout(()=>{
        location.href = "../popup.html";
        console.log("LOCATION BACK");
      }, 700);
    }
  }
  else if(e.target.classList.contains("accept"))
  {
    let butRef = document.querySelectorAll(".refresh");
    let active = document.querySelectorAll(".accept");
    let add_h = document.querySelectorAll(".add-h");
    let remove_h = document.querySelectorAll(".remove-h");

    changeAnimationButtons(active, false);
    changeAnimationButtons(add_h, false);
    changeAnimationButtons(remove_h, false);
    changeAnimationButtons(butRef, true);
    //TODO AQUI SE HACE LA PETICION AL SCRAPPER Y ESO
    // O LO QUE SEA QUE SE HAGA AQUI.
    //FALTA LOGICA

  }
  else if(e.target.classList.contains("add-h"))
  {
    accionHorario(true);
  }
  else if(e.target.classList.contains("remove-h"))
  {
    accionHorario(false);
  }
  else if(e.target.classList.contains("add-m"))
  {
    let cual = e.target.value;
    accionMateria(cual, true);
  }
  else if(e.target.classList.contains("remove-m"))
  {
    let cual = e.target.value;
    accionMateria(cual, false);
  }
});