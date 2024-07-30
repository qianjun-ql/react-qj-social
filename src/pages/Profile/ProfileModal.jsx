import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { updateProfileAction } from "../../Redux/Auth/auth.action";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateProfileAction(values));
      handleClose();
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
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
              <img
                className="w-full h-full rounded-t-md"
                src="https://cdn.pixabay.com/photo/2022/01/01/15/40/train-6907884_1280.jpg"
                alt=""
              />
            </div>
            <div className="pl-5">
              <Avatar
                className="transform -translate-y-2/4"
                sx={{ width: "10rem", height: "10rem" }}
                src="https://cdn.pixabay.com/photo/2019/08/28/14/24/tokyo-4436914_1280.jpg"
              />
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
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
