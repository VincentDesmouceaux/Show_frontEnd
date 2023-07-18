import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const PromoterSignUp = ({ handleToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
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

  return (
    <div>
      <h2>Promoter Sign Up</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar"
                  className="avatar-preview"
                />
              ) : (
                <p>
                  Faites glisser et déposez une image ici, ou cliquez pour
                  sélectionner une image
                </p>
              )}
            </div>
          )}
        </Dropzone>

        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default PromoterSignUp;
