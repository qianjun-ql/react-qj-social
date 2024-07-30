import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
  p: 4,
};

export default function ProfileModal({ open, handleClose, user }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user?.profilePhoto || "");
  const [selectedBanner, setSelectedBanner] = useState(user?.bannerPhoto || "");

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
      profilePhoto: user?.profilePhoto || null,
      bannerPhoto: user?.bannerPhoto || null,
    },
    onSubmit: async (values) => {
      console.log(values);
      dispatch(updateProfileAction(values));
      handleClose();
    },
  });

  const handleSelectedImage = async (event) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
    formik.setFieldValue("profilePhoto", imgUrl);
  };

  const handleSelectedBanner = async (event) => {
    setLoading(true);
    const bannerUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedBanner(bannerUrl);
    setLoading(false);
    formik.setFieldValue("bannerPhoto", bannerUrl);
  };

  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        bannerPhoto: user.bannerPhoto,
      });
    }
  }, [user]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Submit</Button>
            </div>
            <div className="h-[15rem]">
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectedBanner}
                style={{ display: "none" }}
                id="bannerInput"
              />
              <label htmlFor="bannerInput">
                <img
                  className="w-full h-full rounded-t-md cursor-pointer"
                  src={selectedBanner}
                  alt=""
                />
              </label>
            </div>
            <div className="pl-5">
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectedImage}
                style={{ display: "none" }}
                id="avatarInput"
              />
              <label htmlFor="avatarInput">
                <Avatar
                  className="transform -translate-y-2/4 cursor-pointer"
                  sx={{
                    width: "10rem",
                    height: "10rem",
                  }}
                  src={selectedImage}
                />
              </label>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
