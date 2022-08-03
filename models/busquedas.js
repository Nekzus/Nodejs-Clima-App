import axios from "axios";

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "Puerto Madryn"];
  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // Peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const { data } = await instance.get();
      return data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
        text: lugar.text,
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // Peticion http
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });
      const resp = await instance.get();
      const { main, weather } = resp.data;
      return {
        desc: weather[0].description,
        temp: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        pressure: main.pressure,
        humidity: main.humidity,
      };
    } catch (error) {
      return [];
    }
  }
}

export default Busquedas;
