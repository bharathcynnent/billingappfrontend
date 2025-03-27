import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './vehiclepage.css';

const VehiclePage = ({ setJobCard }) => {
  const [stateCode, setStateCode] = useState("");
  const [regionalCode, setRegionalCode] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [callingNumber, setCallingNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  // Prevent alphabet input in numeric fields
  const handleNumericInput = (e, setter) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setter(value);
  };

  // Copy customer number to calling number
  const copyCustomerNumber = () => {
    setCallingNumber(customerNumber);
  };

  // Validation function
  const validateForm = () => {
    let errors = {};

    if (!stateCode.match(/^[A-Z]{2}$/)) {
      errors.stateCode = "State code should be 2 uppercase letters (e.g., TN).";
    }

    if (!regionalCode.match(/^[A-Z]{2}$/)) {
      errors.regionalCode = "Regional code should be 2 uppercase letters (e.g., AR).";
    }

    if (!vehicleNumber.match(/^\d{4}$/)) {
      errors.vehicleNumber = "Vehicle number should be 4 digits (e.g., 1355).";
    }

    if (!vehicleBrand) errors.vehicleBrand = "Vehicle Brand is required.";
    if (!vehicleModel) errors.vehicleModel = "Vehicle Model is required.";
    if (!customerName) errors.customerName = "Customer Name is required.";
    if (!customerNumber.match(/^\d{10}$/)) {
      errors.customerNumber = "Customer Number should be 10 digits.";
    }
    if (!fuelType) errors.fuelType = "Fuel Type is required.";
    if (!remarks) errors.remarks = "Remarks are required.";

    if (email && !email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Invalid email format.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const jobCard = {
      vehicleNumber: `${stateCode} ${regionalCode} ${vehicleNumber}`,
      vehicleBrand,
      vehicleModel,
      customerName,
      customerNumber,
      callingNumber,
      address,
      email,
      fuelType,
      remarks,
    };

    setJobCard(jobCard);
    navigate("/billing");
  };

  return (
    <div className="vehicle-container">
      <h2>Vehicle Information</h2>
      {error && <p className="error-text">{error}</p>}
      <form className="vehicle-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehicle Number: *</label>
          <div className="vehicle-number-container">
            <input
              type="text"
              maxLength="2"
              className="small-input"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value.toUpperCase())}
              placeholder="TN"
              required
            />
            <input
              type="text"
              maxLength="2"
              className="small-input"
              value={regionalCode}
              onChange={(e) => setRegionalCode(e.target.value.toUpperCase())}
              placeholder="AR"
              required
            />
            <input
              type="text"
              maxLength="4"
              className="medium-input"
              value={vehicleNumber}
              onChange={(e) => handleNumericInput(e, setVehicleNumber)}
              placeholder="1355"
              required
            />
          </div>
          {fieldErrors.stateCode && <p className="error-text">{fieldErrors.stateCode}</p>}
          {fieldErrors.regionalCode && <p className="error-text">{fieldErrors.regionalCode}</p>}
          {fieldErrors.vehicleNumber && <p className="error-text">{fieldErrors.vehicleNumber}</p>}
        </div>

        <div className="form-group">
          <label>Vehicle Brand: *</label>
          <input
            type="text"
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Vehicle Model: *</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Customer Name: *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Customer Number: *</label>
          <input
            type="tel"
            maxLength="10"
            value={customerNumber}
            onChange={(e) => handleNumericInput(e, setCustomerNumber)}
            required
          />
        </div>

        <div className="form-group">
        <button type="button" className="copy-button" onClick={copyCustomerNumber}>
              Same calling Number
            </button>
          <label>Calling Number:</label>
          <div className="calling-number-container">
            <input
              type="tel"
              maxLength="10"
              value={callingNumber}
              onChange={(e) => handleNumericInput(e, setCallingNumber)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {fieldErrors.email && <p className="error-text">{fieldErrors.email}</p>}
        </div>

        <div className="form-group">
          <label>Fuel Type: *</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <div className="form-group">
          <label>Remarks: *</label>
          <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} required />
        </div>

        <button type="submit" className="submit-button">
          Save and Create Job Card
        </button>
      </form>
    </div>
  );
};

export default VehiclePage;
