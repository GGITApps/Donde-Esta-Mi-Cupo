/*VARIABLES*/ 
var opcHorario = 1;
var arrHorarios = [];
var tablas = [];
var fechaHorario;
const MAX_OPC = 5;
const HTML_MATERIA = '<td><input type="text" name="materia" placeholder="Ingresa el nombre" class="materia"></td><td><input type="text" name="código" placeholder="Ingresa el código" class="codigo"></td><td><input type="number" name="NRC" placeholder="Ingresa el NRC" class="nrc"></td>';
var html_horario = (num) =>{
  return `<h4>Horario `+num+`</h4>
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

var html_cupos = (num) =>{
  return `<h4>Horario `+num+`</h4>
  <table class="tabla-busqueda">
    <thead>
      <th>Nombre</th>
      <th>Carrera</th>
      <th>NRC</th>
      <th>Capacidad</th>
      <th>Disponible</th>
    </thead>
    <tbody id="tbc`+num+`" class="cuerpo"></tbody>
  </table>`;
};
var html_fila = (name, pre, nrc, cap, disp)=>{
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
  return `<td>`+name+`</td>
    <td>`+pre+`</td>
    <td>`+nrc+`</td>
    <td>`+cap+`</td>
    <td><div class="general `+color+`">`+disp+`</div></td>`;
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

/**
  *Función que cambia la animación de los botones SOLAMENTE
  *si es true aparece, si es false desaparece.
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
    new_card.className = "card margin-top animated fadeInRight";
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

/**
 * Función para verificar que todos los campos estén llenos.
 * True si todo está lleno, false de lo contrario.
 */
function allFilled()
{
  let campos = document.querySelectorAll("input");
  let isIt = true;
  for(let i = 0; i < campos.length; i++)
  {
    if(campos[i].value.trim() == "")
    {
      isIt = false;
      campos[i].classList.add("tada");
      campos[i].classList.add("animated");
      campos[i].classList.add("warning");
      setTimeout(()=>{
        campos[i].classList.remove("tada");
        campos[i].classList.remove("animated");
        campos[i].classList.remove("warning");
      }, 1000);
    }
  }
  return isIt;
}

/**
 * Función para guardar el arreglo con los horarios el la storage sync.
 */
function guardarHorarios()
{
  browser.storage.sync.set({
    horarios: arrHorarios,
    tablas: tablas
  })
  .then((item)=>{
    console.log("GUARDADO CON EXITO");
  },(error)=>{
    console.log("Error obteniendo horario: " + error.message);
  });
}

/**
 * Función para obtener los horarios previamente guardados.
 * retorna el objeto arreglo con los horarios.
 */
function obtenerHorarios()
{
  let retorno = [];
  let busqueda = browser.storage.sync.get(["horarios","tablas"]);
  busqueda.then((item)=>{
    retorno.push(item.horarios);
    retorno.push(item.tablas);
    console.log("OBTENIDO CON EXITO");
    console.log(item);
  },(error)=>{
    console.log("Error obteniendo horario: " + error.message);
  });
  return retorno;
}

/**
 * Función para hacer un delay sincrono y no petaquear a camilo :v
 */
function sleep(milliseconds) 
{
  var start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) 
  {
    if ((new Date().getTime() - start) > milliseconds)
    {
      break;
    }
  }
}

//COSAS DE LA WEB DE LA EJECUCIÓN EN GENERAL
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
    let horarios = obtenerHorarios();
    if(horarios != [])
    {
      arrHorarios = horarios[0];
      tablasLast = horarios[1];
      location.href = "redirect/last.html";

      let content = document.querySelector(".content");
      for(let i = 0; i < tablasLast.length; i++)
      {
        content.appendChild(tablasLast[i]);
      }
    }
    else
    {
      let last = document.querySelector(".last");
      last.classList.add("wobble");
      last.classList.add("animated");
      last.classList.add("warning");
      setTimeout(()=>{
        last.classList.remove("wobble");
        last.classList.remove("animated");
        last.classList.remove("warning");
      }, 1000);
    }
  }
  else if(e.target.classList.contains("search-action"))
  {
    if(allFilled())
    {
      var prefijo = document.getElementById("pr").value.trim();
      var busqueda = document.getElementById("busqueda").value.trim();
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

      let dir = "https://donde-estan-mis-cupos-uniandes.herokuapp.com/?prefix="+(prefijo.toUpperCase())+"&nrc="+busqueda;
      
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
          search.innerHTML = "<p class='welcome'><strong>Error :(</strong> -> prefijo o NRC incorrecto</p>";
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
    else if(loc.includes("last"))
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
    if(allFilled())
    {
      let active = document.querySelectorAll(".accept");
      let add_h = document.querySelectorAll(".add-h");
      let remove_h = document.querySelectorAll(".remove-h");
      let ref = document.querySelectorAll(".refresh");

      changeAnimationButtons(active, false);
      changeAnimationButtons(add_h, false);
      changeAnimationButtons(remove_h, false);
      
      let horarios = document.querySelectorAll(".cuerpo");
      for(let h of horarios)
      {
        let materias = h.children;
        let arrMaterias = [];
        for(let m of materias)
        {

          let campos = m.children;

          let nom = campos[0].firstChild.value;
          let pre = campos[1].firstChild.value;
          let cod = campos[2].firstChild.value;
          var oMateria = {
            nombre: nom,
            prefijo: pre,
            codigo: cod,
            capacidad: "",
            disponible: ""
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
      
      var espera = document.querySelectorAll(".card");
      changeAnimationCards(espera);

      setTimeout(() => {
        let content1 = document.querySelector(".content");
        
        for(let i = 0; i<espera.length; i++)
        { 
          content1.removeChild(espera[i]);
        }
        console.log("REMOVE CARTAS");

      }, 600);

      setTimeout(()=>{
        let content1 = document.querySelector(".content");
        let nueva = document.createElement("div");
        nueva.className = "card animated fadeInRight";
        nueva.innerHTML = `<h3>¡ Aquí Están !</h3>
        <p class="welcome"><b>ESPERA A QUE CARGUEN COMPLETAMENTE :O</b><br><br>Puedes refrescar la página para tener los cupos actualizados.</p>
        <p class="welcome"><strong>Recuerda...</strong><br>El botón de refrescar los cupos funciona cada minuto para no sobrecargar el servidor.</p>`;
        content1.insertBefore(nueva, content1.firstChild);
        /* content.appendChild(nueva); */
        console.log("NEW CARD ADDED");
      
        let numHorario = 1;
        for(let ho of arrHorarios)
        {
          let tabla = null;
          tabla = document.createElement("div");
          tabla.className = "card default margin-top animated fadeInRight";
          tabla.innerHTML = html_cupos(numHorario);
          for(let ma of ho.materias)
          {
            let dir = "https://donde-estan-mis-cupos-uniandes.herokuapp.com/?prefix="+((ma.prefijo.split("-")[0]).toUpperCase())+"&nrc="+(ma.codigo);
            console.log(dir);
            
            let buscado = null;
            buscado = tabla.children[1].querySelector("#tbc"+numHorario);

            fetch(dir)
            .then(response => response.text())
            .then( rta =>{
              if(rta == 'prefijo incorrecto')
              {
                let row = document.createElement("tr");
                row.innerHTML = "<td colspan='5'><p class='welcome'><strong>Error :(</strong> -> prefijo o NRC incorrecto de materia: "+ma.prefijo.toUpperCase()+" con NRC: "+ma.codigo+"</p></td>";
                buscado.appendChild(row);
              }
              else if(rta.includes('["'))
              {
                let bus = rta.split(",")[0].split('"')[1];
                let cant = rta.split(",")[1].split('"')[1];
                let disp = rta.split(",")[2].split('"')[1];
                
                let row = document.createElement("tr");
                row.innerHTML = html_fila(ma.nombre, ma.prefijo, bus, cant, disp);
                
                ma.capacidad = cant;
                ma.disponible = disp;
                buscado.appendChild(row);
              }
              else
              {
                let row = document.createElement("tr");
                row.innerHTML = "<td colspan='5' style='height:170px;'><p class='welcome'><strong>Error :(</strong> -> Esto se recibió: "+rta+"</p></td>";
                buscado.appendChild(row);
              }
            })
            .catch( err =>{
              let row = document.createElement("tr");
              row.innerHTML = "<td colspan='5'><p class='welcome'><strong>Error :(</strong> -> No se pudo realizar la petición: "+err.message+"</p></td>";
              buscado.appendChild(row);
            });
            sleep(800);
          } 
          /*content.appendChild(tabla);*/
          tablas.push(tabla);
          numHorario++;
        }

        setTimeout(()=>{
          let contentFin = document.querySelector(".content");
          for(let i = 0; i < tablas.length; i++)
          {
            console.log(tablas[i].innerHTML);
            contentFin.appendChild(tablas[i]);
          }
        }, 800);

        fechaHorario = new Date();

        setTimeout(()=>{
          let save = document.querySelector(".save");
          changeAnimationButtons(ref, true);
          changeAnimationButtons([save], true);
          setTimeout(()=>{
            ref[0].classList.remove("zoomIn");
            ref[0].classList.remove("animated");
            save[0].classList.remove("zoomIn");
            save[0].classList.remove("animated");
          }, 800);
        }, 4000);

      }, 1000);
    }
  }
  else if(e.target.classList.contains("refresh"))
  {
    let fechaActual = new Date();
    if((fechaActual.getTime() - fechaHorario.getTime()) >= (60000))
    {
      var espera = document.querySelectorAll(".card");
      changeAnimationCards(espera);

      setTimeout(() => {
        let content1 = document.querySelector(".content");
        
        for(let i = 0; i<espera.length; i++)
        { 
          content1.removeChild(espera[i]);
        }
        console.log("REMOVE CARTAS");

      }, 600);

      setTimeout(()=>{
        let content1 = document.querySelector(".content");
        let nueva = document.createElement("div");
        nueva.className = "card animated fadeInRight";
        nueva.innerHTML = `<h3>¡ Recién Actualizados !</h3>
          <p class="welcome"><b>ESPERA A QUE CARGUEN COMPLETAMENTE :O</b><br><br>Puedes refrescar la página para tener los cupos actualizados.</p>
          <p class="welcome"><strong>Recuerda...</strong><br>El botón de refrescar los cupos funciona cada minuto para no sobrecargar el servidor.</p>`;
        content1.insertBefore(nueva, content1.firstChild);
        /* content.appendChild(nueva); */
        console.log("NEW CARD ADDED");
      
        tablas = [];
        let numHorario = 1;
        for(let ho of arrHorarios)
        {
          let tabla = null;
          tabla = document.createElement("div");
          tabla.className = "card default margin-top animated fadeInRight";
          tabla.innerHTML = html_cupos(numHorario);
          for(let ma of ho.materias)
          {
            let dir = "https://donde-estan-mis-cupos-uniandes.herokuapp.com/?prefix="+((ma.prefijo.split("-")[0]).toUpperCase())+"&nrc="+(ma.codigo);
            console.log(dir);
            
            let buscado = null;
            buscado = tabla.children[1].querySelector("#tbc"+numHorario);

            fetch(dir)
            .then(response => response.text())
            .then( rta =>{
              if(rta == 'prefijo incorrecto')
              {
                let row = document.createElement("tr");
                row.innerHTML = "<td colspan='5'><p class='welcome'><strong>Error :(</strong> -> prefijo o NRC incorrecto de materia: "+ma.prefijo.toUpperCase()+" con NRC: "+ma.codigo+"</p></td>";
                buscado.appendChild(row);
              }
              else if(rta.includes('["'))
              {
                let bus = rta.split(",")[0].split('"')[1];
                let cant = rta.split(",")[1].split('"')[1];
                let disp = rta.split(",")[2].split('"')[1];
                
                let row = document.createElement("tr");
                row.innerHTML = html_fila(ma.nombre, ma.prefijo, bus, cant, disp);
                
                ma.capacidad = cant;
                ma.disponible = disp;
                buscado.appendChild(row);
              }
              else
              {
                let row = document.createElement("tr");
                row.innerHTML = "<td colspan='5' style='height:170px;'><p class='welcome'><strong>Error :(</strong> -> Esto se recibió: "+rta+"</p></td>";
                buscado.appendChild(row);
              }
            })
            .catch( err =>{
              let row = document.createElement("tr");
              row.innerHTML = "<td colspan='5'><p class='welcome'><strong>Error :(</strong> -> No se pudo realizar la petición: "+err.message+"</p></td>";
              buscado.appendChild(row);
            });
            sleep(800);
          } 
          /*content.appendChild(tabla);*/
          tablas.push(tabla);
          numHorario++;
        }

        setTimeout(()=>{
          let contentFin = document.querySelector(".content");
          for(let i = 0; i < tablas.length; i++)
          {
            console.log(tablas[i].innerHTML);
            contentFin.appendChild(tablas[i]);
          }
        }, 800);
        
        fechaHorario = new Date();
      }, 1000);
    }
    else
    {
      let butRef = document.querySelector(".refresh");
      butRef.classList.add("wobble");
      butRef.classList.add("animated");
      butRef.classList.add("warning");
      setTimeout(()=>{
        butRef.classList.remove("wobble");
        butRef.classList.remove("animated");
        butRef.classList.remove("warning");
      }, 1000);
    }
  }
  else if(e.target.classList.contains("save"))
  {
    guardarHorarios();
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

//COSAS PARA QUE EL ENTER SIRVA EN LA BUSQUEDA.
if(location.href.includes("search.html"))
{
  var input = document.getElementById("pr");
  var input2 = document.getElementById("busqueda");
  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("bus-act").click();
    }
  }); 
  input2.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("bus-act").click();
    }
  }); 
}