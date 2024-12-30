import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";

const CreateSupplier = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    vendor_company: "",
    vendor_name: "",
    vendor_mobile: "",
    vendor_email: "",
    vendor_address: "",
    vendor_brand: "",
    vendor_gst: "",
    vendor_comm: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const onInputChange = (e) => {
    if (e.target.name == "vendor_mobile") {
      if (validateOnlyDigits(e.target.value)) {
        setVendor({
          ...vendor,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name == "vendor_comm") {
      if (validateOnlyDigits(e.target.value)) {
        setVendor({
          ...vendor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setVendor({
        ...vendor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Fill all required");
      setIsButtonDisabled(false);

      return;
    }
    const data = {
      vendor_company: vendor.vendor_company,
      vendor_name: vendor.vendor_name,
      vendor_mobile: vendor.vendor_mobile,
      vendor_email: vendor.vendor_email,
      vendor_address: vendor.vendor_address,
      vendor_brand: vendor.vendor_brand,
      vendor_gst: vendor.vendor_gst,
      vendor_comm: vendor.vendor_comm,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/panel-create-vendor",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      toast.success("Supplier Created Sucessfully");

      navigate("/supplier-list");
      setVendor({
        vendor_company: "",
        vendor_name: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_address: "",
        vendor_brand: "",
        vendor_gst: "",
        vendor_comm: "",
      });
    });
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500";
  return (
    <Layout>
      <div className=" bg-[#FFFFFF] p-2  rounded-lg  ">
        <div className="sticky top-0 p-2  mb-4 border-b-2 border-red-500 rounded-lg  bg-[#E1F5FA] ">
          <h2 className=" px-5 text-[black] text-lg   flex flex-row  justify-between items-center  rounded-xl p-2 ">
            <div className="flex  items-center gap-2">
              <IconInfoCircle className="w-4 h-4" />
              <span>Add Supplier </span>
            </div>
            <IconArrowBack
              onClick={() => navigate("/supplier-list")}
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
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3   gap-6">
            {/* Supplier Company  */}
            <div>
              <FormLabel required>Supplier Company</FormLabel>
              <input
                type="text"
                name="vendor_company"
                value={vendor.vendor_company}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* Supplier Name  */}
            <div>
              <FormLabel required>Supplier Name</FormLabel>
              <input
                type="text"
                name="vendor_name"
                value={vendor.vendor_name}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* Brand  */}
            <div>
              <FormLabel required>Brand</FormLabel>
              <input
                type="text"
                name="vendor_brand"
                value={vendor.vendor_brand}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>
            {/* Address  */}
            <div className="col-span-0 lg:col-span-2">
              <FormLabel required>Address</FormLabel>
              <textarea
                type="text"
                name="vendor_address"
                value={vendor.vendor_address}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
                rows={2}
                multiline
              />
            </div>

            {/* Mobile  */}
            <div>
              <FormLabel required>Mobile</FormLabel>
              <input
                type="tel"
                name="vendor_mobile"
                value={vendor.vendor_mobile}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
                maxLength={10}
              />
            </div>

            {/* Email  */}
            <div>
              <FormLabel required>Email</FormLabel>
              <input
                type="email"
                name="vendor_email"
                value={vendor.vendor_email}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                required
              />
            </div>

            {/* GST  */}
            <div>
              <FormLabel>GST</FormLabel>
              <input
                type="text"
                name="vendor_gst"
                value={vendor.vendor_gst}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
                maxLength={15}
              />
            </div>

            {/* Commission (In Percentage)  */}
            <div>
              <FormLabel>Commission (In Percentage)</FormLabel>
              <input
                type="tel"
                name="vendor_comm"
                value={vendor.vendor_comm}
                onChange={(e) => onInputChange(e)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap gap-4 justify-start">
            <button
              type="submit"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Sumbitting..." : "Sumbit"}
            </button>

            <button
              type="button"
              className="text-center text-sm font-[400] cursor-pointer  w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md"
              onClick={() => {
                navigate("/supplier-list");
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

export default CreateSupplier;
