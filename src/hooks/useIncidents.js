import { useContext } from "react";
import { IncidentContext } from "../context/incident-context";

export function useIncidents() {
  const context = useContext(IncidentContext);

  if (!context) {
    throw new Error("useIncidents debe usarse dentro de IncidentProvider.");
  }

  return context;
}
