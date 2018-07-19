var url = "https://cors-proxy-server-uniandes.herokuapp.com/";
$.get(url, function(response) {
  console.log(response);
  $('.hola').text(response);
});