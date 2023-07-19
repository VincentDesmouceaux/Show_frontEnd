import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const ModifyEvent = ({ isLoggedIn, token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [orchestreQuantity, setOrchestreQuantity] = useState("");
  const [orchestrePrice, setOrchestrePrice] = useState("");
  const [mezzanineQuantity, setMezzanineQuantity] = useState("");
  const [mezzaninePrice, setMezzaninePrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${id}`);
        setEventData(response.data);
        setName(response.data.name);
        setDate(response.data.date);
        setOrchestreQuantity(response.data.seats.orchestre.quantity);
        setOrchestrePrice(response.data.seats.orchestre.price);
        setMezzanineQuantity(response.data.seats.mezzanine.quantity);
        setMezzaninePrice(response.data.seats.mezzanine.price);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("orchestre.quantity", orchestreQuantity);
    formData.append("orchestre.price", orchestrePrice);
    formData.append("mezzanine.quantity", mezzanineQuantity);
    formData.append("mezzanine.price", mezzaninePrice);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`http://localhost:3000/event/modify/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/event/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Modify Event</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Orchestre Quantity:</label>
              <input
                type="number"
                value={orchestreQuantity}
                onChange={(e) => setOrchestreQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Orchestre Price:</label>
              <input
                type="number"
                value={orchestrePrice}
                onChange={(e) => setOrchestrePrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mezzanine Quantity:</label>
              <input
                type="number"
                value={mezzanineQuantity}
                onChange={(e) => setMezzanineQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mezzanine Price:</label>
              <input
                type="number"
                value={mezzaninePrice}
                onChange={(e) => setMezzaninePrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Image:</label>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Event Image"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>
                    Faites glisser et déposez une image ici, ou cliquez pour
                    sélectionner une image
                  </p>
                )}
              </div>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModifyEvent;
