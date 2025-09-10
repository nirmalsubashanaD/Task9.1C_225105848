import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Link,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import "./Login.css"; // updated CSS with unique classes

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Box className="auth-login-container">
      <Paper className="auth-login-card">
        <Typography className="auth-login-title">Login</Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error" className="auth-login-error">
                {error}
              </Alert>
            )}

            <TextField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="email"
              className="auth-login-input"
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="current-password"
              className="auth-login-input"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="auth-login-btn"
            >
              Login
            </Button>

            <Typography className="auth-login-footer">
              Don’t have an account?{" "}
              <Link component={RouterLink} to="/signup">
                Sign up
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
