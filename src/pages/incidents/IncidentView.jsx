import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import IncidentDetails from "../../components/incidents/IncidentDetails";
import Loader from "../../components/common/Loader";
import { getIncidentById } from "../../services/incidentService";

export default function IncidentView() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIncident(await getIncidentById(id));
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!incident) return <p>No se encontro el incidente.</p>;

  return <IncidentDetails incident={incident} />;
}
