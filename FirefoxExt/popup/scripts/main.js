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

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("start")) 
  {
    let cards = document.querySelectorAll(".card");
    changeAnimationCards(cards);

    //TODO ACA SE EJECUTA EL SCRIPT PARA COGER LAS MATERIAS DE BANNER.
    /* browser.tabs.executeScript(null, { 
      file: "scripts/seeBanner.js" 
    }); */

    setTimeout(()=>{
      try {
        location.href = "plans/plans.html";
        console.log("LOCATION CHANGES");
      } catch (e) {
        console.log(e.toString());
        console.log("LOCATION ERROR");
      }
    }, 0);
  }
  else if(e.target.classList.contains("accept"))
  {
    let butRef = document.querySelectorAll(".refresh");
    let active = document.querySelectorAll(".accept");
    active.push(document.querySelectorAll(".add-h"));

    changeAnimationButtons(active, false);
    changeAnimationButtons(butRef, true);
    //TODO AQUI SE HACE LA PETICION AL SCRAPPER Y ESO
    // O LO QUE SEA QUE SE HAGA AQUI.
  }
  else if(e.target.classList.contains("add-h"))
  {

  }
});
