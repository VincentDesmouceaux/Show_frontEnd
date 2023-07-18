import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const PromoterSignUp = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      formData.append("avatar", avatar);

      const response = await axios.post(
        "http://localhost:3000/promoter/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleToken(response.data.token);
      navigate("/promoter/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setAvatar(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="signup-overlay">
      <div className="signup-content">
        <h2 className="signup-title">Promoter Sign Up</h2>
        <button className="signup-close" onClick={() => navigate("/")}>
          X
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSignUpSubmit}>
          <div className="signup-group signup-dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
                className="signup-avatar-preview"
              />
            ) : (
              <p>
                Faites glisser et déposez une image ici, ou cliquez pour
                sélectionner une image
              </p>
            )}
          </div>

          <div className="signup-group">
            <label className="signup-label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="signup-input"
            />
          </div>
          <div className="signup-group">
            <label className="signup-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="signup-input"
            />
          </div>
          <div className="signup-group">
            <label className="signup-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="signup-input"
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <p className="signup-submodal">
          Si vous voulez vous connecter en tant que promoteur,{" "}
          <Link to="/promoter/login">connectez-vous ici</Link>.
        </p>
      </div>
    </div>
  );
};

export default PromoterSignUp;
