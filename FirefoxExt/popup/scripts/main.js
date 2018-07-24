/*VARIABLES*/ 
var opcHorario = 1;
var arrHorarios = [];
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
      <tbody id="tb`+num+`" class="cuerpo">
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
  </div>`;};
var html_busqueda = (prefijo, nrc, cap, disp) => {
  let color = "";
  let porc = (parseInt(disp))/(parseInt(cap));
  if(porc == NaN || (cap == 0 && disp == 0))
    color = "rojo";
  else if(porc < 0.2)
    color = "rojo";
  else if(porc >= 0.2 && porc < 0.5)
    color = "amarillo";
  else if(porc >= 0.5)
    color = "verde";

  return `<table class="tabla-busqueda">
      <thead>
        <th>Carrera</th>
        <th>NRC</th>
        <th>Capacidad</th>
        <th>Disponible</th>
      </thead>
      <tbody>
        <tr>
          <td>`+prefijo+`</td>
          <td>`+nrc+`</td>
          <td>`+cap+`</td>
          <td><div class="general `+color+`">`+disp+`</div></td>
        </tr>
      </tbody>
    </table>`;
};

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
    var dir = browser.extension.getURL("../data/cupos.json");
    var msj = "";
    $.getJSON(dir, (json) => {
      $.each( json, function( key, val ) {
        msj += "(num: " + (key+1) + " val: " + Object.values(val)[0] + "), ";
      });
      
    });
    //FALTA LECTURA DEL JSON LOCAL
  }
  else if(e.target.classList.contains("search-action"))
  {
    var prefijo = document.getElementById("pr").value;
    var busqueda = document.getElementById("busqueda").value;
    var buscado = document.querySelector(".content");
    var carta = document.querySelector(".card.margin-top");
    if(carta != null)
    {
      changeAnimationCards([carta]);
      setTimeout(()=>{
        carta.parentNode.removeChild(carta);
      }, 700);
    }

    let temp = document.createElement("div");
    temp.className = "card margin-top bu animated fadeInRight";
    temp.innerText = "El resultado de la búsqueda aparecerá enseguida...";
    buscado.appendChild(temp);

    let dir = "https://donde-estan-mis-cupos-uniandes.herokuapp.com/?prefix="+prefijo+"&nrc="+busqueda;
    
    fetch(dir)
    .then( response => response.text())
    .then( (rta) => {
      let espera = document.querySelector(".card.margin-top.bu.animated.fadeInRight");
      changeAnimationCards([espera]);
      setTimeout(()=>{
        buscado.removeChild(espera);
      }, 700);
  
      if(rta == 'prefijo incorrecto')
      {
        let search = document.createElement("div");
        search.className = "card margin-top animated fadeInRight";
        search.innerHTML = "<p class='welcome'><strong>Error :(</strong> -> prefijo incorrecto</p>";
        buscado.appendChild(search);
      }
      else if(rta.includes('["'))
      {
        var bus = rta.split(",")[0].split('"')[1];
        var cant = rta.split(",")[1].split('"')[1];
        var disp = rta.split(",")[2].split('"')[1];
  
        let search = document.createElement("div");
        search.className = "card margin-top animated fadeInRight";
        search.innerHTML = html_busqueda(prefijo, bus, cant, disp);
        buscado.appendChild(search);
      }
      else
      {
        let search = document.createElement("div");
        search.className = "card margin-top animated fadeInRight";
        search.innerHTML = "<p class='welcome'><strong>Error :(</strong> -> Esto se recibió: "+rta+"</p>";
        buscado.appendChild(search);
      }
    })
    .catch(err => {
      let search = document.createElement("div");
      search.className = "card margin-top animated fadeInRight";
      search.innerHTML = "<p class='welcome'><strong>Error :(</strong> -> No se pudo realizar la petición: "+err.message+"</p>";
      buscado.appendChild(search);
    });

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
    
    let horarios = document.querySelectorAll(".cuerpo");
    for(let h of horarios)
    {
      let materias = h.children;
      let arrMaterias = [];
      for(let m of materias)
      {

        let campos = m.children;

        let nom = campos[0].firstChild.value;
        let pre = campos[1].firstChild.value.split("-")[0];
        let cod = campos[2].firstChild.value;
        var oMateria = {
          nombre: nom,
          prefijo: pre,
          codigo: cod
        };
        arrMaterias.push(oMateria);
      }
      var oHorario = {
        materias: arrMaterias
      };
      arrHorarios.push(oHorario);
    }

    //TODO AQUI SE HACE LA PETICION AL SCRAPPER Y ESO
    // O LO QUE SEA QUE SE HAGA AQUI.

    for(let ho of arrHorarios)
    {
      let numHorario = 1;
      let tabla = document.createElement();
      for(let ma of ho.materias)
      {
        let dir = "https://donde-estan-mis-cupos-uniandes.herokuapp.com/?prefix="+ma.prefijo+"&nrc="+ma.codigo;
        fetch(dir)
        .then(response => response.text())
        .then( rta =>{
          
        })
        .catch( err =>{

        });
      }



      numHorario++;

    }
    
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