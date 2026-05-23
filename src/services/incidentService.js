import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/config";

const incidentsRef = collection(db, "incidents");

function mapIncident(snapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}

export async function createIncident(payload) {
  const docRef = await addDoc(incidentsRef, {
    ...payload,
    fechaCreacion: serverTimestamp(),
    estado: "Reportado",
    grupoId: "",
  });

  return docRef.id;
}

export async function getIncidentById(id) {
  const snapshot = await getDoc(doc(db, "incidents", id));
  if (!snapshot.exists()) throw new Error("El incidente no existe.");
  return mapIncident(snapshot);
}

export async function getAllIncidents() {
  const snapshot = await getDocs(query(incidentsRef, orderBy("fechaCreacion", "desc")));
  return snapshot.docs.map(mapIncident);
}

export async function getUserIncidents(userId) {
  const q = query(incidentsRef, where("usuarioId", "==", userId), orderBy("fechaCreacion", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapIncident);
}

export async function updateIncidentStatus(incident, estado) {
  const batch = writeBatch(db);

  if (incident.grupoId) {
    const grouped = await getDocs(query(incidentsRef, where("grupoId", "==", incident.grupoId)));
    grouped.forEach((item) => batch.update(item.ref, { estado }));
  } else {
    batch.update(doc(db, "incidents", incident.id), { estado });
  }

  await batch.commit();
}

export async function groupIncidents(incidentIds) {
  if (incidentIds.length < 2) {
    throw new Error("Selecciona al menos dos incidentes para agrupar.");
  }

  const grupoId = crypto.randomUUID();
  const batch = writeBatch(db);

  incidentIds.forEach((id) => {
    batch.update(doc(db, "incidents", id), { grupoId });
  });

  await batch.commit();
  return grupoId;
}

export async function clearIncidentGroup(id) {
  await updateDoc(doc(db, "incidents", id), { grupoId: "" });
}
