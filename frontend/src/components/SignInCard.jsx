import React, { useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function SignInCard() {
  const { handleLogin, handleRegister } = useContext(AuthContext);
  const [mode, setMode] = useState("login");          // "login" | "register"
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      if (mode === "login") {
        await handleLogin(username, password);
      } else {
        const resMsg = await handleRegister(fullname, username, password);
        setMsg(resMsg);
        setUsername("");
        setPassword("");
        setFullname("");
        setMode("login");
      }
      setError("");
    } catch (err) {
      const m = err?.response?.data?.message || "Something went wrong";
      setError(m);
    }
  };

  return (
    <Card sx={{ width: 360 }}>
      <CardHeader title={mode === "login" ? "Sign in" : "Sign up"} />
      <CardContent>
        <Stack spacing={2}>
          {mode === "register" && (
            <TextField
              label="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          )}
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          {msg && <Alert severity="success">{msg}</Alert>}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Create account" : "Have an account?"}
        </Button>
        <Button variant="contained" onClick={submit}>
          {mode === "login" ? "Login" : "Register"}
        </Button>
      </CardActions>
    </Card>
  );
}
