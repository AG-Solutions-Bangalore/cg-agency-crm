import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import { ContextPanel } from "../../context/ContextPanel";

const CreateBilling = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const navigate = useNavigate();
  const { currentYear } = useContext(ContextPanel);
  const [billing, setBilling] = useState({
    billing_date: todayback,
    billing_year: "",
    billing_no: "",
    billing_from_id: "",
    billing_to_id: "",
    billing_total_amount: "0",
    billing_tax: "0",
    billing_price: "0",
    billing_discount: "0",
    billing_other: "0",
    billing_remakrs: "",
  });
  const [isButtonDisableds, setIsButtonDisableds] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const fetchVendor = async () => {
    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-vendor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVendor(response.data?.vendor);
    } catch (error) {
      console.error("Error fetching  vendor  data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };
  const fetchBuyer = async () => {
    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-buyer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBuyer(response.data?.buyer);
    } catch (error) {
      console.error("Error fetching  buyer  data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchVendor();
    fetchBuyer();
  }, []);
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  //   const onInputChange = (e) => {
  //     const { name, value } = e.target;
  //     if (name == "billing_total_amount" || name == "billing_tax") {
  //       if (validateOnlyDigits(e.target.value)) {
  //         setBilling({
  //           ...billing,
  //           [e.target.name]: e.target.value,
  //         });
  //       }
  //     } else if (e.target.name == "billing_tax") {
  //       if (validateOnlyDigits(e.target.value)) {
  //         setBilling({
  //           ...billing,
  //           [e.target.name]: e.target.value,
  //         });
  //       }
  //     } else if (e.target.name == "billing_price") {
  //       if (validateOnlyDigits(e.target.value)) {
  //         setBilling({
  //           ...billing,
  //           [e.target.name]: e.target.value,
  //         });
  //       }
  //     } else if (e.target.name == "billing_discount") {
  //       if (validateOnlyDigits(e.target.value)) {
  //         setBilling({
  //           ...billing,
  //           [e.target.name]: e.target.value,
  //         });
  //       }
  //     } else if (e.target.name == "billing_other") {
  //       if (validateOnlyDigits(e.target.value)) {
  //         setBilling({
  //           ...billing,
  //           [e.target.name]: e.target.value,
  //         });
  //       }
  //     } else {
  //       setBilling({
  //         ...billing,
  //         [e.target.name]: e.target.value,
  //       });
  //     }
  //   };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    const updatedBilling = { ...billing, [name]: value };

    if (name == "billing_total_amount" || name == "billing_tax") {
      if (validateOnlyDigits(value)) {
        setBilling(updatedBilling);

        const totalAmount = parseFloat(
          updatedBilling.billing_total_amount || 0
        );
        const taxAmount = parseFloat(updatedBilling.billing_tax || 0);
        updatedBilling.billing_price = (totalAmount - taxAmount);
        setBilling({
          ...updatedBilling,
          billing_price: updatedBilling.billing_price,
        });
      }
    } else if (name == "billing_price") {
      if (validateOnlyDigits(value)) {
        setBilling({
          ...billing,
          [name]: value,
        });
      }
    } else if (name == "billing_discount") {
      if (validateOnlyDigits(value)) {
        setBilling({
          ...billing,
          [name]: value,
        });
      }
    } else if (name == "billing_other") {
      if (validateOnlyDigits(value)) {
        setBilling({
          ...billing,
          [name]: value,
        });
      }
    } else {
      setBilling({
        ...billing,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      setIsButtonDisableds(false);

      return;
    }
    const data = {
      billing_date: billing.billing_date,
      billing_year: currentYear,
      billing_no: billing.billing_no,
      billing_from_id: billing.billing_from_id,
      billing_to_id: billing.billing_to_id,
      billing_total_amount: billing.billing_total_amount,
      billing_tax: billing.billing_tax,
      billing_price: billing.billing_price,
      billing_discount: billing.billing_discount,
      billing_other: billing.billing_other,
      billing_remakrs: billing.billing_remakrs,
    };

    setIsButtonDisableds(true);
 
    axios({
      url: BASE_URL + "/api/panel-create-billing",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      toast.success("Billing Created Sucessfully");

      navigate("/billing-list");
      setBilling({
        billing_date: "",
        billing_year: "",
        billing_no: "",
        billing_from_id: "",
        billing_to_id: "",
        billing_total_amount: "",
        billing_tax: "",
        billing_discount: "",
        billing_other: "",
        billing_remakrs: "",
      });
    });
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
      <div className=" bg-[#FFFFFF] p-2  rounded-lg  ">
        <div className="sticky top-0 p-2  mb-4 border-b-2 border-red-500 rounded-lg  bg-[#E1F5FA] ">
          <h2 className=" px-5 text-[black] text-lg   flex flex-row  justify-between items-center  rounded-xl p-2 ">
            <div className="flex  items-center gap-2">
              <IconInfoCircle className="w-4 h-4" />
              <span>Add Billing </span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/billing-list")}
              className="cursor-pointer hover:text-red-600"
            />
          </h2>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="w-full max-w-7xl  rounded-lg mx-auto p-4 space-y-6 "
        >
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-4   gap-6">
            {/* Supplier  */}
            <div>
              <FormLabel required>Supplier</FormLabel>
              <select
                name="billing_from_id"
                value={billing.billing_from_id}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Supplier </option>
                {vendor.map((option) => (
                  <option
                    key={option.vendor_company}
                    value={option.id}
                  >
                    {option.vendor_company}
                  </option>
                ))}
              </select>
            </div>
            {/* Buyer  */}
            <div>
              <FormLabel required>Buyer</FormLabel>
              <select
                name="billing_to_id"
                value={billing.billing_to_id}
                onChange={(e) => onInputChange(e)}
                required
                className={inputClassSelect}
              >
                <option value="">Select Buyer </option>
                {buyer.map((option) => (
                  <option
                    key={option.buyer_company}
                    value={option.id}
                  >
                    {option.buyer_company}
                  </option>
                ))}
              </select>
            </div>
            {/* billing no  */}
            <div>
              <FormLabel required>Billing No</FormLabel>
              <input
                type="text"
                name="billing_no"
                required
                value={billing.billing_no}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* billing yEAR  */}
            <div>
              <FormLabel required>Billing Year</FormLabel>
              <input
                type="text"
                name="billing_year"
                required
                value={currentYear}
                onChange={(e) => onInputChange(e)}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
                disabled
              />
            </div>
            {/* Billing date  */}
            <div>
              <FormLabel required>Billing Date</FormLabel>
              <input
                type="date"
                required
                name="billing_date"
                value={billing.billing_date}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Total Amount  */}
            <div>
              <FormLabel required>Total Amount</FormLabel>
              <input
                required
                type="tel"
                name="billing_total_amount"
                value={billing.billing_total_amount}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Tax Value */}
            <div>
              <FormLabel >Tax Value</FormLabel>
              <input
                
                type="tel"
                name="billing_tax"
                value={billing.billing_tax}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Base Value */}
            <div>
              <FormLabel required>Base Value</FormLabel>
              <input
                required
                type="tel"
                name="billing_price"
                value={billing.billing_price}
               
                   className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
                readOnly
              />
            </div>
            {/* Discount Value */}
            <div>
              <FormLabel >Discount Value</FormLabel>
              <input
                
                type="tel"
                name="billing_discount"
                value={billing.billing_discount}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
            {/* Other Value*/}
            <div>
              <FormLabel >Other Value</FormLabel>
              <input
                
                type="tel"
                name="billing_other"
                value={billing.billing_other}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/* Remark  */}
            <div className="col-span-0 lg:col-span-2">
              <FormLabel >Remark</FormLabel>
              <textarea
                type="text"
                name="billing_remakrs"
                value={billing.billing_remakrs}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="submit"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisableds}
            >
              {isButtonDisableds ? "Sumbitting..." : "Sumbit"}
            </button>

            <button
              type="button"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md"
              onClick={() => {
                navigate("/billing-list");
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateBilling;
