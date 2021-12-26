const child_process = require("child_process");
const fs = require("fs");

const ejecutar = (archivo, nombre, extension, indicador, cantidad) => {
    return new Promise((resolve) => {
        child_process.exec(`node ${archivo} ${nombre} ${extension} ${indicador} ${cantidad}`, (err, result) => {
            resolve(result);
        })
    })
};

const nombre = "miarchivo";
const extension = ".txt";
const indicador = "dolar";
const cantidad = 1000;

ejecutar("bluemoney.js", nombre, extension, indicador, cantidad).then((data) => {
    const miData = data;
    console.log(`${miData}`);
})

