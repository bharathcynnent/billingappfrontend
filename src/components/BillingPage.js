import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BillingPage = ({ jobCard }) => {
  const navigate = useNavigate();

  const [invoiceDate, setInvoiceDate] = useState('');
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);

  // Redirect to VehiclePage if jobCard is null
  if (!jobCard) {
    navigate('/');
    return null;
  }

  // Handlers for adding and updating services
  const handleServiceChange = (index, field, value) => {
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : service
    );
    setServices(updatedServices);
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
      const imgProps = pdf.getImageProperties(canvas);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${jobCard.vehicleNumber}_${invoiceDate}.pdf`);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Billing Information</h2>

      {/* Display all job card details for verification */}
      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}
      >
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
            <td><strong>Fuel Type:</strong></td>
            <td>{jobCard.fuelType}</td>
          </tr>
          <tr>
            <td><strong>Customer Name:</strong></td>
            <td>{jobCard.customerName}</td>
          </tr>
          <tr>
            <td><strong>Customer Number:</strong></td>
            <td>{jobCard.customerNumber}</td>
          </tr>
          <tr>
            <td><strong>Calling Number:</strong></td>
            <td>{jobCard.callingNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{jobCard.address || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{jobCard.email || 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      {/* Service and billing form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label><strong>Invoice Date:</strong></label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            required
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button type="button" onClick={handleAddService} style={{ padding: '10px 20px' }}>
            Add Service
          </button>
        </div>

        {services.map((service, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
              required
              style={{ flex: '2', padding: '5px', marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={service.amount}
              onChange={(e) => handleServiceChange(index, 'amount', e.target.value)}
              required
              style={{ flex: '1', padding: '5px' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '20px' }}>
          <label><strong>Total Amount:</strong></label>
          <input
            type="number"
            value={totalAmount}
            readOnly
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        <div>
          <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
            Calculate Total
          </button>
          <button
            type="button"
            onClick={handleGenerateBill}
            disabled={services.length === 0 || !invoiceDate}
            style={{ padding: '10px 20px', marginRight: '10px' }}
          >
            Generate Invoice
          </button>
          {showInvoice && (
            <button type="button" onClick={handleDownloadInvoice} style={{ padding: '10px 20px' }}>
              Download Invoice
            </button>
          )}
        </div>
      </form>

      {/* Invoice display */}
      {showInvoice && (
        <div
          id="invoice"
          style={{
            marginTop: '40px',
            padding: '20px',
            border: '2px solid #000',
            maxWidth: '800px',
            margin: '40px auto',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>Ganesh Motor Works</h2>
            <p>Phone: 9360652355</p>
            <p>Date: {new Date(invoiceDate).toLocaleDateString()}</p>
          </div>

          <hr />

          <div style={{ marginBottom: '20px' }}>
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {jobCard.customerName}</p>
            <p><strong>Phone:</strong> {jobCard.customerNumber}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>Vehicle Information</h3>
            <p><strong>Vehicle Number:</strong> {jobCard.vehicleNumber}</p>
            <p><strong>Brand:</strong> {jobCard.vehicleBrand}</p>
            <p><strong>Model:</strong> {jobCard.vehicleModel}</p>
            <p><strong>Fuel Type:</strong> {jobCard.fuelType}</p>
          </div>

          <div>
            <h3>Services Provided</h3>
            <table
              border="1"
              cellPadding="5"
              cellSpacing="0"
              style={{ width: '100%', borderCollapse: 'collapse' }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Service Name</th>
                  <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td style={{ textAlign: 'right' }}>{service.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td style={{ textAlign: 'right' }}><strong>₹{totalAmount.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p>Thank you for choosing Ganesh Motor Works!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
