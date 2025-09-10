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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create user in Firebase Auth
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Set display name in Auth profile
      await updateProfile(cred.user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      // Store extra user data in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        createdAt: serverTimestamp(),
      });

      // Redirect to Login page
      navigate("/login", { replace: true });
    } catch (err) {
      setError("Sign-up failed. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-signup-container">
      <Paper className="auth-signup-card">
        <Typography className="auth-signup-title">Create Account</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error" className="auth-signup-error">
                {error}
              </Alert>
            )}
            
            {/* Name fields in a row */}
            <div className="auth-signup-name-row">
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
                className="auth-signup-input"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
                className="auth-signup-input"
              />
            </div>
            
            <TextField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              autoComplete="email"
              className="auth-signup-input"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              disabled={loading}
              autoComplete="new-password"
              className="auth-signup-input"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className={`auth-signup-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? "Creating Account..." : "Sign up"}
            </Button>
            <Typography className="auth-signup-footer">
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Log in
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;