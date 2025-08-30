import supabase from "../supabase/supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be fetched");
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be fetched");
  }
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = typeof cabin.image === "string";
  const imageName = `${Math.random()}-${cabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? cabin.image
    : `https://qsurknendcxdbsprxtze.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  const avatarFile = cabin.image[0];
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);
  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be fetched");
  }
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, avatarFile);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id); // use inserted id
      throw new Error("Image upload failed, cabin deleted");
    }
  }

  return data;
}
