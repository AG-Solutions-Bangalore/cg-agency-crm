import React, { useEffect, useState } from "react";
import Layout from '../../layout/Layout'
import BASE_URL from '../../base/BaseUrl';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const OutstandingReport = () => {
    // const today = new Date();
    // const dd = String(today.getDate()).padStart(2, "0");
    // const mm = String(today.getMonth() + 1).padStart(2, "0");
    // const yyyy = today.getFullYear();
    // const todayback = yyyy + "-" + mm + "-" + dd;
    // Calculate the last day of the current month
    // const lastDayOfMonth = new Date(yyyy, today.getMonth() + 1, 0);
    // const lastDay = String(lastDayOfMonth.getDate()).padStart(2, "0");
    // const lastDayBack = `${yyyy}-${mm}-${lastDay}`;
    const getInitialDates = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const lastDay = String(new Date(yyyy, today.getMonth() + 1, 0).getDate()).padStart(2, "0");
        
        return {
            todayFormatted: `${yyyy}-${mm}-${dd}`,
            lastDayFormatted: `${yyyy}-${mm}-${lastDay}`
        };
    };
 
    const { todayFormatted, lastDayFormatted } = getInitialDates();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false)
    const [report, setReport] = useState({
      from_date: todayFormatted,
      to_date: lastDayFormatted,
      billing_to_id: "",
      billing_from_id: "",
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
     
     
      setReport((prev) => ({ ...prev, [name]: value }));
    
    };
  
    // const handleSupplierOutstanding = () => {
     
    //     localStorage.setItem("from_date", report.from_date);
    //     localStorage.setItem("to_date", report.to_date);
    //     localStorage.setItem("billing_to_id", report.billing_to_id);
    //     localStorage.setItem("billing_from_id", report.billing_from_id);
    //     navigate("/supplier-outstanding-report");
     
    // };
    // const handleBuyerOutstanding = () => {
     
    //     localStorage.setItem("from_date", report.from_date);
    //     localStorage.setItem("to_date", report.to_date);
    //     localStorage.setItem("billing_to_id", report.billing_to_id);
    //     localStorage.setItem("billing_from_id", report.billing_from_id);
    //     navigate("/buyer-outstanding-report");
     
    // };
    // const handleMonthWiseSupplierOutstaning = () => {
     
    //     localStorage.setItem("from_date", report.from_date);
    //     localStorage.setItem("to_date", report.to_date);
    //     localStorage.setItem("billing_to_id", report.billing_to_id);
    //     localStorage.setItem("billing_from_id", report.billing_from_id);
    //     navigate("/monthwise-supplier-outstanding-report");
     
    // };
    // const handleMonthWiseBuyerOutstanding = () => {
     
    //     localStorage.setItem("from_date", report.from_date);
    //     localStorage.setItem("to_date", report.to_date);
    //     localStorage.setItem("billing_to_id", report.billing_to_id);
    //     localStorage.setItem("billing_from_id", report.billing_from_id);
    //     navigate("/monthwise-buyer-outstanding-report");
     
    // };
    const handleNavigation = (path) => {
        // Save report data to localStorage
        Object.entries(report).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
        navigate(path);
    };
    const inputClasses = {
        select: "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500",
        input: "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500",
        button: "text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <h1 className="border-b-2 font-[400] border-dashed border-orange-800 text-center md:text-left">
            Reports
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
                value={report.from_date}
                onChange={(e) => handleInputChange(e)}
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
                value={report.to_date}
                onChange={(e) => handleInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Supplier  */}
            <div>
              <FormLabel>Supplier</FormLabel>
              <select
                name="billing_from_id"
                value={report.billing_from_id}
                onChange={(e) => handleInputChange(e)}
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
                name="billing_to_id"
                value={report.billing_to_id}
                onChange={(e) => handleInputChange(e)}
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
          {/* <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="button"
              onClick={() => handleSupplierOutstanding()}
              className="text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              Supplier Outstanding
            </button>
            <button
              type="button"
              onClick={() => handleBuyerOutstanding()}
              className="text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              Buyer Outstanding
            </button>
            <button
              type="button"
              onClick={() => handleMonthWiseSupplierOutstaning()}
              className="text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              Monthwise Supplier Outstanding
            </button>
            <button
              type="button"
              onClick={() => handleMonthWiseBuyerOutstanding()}
              className="text-sm font-[400] text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              Monthwise Buyer Outstanding
            </button>
          </div> */}
             {/* Action Buttons */}
             <div className="flex flex-wrap gap-4 justify-start">
                        {[
                            { text: 'Supplier Outstanding', path: '/supplier-outstanding-report' },
                            { text: 'Buyer Outstanding', path: '/buyer-outstanding-report' },
                            { text: 'Monthwise Supplier Outstanding', path: '/monthwise-supplier-outstanding-report' },
                            { text: 'Monthwise Buyer Outstanding', path: '/monthwise-buyer-outstanding-report' }
                        ].map((button) => (
                            <button
                                key={button.text}
                                type="button"
                                onClick={() => handleNavigation(button.path)}
                                className={inputClasses.button}
                                disabled={isLoading}
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>
        </form>
      </div>
    </Layout>
  )
}

export default OutstandingReport