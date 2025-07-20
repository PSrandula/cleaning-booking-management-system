import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BookingCard from "../components/BookingCard";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);

        const response = await fetch('http://localhost:5000/api/bookings', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();

        // If redirected with newBooking state (from add booking page)
        const newBooking = location.state?.newBooking;
        if (newBooking && !data.find(b => b._id === newBooking._id)) {
          setBookings([newBooking, ...data]);
        } else {
          setBookings(data);
}

      } catch (err) {
        setError("Failed to load bookings. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [location.state]);

  const handleEdit = (booking) => {
    navigate(`/edit/${booking._id}`, { state: { booking } });
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) throw new Error("Failed to delete booking");

        setBookings(bookings.filter(b => b._id !== bookingId));
      } catch (err) {
        console.error("Failed to delete booking:", err);
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-dark via-primary-dark to-primary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 min-h-screen">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-dark to-primary text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cleaning Bookings</h2>
          <button
            onClick={() => navigate("/add")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark transition"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Booking
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white/10 border border-white/20 p-8 rounded-lg shadow-sm text-center">
            <svg className="mx-auto h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-lg font-medium">No bookings yet</h3>
            <p className="mt-1 text-white/80">Get started by creating a new booking.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/add")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
