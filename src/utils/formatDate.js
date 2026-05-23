export function formatDate(value) {
  if (!value) return "Sin fecha";

  const date = value?.toDate ? value.toDate() : new Date(value);

  if (Number.isNaN(date.getTime())) return "Sin fecha";

  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatDateInput(value) {
  const date = value ? new Date(value) : new Date();
  return date.toISOString().slice(0, 10);
}
