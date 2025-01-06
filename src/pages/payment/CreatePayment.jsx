import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import {
  IconArrowBack,
  IconInfoCircle,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ContextPanel } from "../../context/ContextPanel";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";
import { Button } from "@mantine/core";

const CreatePayment = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const navigate = useNavigate();
  const { currentYear } = useContext(ContextPanel);
  const [payment, setPayment] = useState({
    pay_date: todayback,
    pay_year: "",
    payment_from_id: "",
    payment_to_id: "",
    billing_to_id: "",
    pay_total: "",
    pay_reference: "",
    payment_bill_no: "",
    payment_amount: "",
    payment_data: "",
  });

  const [users, setUsers] = useState([
    {
      payment_bill_no: "",
      payment_amount: "",
    },
  ]);

  const [isButtonDisableds, setIsButtonDisableds] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [paymentBill, setPaymentBill] = useState([]);
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
  const fetchPaymentBills = async (buyerId, vendorId) => {
    if (!buyerId || !vendorId) return;

    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-payment-billingno/${vendorId}/${buyerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filteredBills = (response.data?.payment_billno || []).filter(
        (bill) => bill.billing_total_amount - bill.total_sum > 0
      );
      setPaymentBill(filteredBills);
    } catch (error) {
      console.error("Error fetching payment bills", error);
      toast.error("Error fetching bill numbers");
    } finally {
      setIsButtonDisabled(false);
    }
  };
  useEffect(() => {
    fetchVendor();
    fetchBuyer();
  }, []);
  const calculateTotalPaymentAmount = () => {
    return users.reduce((sum, user) => {
      return sum + (Number(user.payment_amount) || 0);
    }, 0);
  };
  useEffect(() => {
    if (payment.payment_from_id && payment.payment_to_id) {
      fetchPaymentBills(payment.payment_from_id, payment.payment_to_id);

      setUsers(
        users.map((user) => ({
          ...user,
          payment_bill_no: "",
          payment_amount: "",
        }))
      );
    }
  }, [payment.payment_from_id, payment.payment_to_id]);
  const addItem = () => {
    setUsers([...users, { payment_bill_no: "", payment_amount: "" }]);
  };

  const onChangeUser = (index, name, value) => {
    if (name == "payment_amount" && !validateOnlyDigits(value)) {
      return;
    }
    const updatedUsers = users.map((user, i) => {
      if (i === index) {
        return { ...user, [name]: value };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const removeUser = (index) => {
    if (users.length > 1) {
      const filteredUsers = users.filter((_, i) => i !== index);
      setUsers(filteredUsers);
    }
  };
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "pay_total") {
      if (validateOnlyDigits(e.target.value)) {
        setPayment({
          ...payment,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setPayment({
        ...payment,
        [e.target.name]: e.target.value,
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
    const totalPaymentAmount = calculateTotalPaymentAmount();
    if (Number(payment.pay_total) !== totalPaymentAmount) {
      toast.error("Total amount must equal sum of individual payment amounts");
      setIsButtonDisableds(false);
      return;
    }
    setIsButtonDisableds(true);
    const data = {
      pay_date: payment.pay_date,
      pay_year: currentYear,
      payment_from_id: payment.payment_from_id,
      payment_to_id: payment.payment_to_id,
      pay_total: payment.pay_total,
      pay_reference: payment.pay_reference,
      payment_data: users,
    };

    console.log("shdahd", data);

    axios({
      url: BASE_URL + "/api/panel-create-payment",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      toast.success("Payment Created Sucessfully");

      navigate("/payment-list");
      setPayment({
        pay_date: todayback,
        pay_year: "",
        payment_from_id: "",
        payment_to_id: "",
        billing_to_id: "",
        pay_total: "",
        pay_reference: "",
        payment_data: users,
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
              <span>Add Payment </span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/payment-list")}
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
            {/* Buyer  */}
            <div>
              <FormLabel required>Buyer</FormLabel>
              <select
                name="payment_from_id"
                value={payment.payment_from_id}
                onChange={(e) => onInputChange(e)}
                required
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
            {/* Supplier  */}
            <div>
              <FormLabel required>Supplier</FormLabel>
              <select
                name="payment_to_id"
                value={payment.payment_to_id}
                onChange={(e) => onInputChange(e)}
                required
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
            {/* Payment date  */}
            <div>
              <FormLabel required>Payment Date</FormLabel>
              <input
                type="date"
                required
                name="pay_date"
                value={payment.pay_date}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/* billing yEAR  */}
            <div>
              <FormLabel required>Payment Year</FormLabel>
              <input
                type="text"
                name="pay_year"
                required
                value={currentYear}
                onChange={(e) => onInputChange(e)}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
                disabled
              />
            </div>

            {/* Total Amount  */}
            <div>
              <FormLabel required>Total Amount</FormLabel>
              <input
                required
                type="tel"
                name="pay_total"
                value={payment.pay_total}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>

            {/* Payment Refrence  */}
            <div className="col-span-0 lg:col-span-3">
              <FormLabel>Payment Reference</FormLabel>
              <textarea
                type="text"
                name="pay_reference"
                value={payment.pay_reference}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                rows={1}
              />
            </div>
          </div>

          <hr />
          <div>
            <h2 className="  text-[black] text-lg   flex flex-row  justify-between items-center ">
              <div className="flex  items-center gap-2">
                <IconInfoCircle className="w-4 h-4" />
                <span>Payment Details </span>
              </div>
            </h2>
            {users.map((user, index) => (
              <div className="grid grid-cols-1 mt-3  md:grid-cols-1 lg:grid-cols-3   gap-6">
                {/* Bill No  */}
                <div>
                  <FormLabel required>Bill No</FormLabel>
                  <select
                    name="payment_bill_no"
                    value={user.payment_bill_no}
                    onChange={(e) =>
                      onChangeUser(index, "payment_bill_no", e.target.value)
                    }
                    className={inputClassSelect}
                    required
                  >
                    <option value="">Select Bill No </option>
                    {paymentBill.map((option) => (
                      <option key={option.billing_no} value={option.billing_no}>
                        {option.billing_no}-
                        {option.billing_total_amount - option.total_sum}
                      </option>
                    ))}
                  </select>
                </div>
                {/*  Amount  */}
                <div>
                  <FormLabel required>Amount</FormLabel>
                  <input
                    type="tel"
                    name="payment_amount"
                    value={user.payment_amount}
                    onChange={(e) =>
                      onChangeUser(index, "payment_amount", e.target.value)
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <IconTrash
                    onClick={() => removeUser(index)}
                    className="cursor-pointer  translate-y-0 lg:translate-y-7  hover:text-red-600"
                  />
                </div>
              </div>
            ))}
            <div>
              <Button
                className="text-center  mt-2 text-sm font-[400] cursor-pointer   flex items-center gap-1  text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
                onClick={(e) => addItem(e)}
              >
                <IconPlus className="w-5 h-5" /> Add More
              </Button>
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
                navigate("/payment-list");
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

export default CreatePayment;
