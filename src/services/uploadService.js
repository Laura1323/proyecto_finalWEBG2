import { supabase } from "../supabase/client";

export const uploadImage = async (file, userId) => {
  try {

    const fileName = `${Date.now()}-${file.name}`;

    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
      .from("incident-images")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("incident-images")
      .getPublicUrl(filePath);

    return data.publicUrl;

  } catch (error) {
    console.error(error);
    return null;
  }
};