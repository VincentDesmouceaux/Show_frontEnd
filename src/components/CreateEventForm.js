import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const CreateEventForm = ({ token, fetchPromoterProfile }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [orchestreQuantity, setOrchestreQuantity] = useState(0);
  const [orchestrePrice, setOrchestrePrice] = useState(0);
  const [mezzanineQuantity, setMezzanineQuantity] = useState(0);
  const [mezzaninePrice, setMezzaninePrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!date || !name || !image) {
      alert("Please fill in all the required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("date", date);
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      formData.append("seats[orchestre][quantity]", orchestreQuantity);
      formData.append("seats[orchestre][price]", orchestrePrice);
      formData.append("seats[mezzanine][quantity]", mezzanineQuantity);
      formData.append("seats[mezzanine][price]", mezzaninePrice);

      const response = await axios.post(
        "http://site--show-backend--5rcbdjs6tgqv.code.run/events/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Event created:", response.data.event);
      fetchPromoterProfile();
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Event Image:</label>
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Event"
                className="event-image-create"
              />
            ) : (
              <p>
                Drag and drop an image here or click to select an image
                (accepted formats: jpg, jpeg, png, gif)
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Orchestre Seats Quantity:</label>
          <input
            type="number"
            value={orchestreQuantity}
            onChange={(e) => setOrchestreQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Orchestre Seats Price:</label>
          <input
            type="number"
            value={orchestrePrice}
            onChange={(e) => setOrchestrePrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mezzanine Seats Quantity:</label>
          <input
            type="number"
            value={mezzanineQuantity}
            onChange={(e) => setMezzanineQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mezzanine Seats Price:</label>
          <input
            type="number"
            value={mezzaninePrice}
            onChange={(e) => setMezzaninePrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-modify" disabled={isLoading}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
