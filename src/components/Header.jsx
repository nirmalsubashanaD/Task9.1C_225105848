import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Header = ({ onHomeClick, onArticlesClick, onTutorialsClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          DEV@Deakin
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, maxWidth: 650, mx: 2 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search..."
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" onClick={onHomeClick}>
            Home
          </Button>
          <Button color="inherit" onClick={onArticlesClick}>
            Articles
          </Button>
          <Button color="inherit" onClick={onTutorialsClick}>
            Tutorials
          </Button>
          <Button color="inherit" onClick={() => navigate("/post")}>
            Post
          </Button>

          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
