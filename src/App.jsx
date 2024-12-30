import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";

import { Toaster } from "sonner";
import SupplierList from "./pages/supplier/SupplierList";
import BuyerList from "./pages/buyer/BuyerList";
import BillingList from "./pages/billing/BillingList";
import PaymentList from "./pages/payment/PaymentList";
import InvoiceList from "./pages/invoice/InvoiceList";
import CreateSupplier from "./pages/supplier/CreateSupplier";
import EditSupplier from "./pages/supplier/EditSupplier";
import CreateBuyer from "./pages/buyer/CreateBuyer";
import EditBuyer from "./pages/buyer/EditBuyer";
import CreateBilling from "./pages/billing/CreateBilling";
import EditBilling from "./pages/billing/EditBilling";
import CreatePayment from "./pages/payment/CreatePayment";
import EditPayment from "./pages/payment/EditPayment";


const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* Supplier  */}
        <Route path="/supplier-list" element={<SupplierList />} />
        <Route path="/createSupplier" element={<CreateSupplier />} />
        <Route path="/supplier-edit/:id" element={<EditSupplier />} />
        {/* Buyer  */}
        <Route path="/buyer-list" element={<BuyerList />} />
        <Route path="/buyer-edit/:id" element={<EditBuyer />} />
        <Route path="/createBuyer" element={<CreateBuyer />} />
        {/* Billing  */}
        <Route path="/billing-list" element={<BillingList />} />
        <Route path="/createBilling" element={<CreateBilling />} />
        <Route path="/billing-edit/:id" element={<EditBilling />} />
        {/* payment  */}
        <Route path="/payment-list" element={<PaymentList />} />
        <Route path="/createPayment" element={<CreatePayment />} />
        <Route path="/payment-edit/:id" element={<EditPayment />} />
        {/* invoice  */}
       
        <Route path="/invoice-list" element={<InvoiceList />} />
        
      </Routes>
    </>
  );
};

export default App;
