import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Invoice.css';

const BillingPage = ({ jobCard }) => {
  const navigate = useNavigate();

  const [invoiceDate, setInvoiceDate] = useState('');
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);

  if (!jobCard) {
    navigate('/');
    return null;
  }

  const handleServiceChange = (index, field, value) => {
    const updatedServices = services.map((service, i) =>
      i === index
        ? {
            ...service,
            [field]: field === 'amount' || field === 'quantity' ? parseFloat(value) || 0 : value,
          }
        : service
    );
    setServices(updatedServices);
  };
  
  const handleAddService = () => {
    setServices([...services, { name: '', amount: 0, quantity: 1 }]); // Default quantity to 1
  };
  
  const calculateTotalAmount = () => {
    const total = services.reduce((sum, service) => sum + service.amount * service.quantity, 0);
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

  // const handleDownloadInvoice = () => {
  //   const invoice = document.getElementById('invoice');
  //   const button = invoice.querySelector('button');
  //   if (button) button.style.display = 'none';
  //   html2canvas(invoice).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(canvas);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save(`Invoice_${jobCard.customerName}_${jobCard.vehicleNumber}_${invoiceDate}.pdf`);
  //     if (button) button.style.display = 'block';
  //   });
  // };

  
  const handleDownloadInvoice = () => {
    const invoice = document.getElementById("invoice");
    const button = invoice.querySelector("button");
  
    if (button) button.style.display = "none"; // Hide button before capture
  
    html2canvas(invoice, {
      backgroundColor: "#fff",
      scale: 2, // High resolution
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Get exact content height in mm for accurate PDF size
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Adjust height proportionally
  
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [imgWidth, imgHeight], // Set PDF size to match content
      });
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${jobCard.customerName}_${jobCard.vehicleNumber}_${invoiceDate}.pdf`);
  
      if (button) button.style.display = "block"; // Show button after capture
    });
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Billing Information</h2>
<table className="bike-table">
      <tbody>
        <tr className="header-row">
          <td><strong>Vehicle Number:</strong></td>
          <td>{jobCard.vehicleNumber}</td>
        </tr>
        <tr>
          <td><strong>Vehicle Brand:</strong></td>
          <td>{jobCard.vehicleBrand}</td>
        </tr>
        <tr className="alt-row">
          <td><strong>Vehicle Model:</strong></td>
          <td>{jobCard.vehicleModel}</td>
        </tr>
        <tr>
          <td><strong>Fuel Type:</strong></td>
          <td>{jobCard.fuelType}</td>
        </tr>
        <tr className="alt-row">
          <td><strong>Customer Name:</strong></td>
          <td>{jobCard.customerName}</td>
        </tr>
        <tr>
          <td><strong>Customer Number:</strong></td>
          <td>{jobCard.customerNumber}</td>
        </tr>
        <tr className="alt-row">
          <td><strong>Calling Number:</strong></td>
          <td>{jobCard.callingNumber || "N/A"}</td>
        </tr>
        <tr>
          <td><strong>Address:</strong></td>
          <td>{jobCard.address || "N/A"}</td>
        </tr>
        <tr className="alt-row">
          <td><strong>Email:</strong></td>
          <td>{jobCard.email || "N/A"}</td>
        </tr>
        <tr>
          <td><strong>Remarks:</strong></td>
          <td>{jobCard.remarks}</td>
        </tr>
      </tbody>
    </table>
     
<form onSubmit={handleSubmit} className="invoice-form">
      <div className="form-group">
        <label><strong>Invoice Date:</strong></label>
        <input
          type="date"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <button type="button" onClick={handleAddService} className="add-service-btn">
          Add Service
        </button>
      </div>

      {services.map((service, index) => (
        <div key={index} className="service-group">
          <label><strong>Service Name:</strong></label>
          <input
            type="text"
            value={service.name}
            onChange={(e) => handleServiceChange(index, "name", e.target.value)}
            required
          />

          <label><strong>Amount:</strong></label>
          <input
            type="number"
            value={service.amount}
            onChange={(e) => handleServiceChange(index, "amount", e.target.value)}
            required
          />

          <label><strong>Quantity:</strong></label>
          <input
            type="number"
            value={service.quantity}
            onChange={(e) => handleServiceChange(index, "quantity", e.target.value)}
            required
          />
        </div>
      ))}

      <button type="submit" className="submit-btn">
        Calculate Total
      </button>

      <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3>
    </form>

      <button onClick={handleGenerateBill} style={{ padding: '10px 20px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Generate Bill
      </button>
{showInvoice && (
  <div id="invoice">
    <div id="invoice-content">
      <h2>Ganesh Motor Works</h2>
      <h4>Phone: 9360652355</h4>
      <hr />
      <div>
        <div>
          <div>
            <strong>Work performed by:</strong> <p>Santhosh</p>
          </div>
          <h3 className='customerheading'>Customer Info</h3>
          <strong>Customer Name:</strong> {jobCard.customerName}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Customer Number:</strong> {jobCard.customerNumber}
        </div>
      </div>
      <div>
        <div>
          <strong>Invoice Date:</strong> {invoiceDate}
        </div>
        <h3 className='vehicleheading'>Vehicle Info</h3>
        <div>
          <strong>Vehicle Number:</strong> {jobCard.vehicleNumber}
        </div>
        <div>
          <strong>Vehicle Brand:</strong> {jobCard.vehicleBrand}
        </div>
        <div>
          <strong>Vehicle Model:</strong> {jobCard.vehicleModel}
        </div>
        <div>
          <strong>Fuel Type:</strong> {jobCard.fuelType}
        </div>
      </div>
      <div>
        <strong>Services:</strong>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Service Name</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{service.name}</td>
                <td>{service.quantity}</td>
                <td>{service.amount}</td>
                <td>{service.quantity * service.amount}</td>
              </tr>
            ))}
            <tr>
              <td><strong>Total Amount:</strong></td>
              <td><strong>₹{totalAmount}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button onClick={handleDownloadInvoice}>
      Download Invoice as PDF
    </button>
  </div>
)}
    </div>
  );
};

export default BillingPage;
