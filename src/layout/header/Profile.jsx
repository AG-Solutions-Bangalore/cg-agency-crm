import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import profile from "../../../public/user-1.jpg";
import { IconMail, IconUser, IconCircleX } from "@tabler/icons-react";
import Logout from "../../components/Logout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import ChangePasswordDialog from "./ChangePasswordDialog";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenLogout = () => setOpenModal(!openModal);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);

  const token = localStorage.getItem("token");
  const location = useLocation();
const [forgotpassword, setForgotPassword] = useState({
  old_password: "",
  new_password: "",
    conformpassword: "",
  });
  const onChangePassword = async (e) => {
    e.preventDefault();
    if (forgotpassword.new_password !== forgotpassword.conformpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (forgotpassword.old_password === forgotpassword.new_password) {
      toast.error("Old and new passwords cannot be the same");
      return;
    }
    let data = {
      old_password: forgotpassword.old_password,
      new_password: forgotpassword.new_password,
      username: localStorage.getItem("name"),
    };
    try {
      await axios.post(`${BASE_URL}/api/panel-change-password`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Password Updated Successfully!");

      handleClose1();
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Invalid old password");
    }
  };
 
  const handleClose1 = () => setOpenDialog1(false);

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl2(e.currentTarget)}
      >
        <Avatar src={profile} alt="profile" sx={{ width: 35, height: 35 }} />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={() => setAnchorEl2(null)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ "& .MuiMenu-paper": { width: "200px" } }}
      >
      
        <MenuItem onClick={() => setOpenDialog1(true)}>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button onClick={handleOpenLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
      <Logout open={openModal} handleOpen={handleOpenLogout} />
   
      {/* Password Dialog */}
      <ChangePasswordDialog
       setForgotPassword={setForgotPassword}
       open={openDialog1}
       handleClose={handleClose1}
       forgotpassword={forgotpassword}
       onChangePassword={onChangePassword}
      
      
      />
     
    </Box>
  );
};

export default Profile;
