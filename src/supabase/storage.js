import { supabase } from "./client";
import { STORAGE_BUCKET } from "../utils/constants";

export async function uploadIncidentImage(file, userId) {
  if (!file) throw new Error("La imagen es obligatoria.");

  const extension = file.name.split(".").pop();
  const safeExtension = extension || "jpg";
  const fileName = `${userId}/${crypto.randomUUID()}.${safeExtension}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
