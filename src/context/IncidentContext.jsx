import { useCallback, useMemo, useState } from "react";
import { getAllIncidents, getUserIncidents } from "../services/incidentService";
import { IncidentContext } from "./incident-context";

export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadIncidents = useCallback(async ({ userId, admin = false } = {}) => {
    setLoading(true);
    try {
      const data = admin ? await getAllIncidents() : await getUserIncidents(userId);
      setIncidents(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      incidents,
      loading,
      setIncidents,
      loadIncidents,
    }),
    [incidents, loadIncidents, loading],
  );

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
}
