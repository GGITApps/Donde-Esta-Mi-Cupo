function changeAnimation(components)
{
  components.forEach((comp)=>{
    let content = document.querySelector(".card");
    comp.classList.remove("fadeInRight");
    comp.classList.remove("animated");

    comp.classList.add("fadeOutLeft");
    comp.classList.add("animated");
  });
  console.log("ANIMATION CHANGES");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("start")) {
    var comps = document.querySelectorAll(".card");
    changeAnimation(comps);

    setTimeout(()=>{
      try {
        location.href = "plans/plans.html";
        console.log("LOCATION CHANGES");
      } catch (e) {
        console.log(e.toString());
        console.log("LOCATION ERROR");
      }
    }, 700);
  }
});
