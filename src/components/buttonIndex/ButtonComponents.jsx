import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Edit } from "lucide-react";
import React from "react";




const getUserControlData = () => {
    const userControl = localStorage.getItem("userControl");
    try {
      return userControl ? JSON.parse(userControl) : [];
    } catch (error) {
      console.error("Error parsing usercontrol data from localStorage", error);
      return [];
    }
  };
  
  
  const shouldRenderButton = (buttonName, userType, status) => {
    const data = getUserControlData(); 
   
    return data.some((item) => {
      const userTypes = item.usertype.split(","); 
      return (
        item.button == buttonName &&
        userTypes.includes(userType) && 
        item.status.toLowerCase() == status.toLowerCase() 
      );
    });
  };

  //suuplier

  export const SupplierEdit = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
     
    if (!shouldRenderButton("SupplierEdit", userType, "active"))
      return null;
  
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
        title="Edit Supplier"
      >
        <Edit className="h-4 w-4" />
      </Button>
    );
  };
  SupplierEdit.page = "Supplier";
  
  export const SupplierCreate = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
  
    if (!shouldRenderButton("SupplierCreate", userType, "active"))
      return null;
  
    return (
      <Button
        variant="default"
        onClick={onClick}
        className={` ${className}`}
      >
      <IconPlus className='w-4 h-4 mr-1'/> Supplier
      </Button>
    );
  };
  SupplierCreate.page = "Supplier";

//buyer 


export const BuyerEdit = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
     
    if (!shouldRenderButton("BuyerEdit", userType, "active"))
      return null;
  
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
        title="Edit Buyer"
      >
        <Edit className="h-4 w-4" />
      </Button>
    );
  };
  BuyerEdit.page = "Buyer";
  
  export const BuyerCreate = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
  
    if (!shouldRenderButton("BuyerCreate", userType, "active"))
      return null;
  
    return (
      <Button
        variant="default"
        onClick={onClick}
        className={` ${className}`}
      >
        <IconPlus className='w-4 h-4 mr-1'/> Buyer
      </Button>
    );
  };
  BuyerCreate.page = "Buyer";

//   billing


export const BillingEdit = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
     
    if (!shouldRenderButton("BillingEdit", userType, "active"))
      return null;
  
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
        title="Edit Billing"
      >
        <Edit className="h-4 w-4" />
      </Button>
    );
  };
  BillingEdit.page = "Billing";
  
  export const BillingCreate = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
  
    if (!shouldRenderButton("BillingCreate", userType, "active"))
      return null;
  
    return (
      <Button
        variant="default"
        onClick={onClick}
        className={` ${className}`}
      >
        <IconPlus className='w-4 h-4 mr-1'/> Billing
      </Button>
    );
  };
  BillingCreate.page = "Billing";

//   payment 


export const PaymentEdit = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
     
    if (!shouldRenderButton("PaymentEdit", userType, "active"))
      return null;
  
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
        title="Edit Payment"
      >
        <Edit className="h-4 w-4" />
      </Button>
    );
  };
  PaymentEdit.page = "Payment";
  
  export const PaymentCreate = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
  
    if (!shouldRenderButton("PaymentCreate", userType, "active"))
      return null;
  
    return (
      <Button
        variant="default"
        onClick={onClick}
        className={` ${className}`}
      >
        <IconPlus className='w-4 h-4 mr-1'/> Payment
      </Button>
    );
  };
  PaymentCreate.page = "Payment";

//   invoice 


export const InvoiceEdit = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
     
    if (!shouldRenderButton("InvoiceEdit", userType, "active"))
      return null;
  
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={className}
        title="Edit Invoice"
      >
        <Edit className="h-4 w-4" />
      </Button>
    );
  };
  InvoiceEdit.page = "Invoice";
  
  export const InvoiceCreate = ({ onClick, className }) => {
    const userType = localStorage.getItem("userType");
  
    if (!shouldRenderButton("InvoiceCreate", userType, "active"))
      return null;
  
    return (
      <Button
        variant="default"
        onClick={onClick}
        className={` ${className}`}
      >
        <IconPlus className='w-4 h-4 mr-1'/> Invoice
      </Button>
    );
  };
  InvoiceCreate.page = "Invoice";
  export default {
    SupplierEdit,
    SupplierCreate,
    BuyerEdit,
    BuyerCreate,
    BillingEdit,
    BillingCreate,
    PaymentEdit,
    PaymentCreate,
    InvoiceEdit,
    InvoiceCreate,

  
  };