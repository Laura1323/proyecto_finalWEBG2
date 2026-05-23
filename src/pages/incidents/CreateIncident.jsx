import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import IncidentForm from "../../components/incidents/IncidentForm";
import { useAuth } from "../../hooks/useAuth";
import { useUploadImage } from "../../hooks/useUploadImage";
import { createIncident } from "../../services/incidentService";

export default function CreateIncident() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { upload } = useUploadImage();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const imagenURL = await upload(data.imagen, user.uid);
      const id = await createIncident({
        usuarioId: user.uid,
        tipo: data.tipo,
        descripcion: data.descripcion,
        imagenURL,
        ubicacionTexto: data.ubicacionTexto,
        latitud: data.latitud || "",
        longitud: data.longitud || "",
      });

      Swal.fire("Incidente reportado", "El estado inicial es Reportado.", "success");
      navigate(`/incidentes/${id}`);
    } catch (error) {
      Swal.fire("No se pudo crear el reporte", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Reportar incidente</h1>
        <p className="mt-2 text-slate-600">Completa el formulario con evidencia fotografica y ubicacion.</p>
      </div>
      <IncidentForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
