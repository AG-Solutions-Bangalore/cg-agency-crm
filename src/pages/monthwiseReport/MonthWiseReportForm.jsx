import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const MonthWiseReportForm = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  // Calculate the last day of the current month
  const lastDayOfMonth = new Date(yyyy, today.getMonth() + 1, 0);
  const lastDay = String(lastDayOfMonth.getDate()).padStart(2, "0");
  const lastDayBack = `${yyyy}-${mm}-${lastDay}`;
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    from_date: todayback,
    to_date: lastDayBack,
    payment_to_id: "",
    payment_from_id: "",
  });
  const [invoice, setInvoice] = useState({
    from_date: todayback,
    to_date: lastDayBack,
    invoice_to_id: "",
    invoice_from_id: "",
  });
  const [vendor, setVendor] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fetchVendor = async () => {
    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-vendor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendor(response.data?.vendor || []);
    } catch (error) {
      console.error("Error fetching vendor data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const fetchBuyer = async () => {
    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-buyer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuyer(response.data?.buyer || []);
    } catch (error) {
      console.error("Error fetching buyer data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchVendor();
    fetchBuyer();
  }, []);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "payment") {
      setPayment((prev) => ({ ...prev, [name]: value }));
    } else if (type === "invoice") {
      setInvoice((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReportNavigation = (type) => {
    if (type === "payment") {
      localStorage.setItem("from_date", payment.from_date);
      localStorage.setItem("to_date", payment.to_date);
      localStorage.setItem("payment_to_id", payment.payment_to_id);
      localStorage.setItem("payment_from_id", payment.payment_from_id);
      navigate("/monthwise-payment-report");
    } else if (type === "invoice") {
      localStorage.setItem("from_date", payment.from_date);
      localStorage.setItem("to_date", payment.to_date);
      localStorage.setItem("invoice_to_id", payment.payment_to_id);
      localStorage.setItem("invoice_from_id", payment.payment_from_id);
      navigate("/monthwise-invoice-report");
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
  const inputClassSelect =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500";
  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500";
  return (
    <Layout>
      {" "}
      <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <h1 className="border-b-2 font-[400] border-dashed border-orange-800 text-center md:text-left">
            Monthwise Report
          </h1>
        </div>
      </div>
      <div className=" bg-white rounded-lg shadow-md">
        <form
          id="addIndiv"
          className="w-full max-w-7xl  rounded-lg mx-auto p-4 space-y-6 "
        >
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-4   gap-6">
            {/* From Date  */}
            <div>
              <FormLabel required>From Date</FormLabel>
              <input
                type="date"
                required
                name="from_date"
                value={payment.from_date}
                onChange={(e) => handleInputChange(e, "payment")}
                className={inputClass}
              />
            </div>
            {/* To Date  */}
            <div>
              <FormLabel required>To Date</FormLabel>
              <input
                type="date"
                required
                name="to_date"
                value={payment.to_date}
                onChange={(e) => handleInputChange(e, "payment")}
                className={inputClass}
              />
            </div>
            {/* Supplier  */}
            <div>
              <FormLabel>Supplier</FormLabel>
              <select
                name="payment_from_id"
                value={payment.payment_from_id}
                onChange={(e) => handleInputChange(e, "payment")}
                className={inputClassSelect}
              >
                <option value="">Select Supplier </option>
                {vendor.map((option) => (
                  <option key={option.vendor_company} value={option.id}>
                    {option.vendor_company}
                  </option>
                ))}
              </select>
            </div>
            {/* Buyer  */}
            <div>
              <FormLabel>Buyer</FormLabel>
              <select
                name="payment_to_id"
                value={payment.payment_to_id}
                onChange={(e) => handleInputChange(e, "payment")}
                className={inputClassSelect}
              >
                <option value="">Select Buyer </option>
                {buyer.map((option) => (
                  <option key={option.buyer_company} value={option.id}>
                    {option.buyer_company}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="button"
              onClick={() => handleReportNavigation("payment")}
              className="text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              Monthwise Payment
            </button>
            <button
              type="button"
              onClick={() => handleReportNavigation("invoice")}
              className="text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              Monthwise Invoice
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default MonthWiseReportForm;
