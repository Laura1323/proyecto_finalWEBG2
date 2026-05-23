import { getStatusClasses } from "../../utils/generateStatusColor";

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}>
      {status}
    </span>
  );
}
