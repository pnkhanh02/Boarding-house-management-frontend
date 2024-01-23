import React, { useState } from "react";
import backgroundImage from "./i4.jpg";

function DangKy(props) {
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
          height: "480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <label
          htmlFor="username"
          style={{ alignSelf: "flex-start", marginBottom: "8px" }}
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
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
        <input
          type="password"
          id="password"
          name="password"
          style={{
            padding: "8px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
        <label
          htmlFor="name"
          style={{ alignSelf: "flex-start", marginBottom: "8px" }}
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          style={{
            padding: "8px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
        <label
          htmlFor="phoneNumber"
          style={{ alignSelf: "flex-start", marginBottom: "8px" }}
        >
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          style={{
            padding: "8px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />
        <button
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default DangKy;
