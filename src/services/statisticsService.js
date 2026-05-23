import { INCIDENT_STATUSES, INCIDENT_TYPES } from "../utils/constants";

export function buildStatistics(incidents) {
  const byStatus = INCIDENT_STATUSES.map((estado) => ({
    name: estado,
    value: incidents.filter((incident) => incident.estado === estado).length,
  }));

  const byType = INCIDENT_TYPES.map((tipo) => ({
    name: tipo,
    value: incidents.filter((incident) => incident.tipo === tipo).length,
  })).filter((item) => item.value > 0);

  const resolved = incidents.filter((incident) => incident.estado === "Resuelto").length;

  return {
    total: incidents.length,
    resolved,
    pending: incidents.length - resolved,
    byStatus,
    byType,
  };
}
