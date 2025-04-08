import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './vehiclepage.css';
const vehicleBrandsList = [
  "Yamaha", 
  "Honda", 
  "Hero", 
  "TVS", 
  "Suzuki", 
  "Royal Enfield",
  "Bajaj",
  "KTM",
  "Mahindra",
  "BMW",
];

const vehicleModelsList = {
  Yamaha: ["FZ", "R15", "MT 15", "Fascino", "Ray ZR"],
  Honda: ["Unicorn", "CB Shine", "Activa", "Hornet", "Dio"],
  Hero: ["Splendor", "Glamour", "HF Deluxe", "Xtreme", "Pleasure"],
  TVS: ["Apache", "Jupiter", "Ntorq", "Radeon", "XL 100"],
  Suzuki: ["Access", "Gixxer", "Burgman", "Avenis", "Hayate"],
  "Royal Enfield": ["Classic 350", "Hunter", "Bullet", "Meteor 350", "Himalayan"],
  Bajaj: ["Pulsar", "Avenger", "Platina", "CT 100", "Dominar"],
  KTM: ["Duke 200", "RC 200", "Duke 390", "RC 390", "Adventure 250"],
  Mahindra: ["Gusto", "Centuro", "Mojo"],
  BMW: ["G 310 R", "G 310 GS", "S 1000 RR"],
};

const VehiclePage = ({ setJobCard }) => {
  const [stateCode, setStateCode] = useState("");
  const [stateCodeNumber, setstateCodeNumber] = useState("");
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
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);

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
    if (!stateCodeNumber.match(/^\d{2}$/)) {
      errors.stateCodeNumber = "State code Number should be 2 digits (e.g., 19).";
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
      vehicleNumber: `${stateCode} ${stateCodeNumber} ${regionalCode} ${vehicleNumber}`,
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
              value={stateCodeNumber}
              onChange={(e) => handleNumericInput(e, setstateCodeNumber)}
              placeholder="19"
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
          {fieldErrors.stateCodeNumber && <p className="error-text">{fieldErrors.stateCodeNumber}</p>}
          {fieldErrors.regionalCode && <p className="error-text">{fieldErrors.regionalCode}</p>}
          {fieldErrors.vehicleNumber && <p className="error-text">{fieldErrors.vehicleNumber}</p>}
        </div>
        <div className="form-group">
  <label>Vehicle Brand: *</label>
  <input
    type="text"
    value={vehicleBrand}
    onChange={(e) => {
      const value = e.target.value;
      setVehicleBrand(value);
      const filtered = vehicleBrandsList.filter((brand) =>
        brand.toLowerCase().startsWith(value.toLowerCase())
      );
      setBrandSuggestions(filtered);
    }}
    placeholder="Yamaha"
    required
    autoComplete="off"
  />
  {brandSuggestions.length > 0 && (
    <ul className="suggestions-list">
      {brandSuggestions.map((brand, idx) => (
        <li
          key={idx}
          onClick={() => {
            setVehicleBrand(brand);
            setBrandSuggestions([]);
            setVehicleModel(""); // Clear model when brand changes
          }}
        >
          {brand}
        </li>
      ))}
    </ul>
  )}
</div>

<div className="form-group">
  <label>Vehicle Model: *</label>
  <input
    type="text"
    value={vehicleModel}
    onChange={(e) => {
      const value = e.target.value;
      setVehicleModel(value);
      const models = vehicleModelsList[vehicleBrand] || [];
      const filtered = models.filter((model) =>
        model.toLowerCase().startsWith(value.toLowerCase())
      );
      setModelSuggestions(filtered);
    }}
    placeholder="MT 15"
    required
    autoComplete="off"
  />
  {modelSuggestions.length > 0 && (
    <ul className="suggestions-list">
      {modelSuggestions.map((model, idx) => (
        <li
          key={idx}
          onClick={() => {
            setVehicleModel(model);
            setModelSuggestions([]);
          }}
        >
          {model}
        </li>
      ))}
    </ul>
  )}
</div>

        <div className="form-group">
          <label>Customer Name: *</label>
          <input
            type="text"
            value={customerName}
            placeholder="santhosh"
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Customer Number: *</label>
          <input
            type="tel"
            maxLength="10"
            placeholder="9876543210"
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
              placeholder="9876543210"
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
          <input type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <textarea value={remarks} placeholder="engine oil, break pad, etc..." onChange={(e) => setRemarks(e.target.value)} required />
        </div>

        <button type="submit" className="submit-button">
          Save and Create Job Card
        </button>
      </form>
    </div>
  );
};

export default VehiclePage;
