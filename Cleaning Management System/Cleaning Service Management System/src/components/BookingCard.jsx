import React from "react";
import { format } from "date-fns";

function BookingCard({ booking, onEdit, onDelete }) {
  const formatServiceName = (service) => {
    return service.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-dark border border-gray-800 p-6 rounded-xl shadow-md border-l-4 border-accent hover:shadow-xl transition-shadow duration-300 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-accent-light">{formatServiceName(booking.service)}</h3>
          <p className="mt-2 text-light">
            <span className="font-semibold">Customer:</span> {booking.customer_name}
          </p>
          <p className="text-light">
            <span className="font-semibold">Address:</span> {booking.address}
          </p>
          <p className="text-light">
            <span className="font-semibold">Date & Time:</span>{" "}
            {format(new Date(booking.date_time), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(booking)}
            className="text-primary hover:text-primary-dark transition"
            aria-label="Edit booking"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(booking._id)}
            className="text-red-500 hover:text-red-700 transition"
            aria-label="Delete booking"
          >
            🗑️
          </button>
        </div>
      </div>

      {booking.status && (
        <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
          booking.status === 'completed' ? 'bg-green-600/10 text-green-400' :
          booking.status === 'pending' ? 'bg-yellow-600/10 text-yellow-300' :
          'bg-light text-dark'
        }`}>
          {booking.status}
        </span>
      )}

      {booking.notes && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <p className="text-sm text-light/80">
            <span className="font-medium">Notes:</span> {booking.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingCard;
