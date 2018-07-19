function refresh()
{

}
function start()
{
  let cards = document.querySelectorAll(".card");
  changeAnimation(cards);
  setTimeout(()=>{
    location.href = "plans/plans.html";
  }, 800);
  console.log("CAMILO");
}
function changeAnimation(components)
{
  components.forEach((comp)=>{
    comp.classList.remove("slideInRight");
    comp.classList.remove("animated");

    comp.classList.add("slideOutLeft");
    comp.classList.add("animated");
  });
}
// let links = document.querySelectorAll(".start");
//
// links.forEach((link)=>{
//   link.addEventListener('click', (ev)=>{
//     ev.preventDefault();
//     let content = document.querySelector(".card");
//     comp.classList.remove("slideInRight");
//     comp.classList.remove("animated");
//
//     comp.classList.add("slideOutLeft");
//     comp.classList.add("animated");
//
//     setTimeout(()=>{
//       location.href = "plans/plans.html";
//     }, 550);
//   });
// });
