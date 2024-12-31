import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
import { ContextPanel } from "../../context/ContextPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";

const CreateInvoiceList = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayback = yyyy + "-" + mm + "-" + dd;
  const navigate = useNavigate();
  const { currentYear } = useContext(ContextPanel);
  
  const [invoice, setInvoice] = useState({
    invoice_date: todayback,
    invoice_year: "",
    invoice_from_id: "",
    invoice_to_id: "",
    invoice_total: "",
    invoice_data: "",
  });

  const [selectedBills, setSelectedBills] = useState([]);
  const [isButtonDisableds, setIsButtonDisableds] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [invoiceBill, setInvoiceBill] = useState([]);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBuyer(response.data?.buyer);
    } catch (error) {
      console.error("Error fetching buyer data", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const fetchInvoiceBills = async (buyerId, vendorId) => {
    if (!buyerId || !vendorId) return;

    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-invoice-billingno/${vendorId}/${buyerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoiceBill(response.data?.invoice_billno);
    } catch (error) {
      console.error("Error fetching invoice bills", error);
      toast.error("Error fetching invoice bill numbers");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchVendor();
    fetchBuyer();
  }, []);

  useEffect(() => {
    if (invoice.invoice_from_id && invoice.invoice_to_id) {
      fetchInvoiceBills(invoice.invoice_from_id, invoice.invoice_to_id);
      setSelectedBills([]); 
    }
  }, [invoice.invoice_from_id, invoice.invoice_to_id]);

  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "invoice_total") {
      if (validateOnlyDigits(e.target.value)) {
        setInvoice({
          ...invoice,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setInvoice({
        ...invoice,
        [e.target.name]: e.target.value,
      });
    }
  };

  // const onChangeUser = (billNo) => {
  //   setSelectedBills(prevBills => {
  //     if (prevBills.some(bill => bill.invoice_sub_bill_no === billNo)) {
  //       return prevBills.filter(bill => bill.invoice_sub_bill_no !== billNo);
  //     } else {
  //       return [...prevBills, { invoice_sub_bill_no: billNo }];
  //     }
  //   });
  // };
  const onChangeUser = (billNo, amount) => {
    setSelectedBills(prevBills => {
      if (prevBills.some(bill => bill.invoice_sub_bill_no === billNo)) {
        return prevBills.filter(bill => bill.invoice_sub_bill_no !== billNo);
      } else {
        return [...prevBills, { 
          invoice_sub_bill_no: billNo,
          amount: parseFloat(amount)
        }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedBillsTotal = selectedBills.reduce((sum, bill) => sum + bill.amount, 0);
    const invoiceTotal = parseFloat(invoice.invoice_total);

    if (selectedBillsTotal !== invoiceTotal) {
      toast.error("Invoice total must match the sum of selected bills");
      setIsButtonDisableds(false);
      return;
    }

    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required fields");
      setIsButtonDisableds(false);
      return;
    }

    setIsButtonDisableds(true);
    const transformedBills = selectedBills.map(bill => ({
      invoice_sub_bill_no: bill.invoice_sub_bill_no
    }));
    const data = {
      invoice_date: invoice.invoice_date,
      invoice_year: currentYear,
      invoice_from_id: invoice.invoice_from_id,
      invoice_to_id: invoice.invoice_to_id,
      invoice_total: invoice.invoice_total,
      invoice_data: transformedBills
    };
    
    try {
      await axios({
        url: BASE_URL + "/api/panel-create-invoice",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      toast.success("Invoice Created Successfully");
      navigate("/invoice-list");
      setInvoice({
        invoice_date: todayback,
        invoice_year: "",
        invoice_from_id: "",
        invoice_to_id: "",
        invoice_total: "",
        invoice_data: "",
      });
      setSelectedBills([]);
    } catch (error) {
      toast.error("Error creating invoice");
      setIsButtonDisableds(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1">
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
      <div className="bg-[#FFFFFF] p-2 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-red-500 rounded-lg bg-[#E1F5FA]">
          <h2 className="px-5 text-[black] text-lg flex flex-row justify-between items-center rounded-xl p-2">
            <div className="flex items-center gap-2">
              <IconInfoCircle className="w-4 h-4" />
              <span>Add Invoice</span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/invoice-list")}
              className="cursor-pointer hover:text-red-600"
            />
          </h2>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit}
          id="addIndiv"
          className="w-full max-w-7xl rounded-lg mx-auto p-4 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
          

            <div>
              <FormLabel required>Invoice Year</FormLabel>
              <input
                type="text"
                name="invoice_year"
                required
                value={currentYear}
                onChange={onInputChange}
                className={inputClass}
                disabled
              />
            </div>

            <div>
              <FormLabel required>Invoice Date</FormLabel>
              <input
                type="date"
                required
                name="invoice_date"
                value={invoice.invoice_date}
                onChange={onInputChange}
                className={inputClass}
              />
            </div>

            <div>
              <FormLabel required>Buyer</FormLabel>
              <select
                name="invoice_from_id"
                value={invoice.invoice_from_id}
                onChange={onInputChange}
                required
                className={inputClassSelect}
              >
                <option value="">Select Buyer</option>
                {buyer.map((option) => (
                  <option key={option.buyer_company} value={option.id}>
                    {option.buyer_company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <FormLabel required>Supplier</FormLabel>
              <select
                name="invoice_to_id"
                value={invoice.invoice_to_id}
                onChange={onInputChange}
                required
                className={inputClassSelect}
              >
                <option value="">Select Supplier</option>
                {vendor.map((option) => (
                  <option key={option.vendor_company} value={option.id}>
                    {option.vendor_company}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FormLabel required>Invoice Total</FormLabel>
              <input
                required
                type="tel"
                name="invoice_total"
                value={invoice.invoice_total}
                onChange={onInputChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <h2 className="text-[black] text-lg flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <IconInfoCircle className="w-4 h-4" />
                <span>Invoice Details</span>
              </div>
            </h2>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                      Select
                    </th>
                    <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                      Bill No
                    </th>
                    <th className="p-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoiceBill?.map((bill) => (
                    <tr key={bill.billing_no} className="hover:bg-gray-50">
                      <td className="p-3 text-left">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedBills.some(
                            selectedBill => selectedBill.invoice_sub_bill_no === bill.billing_no
                          )}
                           onChange={() => onChangeUser(bill.billing_no, bill.billing_total_amount)}
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-900">{bill.billing_no}</td>
                      <td className="p-3 text-sm text-gray-900 text-right">
                        {bill.billing_total_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="submit"
              className="text-center text-sm font-[400] cursor-pointer w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisableds}
            >
              {isButtonDisableds ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              className="text-center text-sm font-[400] cursor-pointer w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md"
              onClick={() => navigate("/invoice-list")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateInvoiceList;