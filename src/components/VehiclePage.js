import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is useNavigate

const VehiclePage = ({ setJobCard }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [callingNumber, setCallingNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // This should be useNavigate, not useHistory

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate and save the job card
    if (!vehicleNumber || !vehicleBrand || !vehicleModel || !customerName || !customerNumber || !fuelType) {
      setError('Please fill in all required fields.');
      return;
    }

    const jobCard = {
      vehicleNumber,
      vehicleBrand,
      vehicleModel,
      customerName,
      customerNumber,
      callingNumber,
      address,
      email,
      fuelType,
    };

    setJobCard(jobCard);

    // Navigate to billing page
    navigate('/billing');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Vehicle Information</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Number: *</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vehicle Brand: *</label>
          <input
            type="text"
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vehicle Model: *</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Customer Name: *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Customer Number: *</label>
          <input
            type="text"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Calling Number:</label>
          <input
            type="text"
            value={callingNumber}
            onChange={(e) => setCallingNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Fuel Type: *</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} required>
            <option value="">Select Fuel Type</option>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <button type="submit">Save and Create Job Card</button>
      </form>
    </div>
  );
};

export default VehiclePage;
