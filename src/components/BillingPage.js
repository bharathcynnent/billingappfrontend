import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BillingPage = ({ jobCard }) => {
  const navigate = useNavigate();

  const [invoiceDate, setInvoiceDate] = useState('');
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);

  // If jobCard is null, redirect to the VehiclePage
  if (!jobCard) {
    navigate('/');
    return null;
  }

  const handleServiceNameChange = (index, e) => {
    const newServices = [...services];
    newServices[index].name = e.target.value;
    setServices(newServices);
  };

  const handleServiceAmountChange = (index, e) => {
    const newServices = [...services];
    newServices[index].amount = parseFloat(e.target.value) || 0;
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { name: '', amount: 0 }]);
  };

  const calculateTotalAmount = () => {
    const total = services.reduce((sum, service) => sum + service.amount, 0);
    setTotalAmount(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTotalAmount();
  };

  const handleGenerateBill = () => {
    calculateTotalAmount();
    setShowInvoice(true);
  };

  const handleDownloadInvoice = () => {
    const invoice = document.getElementById('invoice');
    html2canvas(invoice).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Billing Information</h2>

      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
        <tbody>
          <tr>
            <td><strong>Vehicle Number:</strong></td>
            <td>{jobCard.vehicleNumber}</td>
          </tr>
          <tr>
            <td><strong>Vehicle Brand:</strong></td>
            <td>{jobCard.vehicleBrand}</td>
          </tr>
          <tr>
            <td><strong>Vehicle Model:</strong></td>
            <td>{jobCard.vehicleModel}</td>
          </tr>
          <tr>
            <td><strong>Customer Name:</strong></td>
            <td>{jobCard.customerName}</td>
          </tr>
          <tr>
            <td><strong>Customer Number:</strong></td>
            <td>{jobCard.customerNumber}</td>
          </tr>
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice Date:</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={handleAddService}>
            Add Service
          </button>
        </div>

        {services.map((service, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceNameChange(index, e)}
              required
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={service.amount}
              onChange={(e) => handleServiceAmountChange(index, e)}
              required
            />
          </div>
        ))}

        <div style={{ marginTop: '20px' }}>
          <label>Total Amount:</label>
          <input
            type="number"
            value={totalAmount}
            readOnly
          />
        </div>

        <button type="submit" style={{ marginTop: '20px', marginRight: '10px' }}>Submit</button>
        <button type="button" style={{ marginTop: '20px', marginRight: '10px' }} onClick={handleGenerateBill}>
          Generate Bill
        </button>
        {showInvoice && (
          <button type="button" style={{ marginTop: '20px' }} onClick={handleDownloadInvoice}>
            Download Invoice
          </button>
        )}
      </form>

      {showInvoice && (
        <div id="invoice" style={{ marginTop: '40px', border: '1px solid #000', padding: '20px' }}>
          <h2 style={{ textAlign: 'center' }}>Ganesh Motor Works</h2>
          <p style={{ textAlign: 'center' }}>Phone: 9360652355</p>
          <hr />
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {jobCard.customerName}</p>
          <p><strong>Phone:</strong> {jobCard.customerNumber}</p>
          <h3>Vehicle Info</h3>
          <p><strong>Vehicle Number:</strong> {jobCard.vehicleNumber}</p>
          <p><strong>Brand:</strong> {jobCard.vehicleBrand}</p>
          <p><strong>Model:</strong> {jobCard.vehicleModel}</p>
          <h3>Services</h3>
          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.amount}</td>
                </tr>
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>{totalAmount}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
