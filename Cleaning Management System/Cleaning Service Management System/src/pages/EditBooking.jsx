import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingForm from "../components/BookingForm";

function EditBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate("/dashboard", { replace: true });
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${booking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update booking');
      
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update booking. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <button
          onClick={handleCancel}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Edit Booking</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <BookingForm 
          initialData={booking} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
}

export default EditBooking;
