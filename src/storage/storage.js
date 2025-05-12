import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import { configDotenv } from "dotenv";
import { v4 as uuidv4 } from "uuid";

configDotenv();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadPicture = async (file, profileId) => {
  const { buffer } = file;
  const filename = uuidv4();

  await deleteAllFiles(`profile/${profileId}`);

  const { error } = await supabase.storage
    .from("pictures")
    .upload(`profile/${profileId}/${filename}`, buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    throw new Error("Error uploading image");
  }

  const { data, error: publicUrlError } = supabase.storage
    .from("pictures")
    .getPublicUrl(`profile/${profileId}/${filename}`);

  if (publicUrlError) {
    throw new Error("Error getting image URL");
  }

  return data.publicUrl;
};

async function deleteAllFiles(folderPath) {
  const { data, error } = await supabase.storage
    .from("pictures")
    .list(folderPath);

  if (error) {
    throw new Error("Error listing files:", error.message);
  }

  if (!data.length) return;

  const filePaths = data.map((file) => `${folderPath}/${file.name}`);
  const { error: deleteError } = await supabase.storage
    .from("pictures")
    .remove(filePaths);

  if (deleteError) {
    throw new Error("Error deleting files:", deleteError.message);
  } else {
    console.log("All files deleted successfully!");
  }
}

export { supabase, upload, uploadPicture };
