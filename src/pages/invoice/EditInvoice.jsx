import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import {
  IconArrowBack,
  IconInfoCircle,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentYear = "2024-25";

  const [invoice, setInvoice] = useState({
    invoice_date: "",
    invoice_year: "",
    invoice_no: "",
    invoice_from_id: "",
    invoice_to_id: "",
    invoice_total: "",
  });

  const [users, setUsers] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [buyer, setBuyer] = useState([]);
   const [showBillTable, setShowBillTable] = useState(false);
    const [invoiceBill, setInvoiceBill] = useState([]);


    const fetchInvoiceBills = async () => {
        if (!invoice.invoice_from_id || !invoice.invoice_to_id) return;
    
        try {
          setIsButtonDisabled(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${BASE_URL}/api/panel-fetch-invoice-billingno/${invoice.invoice_to_id}/${invoice.invoice_from_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setInvoiceBill(response.data?.invoice_billno || []);
        } catch (error) {
          console.error("Error fetching invoice bills", error);
          toast.error("Error fetching invoice bill numbers");
        } finally {
          setIsButtonDisabled(false);
        }
      };


  const fetchInvoiceEdit = async () => {
    try {
      setIsButtonDisabled(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-invoice-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set invoice details
      setInvoice({
        ...response.data?.invoice,
        invoice_date: response.data?.invoice.invoice_date || "",
        invoice_year: response.data?.invoice.invoice_year || "",
        invoice_from_id: response.data?.invoice.invoice_from_id || "",
        invoice_to_id: response.data?.invoice.invoice_to_id || "",
        invoice_total: response.data?.invoice.invoice_total || "",
        invoice_no: response.data?.invoice.invoice_no || "",
      });

      
      if (response.data?.invoiceSub && response.data.invoiceSub.length > 0) {
        setUsers(
          response.data.invoiceSub.map((sub) => ({
            id: sub.id,
            invoice_sub_bill_no: sub.invoice_sub_bill_no || "",
            invoice_sub_total: sub.invoice_sub_total || "",
            invoice_comm: sub.invoice_comm || "",
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching invoice edit data", error);
      toast.error("Error fetching invoice data");
    } finally {
      setIsButtonDisabled(false);
    }
  };

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
      toast.error("Error fetching vendor data");
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
      toast.error("Error fetching buyer data");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchInvoiceEdit();
    fetchVendor();
    fetchBuyer();
  }, []);

 const handleAddMore = async () => {
    await fetchInvoiceBills();
    setShowBillTable(true);
  };

  const onSelectBill = (bill) => {
      const isAlreadySelected = users.some(
        (user) => user.invoice_sub_bill_no === bill.billing_no
      );
  
      if (isAlreadySelected) {
        toast.error("This bill is already added");
        return;
      }
  
      const newUser = {
        invoice_sub_bill_no: bill.billing_no,
        invoice_sub_total: bill.billing_total_amount,
        invoice_comm: "0",
      };
  
      setUsers([...users, newUser]);
    //   setShowBillTable(false);
  
      // Update invoice total
      const newTotal = users.reduce(
        (sum, user) => sum + (parseFloat(user.invoice_sub_total) || 0),
        0
      ) + parseFloat(bill.billing_total_amount);
      
      setInvoice(prev => ({
        ...prev,
        invoice_total: newTotal.toString()
      }));
    };

  const onChangeUser = (index, name, value) => {
    if (name === "invoice_sub_total" || name === "invoice_comm" || name === "invoice_sub_bill_no") {
      if (!validateOnlyDigits(value)) return;
    }

    const updatedUsers = users.map((user, i) => {
      if (i === index) {
        const updatedUser = { ...user, [name]: value };

        if (name === "invoice_sub_total" || name === "invoice_comm") {
          const total = parseFloat(updatedUser.invoice_sub_total) || 0;
          const comm = parseFloat(updatedUser.invoice_comm) || 0;
          updatedUser.invoice_price = (total - comm).toFixed(2);
        }

        return updatedUser;
      }
      return user;
    });

    setUsers(updatedUsers);

    const newTotal = updatedUsers.reduce(
      (sum, user) => sum + (parseFloat(user.invoice_sub_total) || 0),
      0
    );
    setInvoice((prev) => ({ ...prev, invoice_total: newTotal.toString() }));
  };

  const handleDleteInvoice = async (invoiceSubId, index) => {
   
    if (window.confirm("Are you sure you want to delete this payment entry?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${BASE_URL}/api/panel-delete-invoiceSub/${invoiceSubId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredUsers = users.filter((_, i) => i !== index);
        setUsers(filteredUsers);
        fetchInvoiceEdit()
        toast.success("invoice entry deleted successfully");
      
      } catch (error) {
        console.error("Error deleting invoice sub", error);
        toast.error("Failed to delete invoice entry");
      }
    }
  };

  const validateOnlyDigits = (inputtxt) => {
    const phoneno = /^\d*\.?\d*$/;
    return inputtxt.match(phoneno) || inputtxt.length === 0;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "invoice_total") {
      if (validateOnlyDigits(value)) {
        setInvoice((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setInvoice((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !invoice.invoice_date ||
      !invoice.invoice_from_id ||
      !invoice.invoice_to_id ||
      !invoice.invoice_total
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsButtonDisabled(true);
      const data = {
        invoice_date: invoice.invoice_date,
        invoice_year: invoice.invoice_year,
        invoice_from_id: invoice.invoice_from_id,
        invoice_to_id: invoice.invoice_to_id,
        invoice_total: invoice.invoice_total,
        invoice_no: invoice.invoice_no,
        invoice_data: users.map((user) => ({
          id: user.id,
          invoice_sub_bill_no: user.invoice_sub_bill_no,

          invoice_comm: user.invoice_comm,
        })),
      };

      await axios.put(`${BASE_URL}/api/panel-update-invoice/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Invoice Updated Successfully");
      navigate("/invoice-list");
    } catch (error) {
      console.error("Error updating invoice", error);
      toast.error("Error updating invoice");
    } finally {
      setIsButtonDisabled(false);
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
              <span>Edit Invoice</span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/invoice-list")}
              className="cursor-pointer hover:text-red-600"
            />
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-7xl rounded-lg mx-auto p-4 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6">
            <div>
              <FormLabel required>Buyer</FormLabel>
              <select
                name="invoice_from_id"
                value={invoice.invoice_from_id}
                onChange={onInputChange}
                required
                disabled
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500 cursor-not-allowed"
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
                disabled
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-blue-500 cursor-not-allowed"
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
              <FormLabel required>Invoice Year</FormLabel>
              <input
                type="text"
                name="invoice_year"
                required
                value={invoice.invoice_year}
                onChange={onInputChange}
        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <FormLabel required>Invoice No</FormLabel>
              <input
                required
                type="text"
                name="invoice_no"
                value={invoice.invoice_no}
                onChange={onInputChange}
               className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
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
              <FormLabel required>Invoice Total</FormLabel>
              <input
                required
                type="text"
                name="invoice_total"
                value={invoice.invoice_total}
                onChange={onInputChange}
                className={inputClass}
              />
            </div>

           
          </div>

          <hr />

          <div>
            <h2 className="text-[black] text-lg flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <IconInfoCircle className="w-4 h-4" />
                <span>Invoice Details</span>
              </div>
            </h2>

            {users.map((user, index) => (
              <div
                key={user.id || index}
                className="grid grid-cols-1 mt-3 md:grid-cols-1 lg:grid-cols-4 gap-6"
              >
                <div>
                  <FormLabel required>Bill No</FormLabel>
                  <input
                    type="text"
                    name="invoice_sub_bill_no"
                    value={user.invoice_sub_bill_no}
                    required
                    onChange={(e) =>
                      onChangeUser(index, "invoice_sub_bill_no", e.target.value)
                    }
                    disabled
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <FormLabel required>Amount</FormLabel>
                  <input
                    type="text"
                    required
                    name="invoice_sub_total"
                    value={user.invoice_sub_total}
                    onChange={(e) =>
                      onChangeUser(index, "invoice_sub_total", e.target.value)
                    }
                    disabled
                     className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <FormLabel>Commission</FormLabel>
                  <input
                    type="text"
                    name="invoice_comm"
                    value={user.invoice_comm}
                    onChange={(e) =>
                      onChangeUser(index, "invoice_comm", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <IconTrash
                    onClick={() => handleDleteInvoice(user.id, index)}
                    className="cursor-pointer translate-y-0 lg:translate-y-7 hover:text-red-600"
                  />
                </div>
              </div>
            ))}
{!showBillTable && (
            <div>
              <Button
                className="text-center mt-2 text-sm font-[400] cursor-pointer flex items-center gap-1 text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
                onClick={handleAddMore}
              >
                <IconPlus className="w-5 h-5" /> Add More
              </Button>
            </div>
              )}
            {showBillTable && (
                   <div className="mt-4">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Select Bills</h3>
                                <IconX 
                                  onClick={() => setShowBillTable(false)}
                                  className="cursor-pointer hover:text-red-600 w-6 h-6"
                                />
                              </div>
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
                  {invoiceBill.map((bill) => (
                    <tr
                      key={bill.billing_no}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => onSelectBill(bill)}
                    >
                      <td className="p-3 text-left">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={users.some(
                            (user) => user.invoice_sub_bill_no === bill.billing_no
                          )}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-900">
                        {bill.billing_no}
                      </td>
                      <td className="p-3 text-sm text-gray-900 text-right">
                        {bill.billing_total_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="submit"
              className="text-center text-sm font-[400] cursor-pointer w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Updating..." : "Update"}
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

export default EditInvoice;
