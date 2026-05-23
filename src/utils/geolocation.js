export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("El navegador no soporta geolocalizacion."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });
      },
      () => reject(new Error("No fue posible obtener la ubicacion.")),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  });
}
