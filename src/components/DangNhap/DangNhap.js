import React, { useState } from "react";
import { loginAPI } from "../../APIs/AuthAPI";
import { Input } from "reactstrap";

import { useNavigate } from "react-router-dom";
import backgroundImage from "./i5.jpg";
function DangNhap(props) {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [pass, setPass] = useState("");
  let request = {
    password: pass,
    username: username,
  };
  console.log("RQ", request);
  const login = (event) => {
    event.preventDefault();
    loginAPI(request).then((res) => {
      if (res) {
        localStorage.setItem("username", res.username);
        localStorage.setItem("id", res.id);
        localStorage.setItem("role", res.role);
        localStorage.setItem("token", res.token);
        localStorage.setItem("name", res.name);
        alert("Đăng nhập thành công!");
        navigate("/homePage");
      }
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: "100%", // Ensure the image covers the entire background
        backgroundRepeat: "no-repeat", // Do not repeat the image
        backgroundColor: "#0077cc",
      }}
    >
      <form
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          width: "500px",
          height: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <label
          htmlFor="username"
          style={{ alignSelf: "flex-start", marginBottom: "8px" }}
        >
          Username:
        </label>
        <Input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={{
            padding: "8px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
        <label
          htmlFor="password"
          style={{ alignSelf: "flex-start", marginBottom: "8px" }}
        >
          Password:
        </label>
        <Input
          type="password"
          value={pass}
          onChange={(event) => setPass(event.target.value)}
          style={{
            padding: "8px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
        <button
          onClick={login}
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#0077cc",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            alignSelf: "center",
          }}
        >
          Sign In
        </button>
        <p
          onClick={() => {navigate("/dangKy")}}
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "red",
            cursor: "pointer", // Thêm style để biến con trỏ thành mũi tên khi hover
          }}
        >
          Don't have an account yet, register now
        </p>
      </form>
    </div>
  );
}

export default DangNhap;
