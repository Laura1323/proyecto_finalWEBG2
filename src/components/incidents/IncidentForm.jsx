import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FiMapPin, FiUploadCloud } from "react-icons/fi";
import { INCIDENT_TYPES } from "../../utils/constants";
import { getCurrentPosition } from "../../utils/geolocation";

export default function IncidentForm({ onSubmit, loading }) {
  const [coords, setCoords] = useState(null);
  const [preview, setPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipo: "",
      descripcion: "",
      ubicacionTexto: "",
      imagen: null,
    },
  });

  const handleGeo = async () => {
    try {
      const position = await getCurrentPosition();
      setCoords(position);
      Swal.fire("Ubicacion capturada", "Las coordenadas se adjuntaran al reporte.", "success");
    } catch (error) {
      Swal.fire("No se pudo geolocalizar", error.message, "warning");
    }
  };

  const submit = (data) => {
    if (!selectedImage) return;
    onSubmit({ ...data, imagen: selectedImage, ...coords });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-soft lg:grid-cols-2">
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Tipo de incidente</span>
          <select
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-600"
            {...register("tipo", { required: "Selecciona un tipo de incidente." })}
          >
            <option value="">Selecciona una opcion</option>
            {INCIDENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.tipo && <small className="text-red-600">{errors.tipo.message}</small>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Ubicacion dentro de la universidad</span>
          <input
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-600"
            placeholder="Ej: Bloque 3, segundo piso"
            {...register("ubicacionTexto", { required: "Escribe la ubicacion del incidente." })}
          />
          {errors.ubicacionTexto && <small className="text-red-600">{errors.ubicacionTexto.message}</small>}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Descripcion detallada</span>
          <textarea
            className="mt-2 min-h-40 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-600"
            placeholder="Describe que ocurre, desde cuando y cualquier detalle relevante."
            {...register("descripcion", {
              required: "La descripcion es obligatoria.",
              minLength: { value: 15, message: "La descripcion debe tener al menos 15 caracteres." },
            })}
          />
          {errors.descripcion && <small className="text-red-600">{errors.descripcion.message}</small>}
        </label>
      </div>

      <div className="space-y-5">
        <label className="block rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center">
          <FiUploadCloud className="mx-auto mb-3 text-3xl text-brand-700" />
          <span className="block text-sm font-semibold text-slate-700">Fotografia obligatoria</span>
          <span className="mt-1 block text-xs text-slate-500">Puedes tomar foto desde camara o subir desde galeria.</span>
          <input
            className="mt-4 w-full text-sm"
            type="file"
            accept="image/*"
            capture="environment"
            {...register("imagen", {
              validate: () => selectedImage instanceof File || "Adjunta una fotografia del incidente.",
            })}
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              setSelectedImage(file);
              setPreview(file ? URL.createObjectURL(file) : "");
            }}
          />
          {errors.imagen && <small className="text-red-600">{errors.imagen.message}</small>}
        </label>

        {preview && <img src={preview} alt="Vista previa" className="h-56 w-full rounded-lg object-cover" />}

        <button
          type="button"
          onClick={handleGeo}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-600 px-4 py-3 font-semibold text-brand-700 hover:bg-brand-50"
        >
          <FiMapPin />
          Usar geolocalizacion opcional
        </button>

        {coords && (
          <p className="rounded-lg bg-brand-50 p-3 text-sm text-brand-900">
            Coordenadas: {coords.latitud.toFixed(5)}, {coords.longitud.toFixed(5)}
          </p>
        )}

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand-700 px-5 py-3 font-bold text-white hover:bg-brand-900">
          {loading ? "Enviando reporte..." : "Registrar incidente"}
        </button>
      </div>
    </form>
  );
}
