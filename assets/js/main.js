const url = "https://digimon-api.vercel.app/api/digimon";

var lista = document.getElementById("lista");
var modal = document.getElementById("modal");

var array = [];
var color = "";

fetch(url)
  .then((res) => res.json())
  .then((data) => {

    data.forEach((item) => {

      // llamo a la función nivel, para agregar color personalizado segun nivel
      nivel(item.level);

      var card = document.createElement("div");
      card.classList.add("col-6", "col-sm-3", "col-md-2", "abrir", "card", "shadow", "p-2", "m-3");

      lista.appendChild(card);

      var img = document.createElement("img");
      var h6 = document.createElement("h6");
      var level = document.createElement("div");

      level.classList.add("badge", "mt-1", "rounded-pill", `bg-${color}`);

      card.appendChild(img);
      card.appendChild(h6);
      card.appendChild(level);

      card.setAttribute("data-bs-toggle", "modal");
      card.setAttribute("data-bs-target", "#miModal");

      var contenidoH6 = document.createTextNode(`${item.name}`);
      h6.appendChild(contenidoH6);

      var contenidoLevel = document.createTextNode(`${item.level}`);
      level.appendChild(contenidoLevel);

      var contenidoImg = `${item.img}`;
      img.src = contenidoImg;

      // click sobre un digimon
      card.addEventListener("click", () => {

        var divBtn = document.createElement("div");
        var btn = document.createElement("button");
        var contenidoBtn = document.createTextNode("Guardar en Favoritos");

        array = JSON.parse(localStorage.getItem("favoritos"));

        // si el array tiene elementos
        if(array != undefined) { 
            let buscar = array.find((item) => item.nombre == contenidoH6.nodeValue); 
            if (buscar != undefined) {
                contenidoBtn.textContent = "Eliminar de Favoritos";
                btn.classList.remove("btn-primary");
            btn.classList.add("btn-danger");
            }
        }

        nivel(contenidoLevel.nodeValue);

        modal.innerHTML +=
          /*html*/
          `
            <div class="row justify-content-center align-items-center">
                <div class="col-6 p-2 row justify-content-center">
                    <img src="${contenidoImg}"></img>
                </div>
                <div class="col-6 text-center">
                    <div class="display-6">${contenidoH6.nodeValue}</div>
                    <div class="h6 mt-3 text-${color}">${contenidoLevel.nodeValue}</div>
                </div>
            </div>
        `;

        divBtn.classList.add("modal-footer");
        divBtn.appendChild(btn);
        btn.appendChild(contenidoBtn);
        btn.classList.add("btn", "btn-primary");
        btn.setAttribute("type", "button");
        modal.appendChild(divBtn);

        // click para guardar en favoritos
        btn.addEventListener("click", () => {
          array = JSON.parse(localStorage.getItem("favoritos"));
          let objeto = {
            imagen: contenidoImg,
            nombre: contenidoH6.nodeValue,
            nivel: contenidoLevel.nodeValue,
          };

          let ob = [objeto];

          if (array == null) {
            contenidoBtn.textContent = "Eliminar de Favoritos";
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-danger");
            return localStorage.setItem("favoritos", JSON.stringify(ob));
          }

          let found = array.find((item) => item.nombre == contenidoH6.nodeValue);
          if (found != undefined) {
            array = array.filter((item) => item != found);

            contenidoBtn.textContent = "Guardar en Favoritos";
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-primary");
            return localStorage.setItem("favoritos", JSON.stringify(array));
          }

          array.push(objeto);
          contenidoBtn.textContent = "Eliminar de Favoritos";
          btn.classList.remove("btn-primary");
          btn.classList.add("btn-danger");
          localStorage.setItem("favoritos", JSON.stringify(array));
        });
      });

    });
  })
  .catch((error) => {
    console.log(error);
  });



function nivel(level) {
  color = (level == "In Training") ? "primary" :
          (level == "Rookie") ? "success" :
          (level == "Champion") ? "danger" :
          (level == "Ultimate") ? "warning" :
          (level == "Fresh") ? "info" :
          (level == "Mega") ? "dark" :
          (level == "Training") ? "primary" :
          (level == "Armor") ? "secondary" : color
}


function vaciarModal() {
  modal.innerHTML = "";
}