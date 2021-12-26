const https = require("https");
const fs = require("fs");

const argumentos = process.argv.slice(2);

let nombre = argumentos[0];
let extension = argumentos[1];
let indicador = argumentos[2];
let cantidad = Number(argumentos[3]);

let dataApi = {};

https
  .get("https://mindicador.cl/api", (resp) => {
    resp.on("data", (respuesta) => {
      dataApi = JSON.parse(respuesta);

      fs.writeFile(
        nombre + extension,
        `
        A la fecha: ${new Date()}
        Fue realizada cotización con los siguientes datos:
        Cantidad de pesos a convertir: ${cantidad} pesos
        Convertido a "${indicador}" da un total de:
        ${dataApi[indicador].valor * cantidad}
        `,
        "utf8",
        () => {}
      );

      fs.readFile(nombre + extension, "utf8", (err, data) => {
        console.log(data);
      });
    });
  })
  .on("error", (err) => {
    console.log(`Error al traer data de API: ${err.message}`);
  });
