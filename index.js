import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
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
        const lugar = await leerInput("Ciudad: ");
        console.log(lugar);
        // Buscar los lugares

        // Seleccionar el lugar

        // Datos del clima

        // Mostrar resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:");
        console.log("Lat:");
        console.log("Lng:");
        console.log("Temperatura:");
        console.log("Mínima:");
        console.log("Máxima:");
        break;
      case 2:
        console.log();
        console.log("  Historial".green);
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
