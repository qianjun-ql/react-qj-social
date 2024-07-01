export const uploadToCloudinary = async (img, fileType) => {
  const cloud_name = "dqlgwzigd";
  const upload_preset = "qj-social";

  if (img && fileType) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      { method: "POST", body: data }
    );
    console.log();
    console.log("res", res);

    const fileData = await res.json();
    console.log("file data", fileData.url);
    return fileData.url;
  } else {
    console.log("error");
  }
};
