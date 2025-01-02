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
import CreateInvoiceList from "./pages/invoice/CreateInvoiceList";
import EditInvoice from "./pages/invoice/EditInvoice";
import SupplierReport from "./pages/report/supplier/SupplierReport";
import BuyerReport from "./pages/report/buyer/BuyerReport";
import MonthWiseReportForm from "./pages/monthwiseReport/MonthWiseReportForm";
import MonthWisePaymentReport from "./pages/monthwiseReport/MonthWisePaymentReport";
import MonthWiseInvoiceReport from "./pages/monthwiseReport/MonthWiseInvoiceReport";
import OutstandingReport from "./pages/outstandingReport/OutstandingReport";
import OutstandingSupplierReport from "./pages/outstandingReport/OutstandingSupplierReport";
import OutstandingBuyerReport from "./pages/outstandingReport/OutstandingBuyerReport";
import MonthwiseSupplierOutstanding from "./pages/outstandingReport/MonthwiseSupplierOutstanding";
import MonthwiseBuyerOutstanding from "./pages/outstandingReport/MonthwiseBuyerOutstanding";
import UserManagement from "./pages/userManagement/UserManagement";
import CreateButton from "./pages/userManagement/CreateButton";


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
        <Route path="/createInvoice" element={<CreateInvoiceList />} />
        <Route path="/invoice-edit/:id" element={<EditInvoice />} />

        {/* reports  */}
        <Route path="/report-supplier" element={<SupplierReport />} />
        <Route path="/report-buyer" element={<BuyerReport />} />

        {/* monthwise report  */}
        <Route path="/monthwise-report" element={<MonthWiseReportForm />} />
        <Route path="/monthwise-payment-report" element={<MonthWisePaymentReport />} />
        <Route path="/monthwise-invoice-report" element={<MonthWiseInvoiceReport />} />
        {/* reports all  */}
        <Route path="/outstanding-report" element={<OutstandingReport />} />
        <Route path="/supplier-outstanding-report" element={<OutstandingSupplierReport />} />
        <Route path="/buyer-outstanding-report" element={<OutstandingBuyerReport />} />
        <Route path="/monthwise-supplier-outstanding-report" element={<MonthwiseSupplierOutstanding />} />
        <Route path="/monthwise-buyer-outstanding-report" element={<MonthwiseBuyerOutstanding />} />

        {/* user Management  */}
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/create-createMTest" element={<CreateButton />} />
        
      </Routes>
    </>
  );
};

export default App;
