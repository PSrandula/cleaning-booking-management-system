import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";

const serviceOptions = [
  { value: "deep_cleaning", label: "Deep Cleaning" },
  { value: "carpet_cleaning", label: "Carpet Cleaning" },
  { value: "bathroom_cleaning", label: "Bathroom Cleaning" },
  { value: "window_cleaning", label: "Window Cleaning" },
  { value: "office_cleaning", label: "Office Cleaning" },
];

function BookingForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    date_time: "",
    service: "",
    notes: "",
    status: initialData?.status || "pending",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        customer_name: initialData.customer_name || "",
        address: initialData.address || "",
        date_time: initialData.date_time || "",
        service: initialData.service || "",
        notes: initialData.notes || "",
        status: initialData.status || "pending",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.customer_name.trim()) newErrors.customer_name = "Customer name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.date_time) newErrors.date_time = "Date and time is required";
    else if (new Date(form.date_time) < new Date()) newErrors.date_time = "Date must be in the future";
    if (!form.service) newErrors.service = "Please select a service";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      alert("Submission failed, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDateTime = format(addDays(new Date(), 0), "yyyy-MM-dd'T'HH:mm");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 to-purple-700">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-lg backdrop-blur-lg bg-white/10 rounded-xl shadow-2xl border border-white/20 p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {initialData ? "Edit Booking" : "New Booking"}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="customer_name" className="block text-sm font-medium text-white/90 mb-1">
              Customer Name <span className="text-red-400">*</span>
            </label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              placeholder="Customer full name"
              value={form.customer_name}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 border ${
                errors.customer_name ? "border-red-400" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent`}
            />
            {errors.customer_name && <p className="text-red-300 text-sm mt-1">{errors.customer_name}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-white/90 mb-1">
              Address <span className="text-red-400">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Cleaning address"
              value={form.address}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 border ${
                errors.address ? "border-red-400" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent`}
            />
            {errors.address && <p className="text-red-300 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="date_time" className="block text-sm font-medium text-white/90 mb-1">
              Date and Time <span className="text-red-400">*</span>
            </label>
            <input
              id="date_time"
              name="date_time"
              type="datetime-local"
              min={minDateTime}
              value={form.date_time}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white border ${
                errors.date_time ? "border-red-400" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent`}
            />
            {errors.date_time && <p className="text-red-300 text-sm mt-1">{errors.date_time}</p>}
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-white/90 mb-1">
              Service <span className="text-red-400">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white border ${
                errors.service ? "border-red-400" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent`}
            >
              <option value="" className="text-purple-900">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-purple-900">
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-300 text-sm mt-1">{errors.service}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-white/90 mb-1">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Additional information"
              value={form.notes}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            />
          </div>

          {initialData && (
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-white/90 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              >
                <option value="pending" className="text-purple-900">Pending</option>
                <option value="completed" className="text-purple-900">Completed</option>
                <option value="cancelled" className="text-purple-900">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-lg border border-white/30 text-white hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-white text-purple-800 font-medium hover:bg-purple-100 disabled:opacity-70 transition-all shadow-md"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Save Booking"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;