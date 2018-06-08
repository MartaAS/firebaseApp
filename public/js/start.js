window.onload = start;

var referenciaPersona;

function start() {
  var config = {
    apiKey: "AIzaSyBKIYBhELuRa8kzcfNfHELMw2nPKUCsOiY",
    authDomain: "fir-app-69625.firebaseapp.com",
    databaseURL: "https://fir-app-69625.firebaseio.com",
    projectId: "fir-app-69625",
    storageBucket: "fir-app-69625.appspot.com",
    messagingSenderId: "1090217803511"
  };
  firebase.initializeApp(config);

  referenciaPersona = firebase.database().ref().child('personas');

  imagenesPersonas = document.getElementsByClassName('persona');

  for (var i = 0; i < imagenesPersonas.length; i++) {
    imagenesPersonas[i].addEventListener('click', aumentarVotos, false);
  }

  showGraphic();
}


function aumentarVotos(event) {
  var personaClick = this.getAttribute('data-nombre');

  //console.log(personaClick);

  var referenciaCandidato = referenciaPersona.child(personaClick);

  referenciaCandidato.once('value', function (snapshot) {
    var persona = snapshot.val();
    //console.log(nombrePersona);
    var numVotosActualizado = persona.Votos + 1;
    referenciaCandidato.update({ Nombre: persona.Nombre, Votos: numVotosActualizado });
  });
}



function showGraphic() {
  referenciaPersona.on("value", function (snapshot) {
    var datosDeFirebase = snapshot.val();
    var datosAmostrar = [];
    var total = 0;
    for (var key in datosDeFirebase) {
      total += datosDeFirebase[key].Votos;
    }

    for (var key in datosDeFirebase) {

      var porcentajeVotos = datosDeFirebase[key].Votos / total;

      datosAmostrar.push({ valorX: datosDeFirebase[key].Nombre, valorY: porcentajeVotos });
    }

    document.getElementById('grafica').innerHTML = "";

    dibujar(datosAmostrar);
  });
}