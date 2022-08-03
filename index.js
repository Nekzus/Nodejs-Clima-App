import "dotenv/config";
import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa,
} from "./helpers/inquirer.js";
import colors from "colors";
import Busquedas from "./models/busquedas.js";

const main = async () => {
  const busquedas = new Busquedas();
  let opt = 0;
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: ");

        // Buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;
        const lugarSel = lugares.find((l) => l.id === id);
        const { lng, lat, text } = lugarSel;
        // Guardar en DB
        busquedas.agregarHistorial(text);

        // Datos del clima
        const { temp, temp_min, temp_max, pressure, humidity, desc } =
          await busquedas.climaLugar(lat, lng);
        // Mostrar resultados
        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", `${text}`.toUpperCase().cyan);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Estado:", desc.toString().green);
        console.log("Temperatura:", temp, "°C".green);
        console.log("Mínima:", temp_min, "°C".green);
        console.log("Máxima:", temp_max, "°C".green);
        console.log("Presión:", pressure, "hPa".green);
        console.log("Húmedad:", humidity, "%".green);
        break;
      case 2:
        // Historial de búsquedas
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          let idx = `${i + 1}.`.green;
          console.log(`${idx}` + ` ${lugar}`.cyan);
        });
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
