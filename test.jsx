import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { IconArrowBack, IconInfoCircle } from "@tabler/icons-react";
// import { IconInfoCircle, IconArrowBack } from 'lucide-react';

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
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      notes: '',
      company: '',
      name: '',
      brand: '',
      mobile: '',
      email: '',
      address: '',
      gst: '',
      commission: ''
    });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
  const inputClass7 = `
  w-full px-4 py-3 text-base bg-white border-2 border-indigo-900
  rounded-none shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]
  focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]
  transition-shadow duration-200 mb-1
`;

const FormLabel7 = ({ children, required }) => (
  <label className="block text-base font-bold mb-2 font-mono text-indigo-900">
    {children}
    {required && <span className="text-pink-600 ml-1">*</span>}
  </label>
);
  const inputClass4 = `
  w-full px-4 py-3 text-base bg-white border-2 border-black
  rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  transition-shadow duration-200 mb-1
`;

const FormLabel4 = ({ children, required }) => (
  <label className="block text-base font-bold mb-2 font-mono">
    {children}
    {required && <span className="text-black ml-1">*</span>}
  </label>
);

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 border-blue-500";


    const FormLabel1 = ({ children, required }) => (
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  
    const inputClass1 = "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300";


    const FormLabel2 = ({ children, required }) => (
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  
    const inputClass2 = "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-slate-300";
  return (
    <Layout>
      <div className=" bg-[#FFFFFF] p-2  rounded-lg  ">
        {/* mine  */}
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
        {/* chat  */}
        <div className="sticky top-0 p-4 mb-6 bg-white shadow-md rounded-lg">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-full">
        <IconInfoCircle className="w-5 h-5 text-blue-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">Add Supplier</h2>
    </div>
    <button
      onClick={() => navigate("/supplier-list")}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
    >
      <IconArrowBack className="w-4 h-4" />
      <span>Back</span>
    </button>
  </div>
</div>
{/* claude */}
<div className="sticky top-0 z-50 mt-5   rounded-lg bg-white mb-5 shadow-lg border-2 border-dashed border-gray-300">
  <div className="max-w-full mx-auto px-4 py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <IconInfoCircle className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add Supplier</h2>
      </div>
      
      <button 
        onClick={() => navigate("/supplier-list")}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
      >
        <IconArrowBack className="w-4 h-4" />
        <span className="text-sm font-medium">Back to List</span>
      </button>
    </div>
  </div>
</div>
{/* Option 1: Modern Gradient with Glass Effect */}
<div className="sticky top-0 z-50">
  <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 p-1">
    <div className="backdrop-blur-md bg-white/30 rounded-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <IconInfoCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Add Supplier</h2>
        </div>
        <button 
          onClick={() => navigate("/supplier-list")}
          className="group flex items-center gap-3 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
        >
          <IconArrowBack className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
          <span className="text-white font-medium">Return</span>
        </button>
      </div>
    </div>
  </div>
</div>

{/* Option 2: Geometric Pattern with Accent */}
<div className="sticky top-0 z-50">
  <div className="bg-indigo-900 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute rotate-45 -left-10 -top-10 w-40 h-40 bg-yellow-400"></div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-pink-500 rounded-full"></div>
    </div>
    <div className="relative px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-800 rounded-lg border-2 border-indigo-600">
            <IconInfoCircle className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <p className="text-indigo-200 text-sm">Supplier </p>
            <h2 className="text-xl font-bold text-white">Add New Supplier</h2>
          </div>
        </div>
        <button 
          onClick={() => navigate("/supplier-list")}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 border border-indigo-600"
        >
          <IconArrowBack className="w-4 h-4" />
          <span className="font-medium">Back to List</span>
        </button>
      </div>
    </div>
  </div>
</div>

{/* Option 3: Modern Card Style */}
<div className="sticky top-0 z-50 p-4 bg-slate-50">
  <div className="bg-white rounded-xl shadow-lg border border-slate-100">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 rounded-lg blur-lg opacity-20"></div>
          <div className="relative p-3 bg-emerald-500 rounded-lg">
            <IconInfoCircle className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">Create New</p>
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Add Supplier
          </h2>
        </div>
      </div>
      <button 
        onClick={() => navigate("/supplier-list")}
        className="group flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200"
      >
        <IconArrowBack className="w-4 h-4 text-slate-600 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-slate-600">Back</span>
      </button>
    </div>
  </div>
</div>

<div className="sticky top-0 p-5 mb-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
  <div className="flex items-center justify-between">
    {/* Title Section */}
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-full shadow-md">
        <IconInfoCircle className="w-6 h-6 text-blue-500" />
      </div>
      <h2 className="text-2xl font-bold text-white tracking-wide">Add Supplier</h2>
    </div>

    {/* Back Button */}
    <button
      onClick={() => navigate("/supplier-list")}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-transform duration-300 transform bg-pink-500 rounded-lg shadow hover:scale-105 hover:bg-pink-600"
    >
      <IconArrowBack className="w-5 h-5" />
      <span>Back</span>
    </button>
  </div>
</div>
<div className="sticky top-0 z-50 mt-5  shadow-lg rounded-lg ">
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
    <div className="max-w-full mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative p-2 bg-white rounded-lg ring-1 ring-blue-100 group-hover:ring-blue-200 transition duration-200">
              <IconInfoCircle className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600">Supplier </p>
            <h2 className="text-2xl font-bold text-gray-800">
              Add Supplier
              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
            </h2>
          </div>
        </div>
        
        <button 
          onClick={() => navigate("/supplier-list")}
          className="group flex items-center gap-3 px-5 py-2.5 bg-white rounded-lg shadow-sm 
                     hover:shadow-md hover:bg-blue-50 border border-blue-100 hover:border-blue-200 
                     transition-all duration-200"
        >
          <IconArrowBack className="w-5 h-5 text-gray-600 group-hover:text-blue-600 
                                  group-hover:-translate-x-1 transition-all duration-200" />
          <span className="font-medium text-gray-600 group-hover:text-blue-600">
            Back to List
          </span>
        </button>
      </div>
    </div>
  </div>
</div>

<div className="sticky top-0 z-50 mt-5  shadow-lg rounded-lg">
  {/* Top accent bar with gradient */}
  <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500"></div>
  
  {/* Main header content */}
  <div className="bg-white">
    <div className="max-w-full mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section with title */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur"></div>
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <IconInfoCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-0.5">
              <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md">
                Supplier 
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Add New Supplier
            </h2>
          </div>
        </div>

        {/* Right section with button */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate("/supplier-list")}
            className="group flex items-center gap-2 px-4 py-1 bg-slate-50 hover:bg-slate-100 
                       rounded-lg border border-slate-200 hover:border-slate-300
                       transition-all duration-200 ease-in-out"
          >
            <div className="p-1.5 bg-white rounded-md shadow-sm group-hover:-translate-x-0.5 transition-transform">
              <IconArrowBack className="w-4 h-4 text-slate-700" />
            </div>
            <span className="font-medium text-slate-700">Back to List</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  {/* Bottom shadow */}
  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
</div>

        <hr />
           {/* Form Section */}
           <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Company Field */}
              <div>
                <FormLabel1 required>Company Name</FormLabel1>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClass1}
                  required
                />
              </div>

              {/* Contact Person Field */}
              <div>
                <FormLabel1 required>Contact Person</FormLabel1>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass1}
                  required
                />
              </div>

              {/* Brand Field */}
              <div>
                <FormLabel1 required>Brand</FormLabel1>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={inputClass1}
                  required
                />
              </div>

              {/* Mobile Field */}
              <div>
                <FormLabel1 required>Mobile</FormLabel1>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={inputClass1}
                  required
                  maxLength={10}
                />
              </div>

              {/* Email Field */}
              <div>
                <FormLabel1 required>Email</FormLabel1>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass1}
                  required
                />
              </div>

              {/* GST Field */}
              <div>
                <FormLabel1>GST Number</FormLabel1>
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  className={inputClass1}
                  maxLength={15}
                />
              </div>

              {/* Address Field */}
              <div className="lg:col-span-2">
                <FormLabel1 required>Address</FormLabel1>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass1}
                  required
                  rows={2}
                />
              </div>

              {/* Commission Field */}
              <div>
                <FormLabel1>Commission (%)</FormLabel1>
                <input
                  type="number"
                  name="commission"
                  value={formData.commission}
                  onChange={handleChange}
                  className={inputClass1}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors duration-200 text-sm font-medium disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                         transition-colors duration-200 text-sm font-medium"
                onClick={() => console.log('Cancel')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Name Field */}
              <div>
                <FormLabel2 required>Name</FormLabel2>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass2}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <FormLabel2 required>Email</FormLabel2>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass2}
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <FormLabel2 required>Phone</FormLabel2>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass2}
                  required
                />
              </div>

              {/* Category Field */}
              <div>
                <FormLabel2 required>Category</FormLabel2>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass2}
                  required
                />
              </div>

              {/* Address Field */}
              <div className="md:col-span-2">
                <FormLabel2 required>Address</FormLabel2>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass2}
                  required
                  rows={2}
                />
              </div>

              {/* Notes Field */}
              <div className="md:col-span-2">
                <FormLabel2>Additional Notes</FormLabel2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className={inputClass2}
                  rows={2}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors duration-200 text-sm font-medium"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700
                         transition-colors duration-200 text-sm font-medium"
                onClick={() => console.log('Cancel')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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

       <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Neubrutalist Header */}
              <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-black">
                        <IconInfoCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-black font-mono">ADD SUPPLIER</h2>
                    </div>
                    
                    <button 
                      onClick={() => console.log('Navigate back')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black
                               hover:bg-black hover:text-white transition-colors duration-200
                               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                               hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <IconArrowBack className="w-5 h-5" />
                      <span className="font-bold font-mono">BACK</span>
                    </button>
                  </div>
                </div>
              </div>
      
              {/* Form Section */}
              <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Company Field */}
                    <div>
                      <FormLabel4 required>COMPANY NAME</FormLabel4>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass4}
                        required
                      />
                    </div>
      
                    {/* Contact Person Field */}
                    <div>
                      <FormLabel4 required>CONTACT PERSON</FormLabel4>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass4}
                        required
                      />
                    </div>
      
                    {/* Brand Field */}
                    <div>
                      <FormLabel4 required>BRAND</FormLabel4>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className={inputClass4}
                        required
                      />
                    </div>
      
                    {/* Mobile Field */}
                    <div>
                      <FormLabel4 required>MOBILE</FormLabel4>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={inputClass4}
                        required
                        maxLength={10}
                      />
                    </div>
      
                    {/* Email Field */}
                    <div>
                      <FormLabel4 required>EMAIL</FormLabel4>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass4}
                        required
                      />
                    </div>
      
                    {/* GST Field */}
                    <div>
                      <FormLabel4>GST NUMBER</FormLabel4>
                      <input
                        type="text"
                        name="gst"
                        value={formData.gst}
                        onChange={handleChange}
                        className={inputClass4}
                        maxLength={15}
                      />
                    </div>
      
                    {/* Address Field */}
                    <div className="lg:col-span-2">
                      <FormLabel4 required>ADDRESS</FormLabel4>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={inputClass4}
                        required
                        rows={3}
                      />
                    </div>
      
                    {/* Commission Field */}
                    <div>
                      <FormLabel4>COMMISSION (%)</FormLabel4>
                      <input
                        type="number"
                        name="commission"
                        value={formData.commission}
                        onChange={handleChange}
                        className={inputClass4}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
      
                  {/* Form Actions */}
                  <div className="flex gap-6 pt-6">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-black text-white font-bold font-mono
                               border-2 border-black
                               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                               hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                               hover:translate-x-[-2px] hover:translate-y-[-2px]
                               transition-all duration-200"
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      className="px-8 py-3 bg-white text-black font-bold font-mono
                               border-2 border-black
                               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                               hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                               hover:translate-x-[-2px] hover:translate-y-[-2px]
                               transition-all duration-200"
                      onClick={() => console.log('Cancel')}
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
           <div className="min-h-screen bg-orange-50 p-6">
                <div className="max-w-7xl mx-auto">
                  {/* Colorful Brutalist Header */}
                  <div className="bg-white border-2 border-indigo-900 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)] mb-8">
                    <div className="p-6 bg-gradient-to-r from-pink-100 to-violet-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-indigo-600 rotate-3 hover:rotate-0 transition-transform">
                            <IconInfoCircle className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl font-black font-mono text-indigo-900 -rotate-1">ADD SUPPLIER</h2>
                        </div>
                        
                        <button 
                          onClick={() => console.log('Navigate back')}
                          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-indigo-900
                                   hover:bg-indigo-600 hover:text-white transition-colors duration-200
                                   shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]
                                   hover:shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]
                                   rotate-1 hover:rotate-0"
                        >
                          <IconArrowBack className="w-5 h-5" />
                          <span className="font-bold font-mono">BACK</span>
                        </button>
                      </div>
                    </div>
                  </div>
          
                  {/* Form Section */}
                  <div className="bg-white border-2 border-indigo-900 p-8 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Company Field */}
                        <div className="group">
                          <FormLabel7 required>COMPANY NAME</FormLabel7>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-pink-50`}
                            required
                          />
                        </div>
          
                        {/* Contact Person Field */}
                        <div>
                          <FormLabel7 required>CONTACT PERSON</FormLabel7>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-violet-50`}
                            required
                          />
                        </div>
          
                        {/* Brand Field */}
                        <div>
                          <FormLabel7 required>BRAND</FormLabel7>
                          <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-indigo-50`}
                            required
                          />
                        </div>
          
                        {/* Mobile Field */}
                        <div>
                          <FormLabel7 required>MOBILE</FormLabel7>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-pink-50`}
                            required
                            maxLength={10}
                          />
                        </div>
          
                        {/* Email Field */}
                        <div>
                          <FormLabel7 required>EMAIL</FormLabel7>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-violet-50`}
                            required
                          />
                        </div>
          
                        {/* GST Field */}
                        <div>
                          <FormLabel7>GST NUMBER</FormLabel7>
                          <input
                            type="text"
                            name="gst"
                            value={formData.gst}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-indigo-50`}
                            maxLength={15}
                          />
                        </div>
          
                        {/* Address Field */}
                        <div className="lg:col-span-2">
                          <FormLabel7 required>ADDRESS</FormLabel7>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-pink-50`}
                            required
                            rows={3}
                          />
                        </div>
          
                        {/* Commission Field */}
                        <div>
                          <FormLabel7>COMMISSION (%)</FormLabel7>
                          <input
                            type="number"
                            name="commission"
                            value={formData.commission}
                            onChange={handleChange}
                            className={`${inputClass7} hover:bg-violet-50`}
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
          
                      {/* Form Actions */}
                      <div className="flex gap-6 pt-6">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-indigo-600 text-white font-bold font-mono
                                   border-2 border-indigo-900
                                   shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]
                                   hover:shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]
                                   hover:translate-x-[-2px] hover:translate-y-[-2px]
                                   transition-all duration-200 rotate-1 hover:rotate-0"
                        >
                          SUBMIT
                        </button>
                        <button
                          type="button"
                          className="px-8 py-3 bg-pink-100 text-indigo-900 font-bold font-mono
                                   border-2 border-indigo-900
                                   shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]
                                   hover:shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]
                                   hover:translate-x-[-2px] hover:translate-y-[-2px]
                                   transition-all duration-200 -rotate-1 hover:rotate-0"
                          onClick={() => console.log('Cancel')}
                        >
                          CANCEL
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    </Layout>
  );
};

export default CreateSupplier;
