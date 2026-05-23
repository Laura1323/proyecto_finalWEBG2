import { uploadIncidentImage } from "../supabase/storage";

export async function uploadImage(file, userId) {
  return uploadIncidentImage(file, userId);
}
