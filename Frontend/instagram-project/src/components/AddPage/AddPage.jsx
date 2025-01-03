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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const AddPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [imageContent, setImageContent] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isPreview, setIsPreview] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const baseUrl = useSelector((state) => state.url.url);
  const sharePost = async (image, content) => {
    console.log("baba");
    try {
      const res = await axios.post(
        `${baseUrl}/api/posts/`,
        {
          media: image,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Uploading failed:", error);
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

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/homepage");
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
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
          Create a Post
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
          {isPreview ? (
            <>
              <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
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
                <div style={{ marginBottom: "20px" }}>
                  <textarea
                    onChange={(e) => setImageContent(e.target.value)}
                    style={{
                      width: "100%",
                      height: "150px",
                      borderRadius: "5px",
                      border: "1px solid rgb(80,80,80)",
                      padding: "10px",
                      fontSize: "0.9rem",
                      color: "rgb(220,220,220)",
                      resize: "none",
                      backgroundColor: "rgb(30,30,30)",
                    }}
                    placeholder="Type here..."
                  />
                </div>
              </Box>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                style={{
                  maxWidth: "70%",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  border: "1px solid rgb(60,60,60)",
                }}
              />
              <p style={{ fontSize: "1rem", color: "rgb(220,220,220)" }}>
                {imageContent}
              </p>
            </div>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "rgb(30,30,30)",
            borderTop: "1px solid rgb(60,60,60)",
            padding: "10px",
            justifyContent: "flex-end",
          }}
        >
          {isPreview ? (
            <Button
              onClick={() => setIsPreview(false)}
              sx={{
                textTransform: "none",
                color: "#0095f6",
                fontWeight: "bold",
              }}
              disabled={!uploadedImageUrl || !imageContent}
            >
              Save changes
            </Button>
          ) : (
            <Button
              onClick={() => {
                sharePost(uploadedImageUrl, imageContent);
                handleClose();
                // window.location.reload();
              }}
              sx={{
                textTransform: "none",
                backgroundColor: "#0095f6",
                fontWeight: "bold",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#007bb5",
                },
              }}
            >
              Share
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>

      <BottomNav index={2} />
    </React.Fragment>
  );
};

export default AddPage;
