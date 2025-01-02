import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { BadgeIndianRupee, Banknote, Building2, Users } from "lucide-react";

import moment from "moment";
import { IconInfoCircle } from "@tabler/icons-react";
import BASE_URL from "../../base/BaseUrl";

const Loader = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    </Layout>
  );
};
// Stylish Dashboard Card Component
const DashboardCard = ({ icon: Icon, label, value, color = "blue" }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-2xl p-5 border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
    >
      <div className="flex items-center justify-between cursor-pointer">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide ">
            {label}
          </h3>
          <div className="flex items-center space-x-2">
            <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
          </div>
        </div>
        <div className={` p-3 rounded-full`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
    </div>
  );
};

const TableSection = ({ title, columns, data, renderRow }) => (
  <div className="bg-white   border border-gray-200 rounded-lg shadow-sm">
    <div className="px-4 py-3 border-b-2 border-red-500">
      <h3 className="text-lg  flex flex-row items-center  gap-2  text-[black]">
        <IconInfoCircle className="w-4 h-4" />
        <span>{title}</span>
      </h3>
    </div>
    <div className="overflow-x-auto overflow-y-auto h-72">
      <table className="w-full">
        <thead className="bg-[#E1F5FA]  sticky top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3  text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y text-sm divide-gray-200">
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  </div>
);
const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    buyers: 0,
    suppliers: 0,
    payment: 0,
    balance: 0,
    paymentDue: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-dashboard`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDashboardData({
          buyers: response.data.buyer_count,
          suppliers: response.data.supplier_count,
          payment: response.data.payment_sum,
          balance: response.data.balance_sum,
          paymentDue: response.data.payment_due || [],
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <Layout>
      <div className="container rounded-lg mx-auto px-4 py-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            icon={Users}
            label="Total Buyer"
            value={dashboardData.buyers}
            color="blue"
          />
          <DashboardCard
            icon={Building2}
            label="Total Supplier"
            value={dashboardData.suppliers}
            color="green"
          />
          <DashboardCard
            icon={BadgeIndianRupee}
            label="Total Payment"
            color="orange"
            value={dashboardData.payment}
          />
          <DashboardCard
            icon={Banknote}
            label="Total Balance"
            color="purple"
            value={dashboardData.balance}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 mb-4">
          <TableSection
            title="Payment Dues"
            columns={[
              "Billing Date",
              "Billing No",
              "Buyer",
              "Supplier",
              "Total Amount",
              "Received",
              "Balance",
            ]}
            data={dashboardData.paymentDue}
            renderRow={(item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {moment(item.billing_date).format("DD-MM-YYYY")}
                </td>
                <td className="px-4 py-3">{item.billing_no}</td>
                <td className="px-4 py-3">{item.buyer_company}</td>
                <td className="px-4 py-3">{item.vendor_company}</td>
                <td className="px-4 py-3">
                  &#8377;{item.billing_total_amount}
                </td>
                <td className="px-4 py-3">{item.total_received_sum}</td>
                <td className="px-4 py-3">
                  {item.billing_total_amount - item.total_received_sum}
                </td>
              </tr>
            )}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
