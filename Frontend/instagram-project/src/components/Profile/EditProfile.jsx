import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BootstrapDialog from "@mui/material/Dialog";
import BottomNav from "../Nav/BottomNav.jsx";

import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
const Dev_Url = "http://85.250.95.96:3006/";

const EditProfile = ({ open, handleClose, user, token }) => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");

  const editProfile = async () => {
    console.log(user);
    try {
      const res = await axios.post(
        `${Dev_Url}api/users/edit`,
        {
          username: username,
          bio: bio,
          phone: phone,
          email: email,
          profilePic: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Editing failed:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!image) {
      setUploadStatus("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Mock-Social-Network-Preset");
    formData.append("cloud_name", "dnnifnoyf");
    setIsUploading(true);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnnifnoyf/image/upload`,
        formData
      );

      setUploadedImageUrl(response.data.secure_url);
      setUploadStatus("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadStatus("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        sx={{
          maxWidth: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
          "& .MuiDialog-paper": {
            margin: "0 auto",
            width: "95%",
            maxWidth: "500px",
            borderRadius: "15px",
            backgroundColor: "rgb(45,45,45)",
            overflow: "hidden",
          },
        }}
        open={open}
        aria-labelledby="customized-dialog-title"
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            backgroundColor: "rgb(30,30,30)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1rem",
            textAlign: "center",
            borderBottom: "1px solid rgb(60,60,60)",
          }}
          id="customized-dialog-title"
        >
          Edit your Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "rgb(150,150,150)",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            backgroundColor: "rgb(30,30,30)",
            color: "rgb(220,220,220)",
            padding: "20px",
          }}
        >
          <Box></Box>
          <>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                className="w-20 h-20 rounded-full object-cover mx-auto m-4"
                src={user.profilePic || " Edit profile pic"}
                alt="profile pic"
              />

              <label
                htmlFor="fileInput"
                style={{
                  display: "inline-block",
                  backgroundColor: "rgb(30,30,30)",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "rgb(220,220,220)",
                  fontSize: "0.9rem",
                  border: "1px solid rgb(80,80,80)",
                }}
              >
                Choose File
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button
                onClick={handleUpload}
                className=" pt-3 block mx-auto text-[#0095f6] font-bold text-sm cursor-pointer bg-none border-none hover:text-blue-400 transition"
              >
                Upload
              </button>
            </Box>
            <Box>
              {isUploading ? (
                <div className="flex justify-center pb-3">
                  <ClipLoader color="#ffffff" size={40} />
                </div>
              ) : (
                <p style={{ color: "rgb(180,180,180)", fontSize: "0.85rem" }}>
                  {uploadStatus}
                </p>
              )}
            </Box>
            <Box>
              <div className="field">
                <label className="block text-sm font-bold mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-2 px-4 mb-3 text-sm bg-black rounded-md border border-gray-600"
                />
              </div>
              <div className="field">
                <label className="block text-sm font-bold mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full py-2 px-4 mb-3 text-sm bg-black rounded-md border border-gray-600"
                  rows={3}
                ></textarea>
              </div>
              <div className="field">
                <label className="block text-sm font-bold mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2 px-4 mb-3 text-sm bg-black rounded-md border border-gray-600"
                />
              </div>
              <div className="field">
                <label className="block text-sm font-bold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-4 mb-3 text-sm bg-black rounded-md border border-gray-600"
                />
              </div>
            </Box>
          </>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "rgb(30,30,30)",
            borderTop: "1px solid rgb(60,60,60)",
            padding: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => {
              editProfile();
              handleClose();
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }}
            sx={{
              textTransform: "none",
              color: "#0095f6",
              fontWeight: "bold",
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BottomNav index={2} />
    </React.Fragment>
  );
};

export default EditProfile;
