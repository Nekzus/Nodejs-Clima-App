class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "Puerto Madryn"];
  constructor() {
    // TODO: leer DB si existe
  }
  async ciudad(lugar = "") {
    // TODO: peticion http
    console.log(lugar);
    return []; // retornar los lugares
  }
}

export default Busquedas;
