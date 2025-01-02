import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../layout/Layout'
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { PaymentCreate, PaymentEdit } from '../../components/buttonIndex/ButtonComponents';

const PaymentList = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-payment-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPaymentData(response.data?.payment);
    } catch (error) {
      console.error("Error fetching payment data", error);
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "pay_date",
        header: "Date",
        size:150,
       
      },
      {
        accessorKey: "vendor_company",
        header: "Supplier",
        size: 150,
      },
      {
        accessorKey: "buyer_company",
        header: "Buyer",
        size: 50,
      },
      {
        accessorKey: "pay_total",
        header: "Total Amount",
        size: 150,
      },
      {
        accessorKey: "pay_reference",
        header: "Payment Refrence",
        size: 150,
      },
     
     
      {
        id: "id",
        header: "Action",
        size: 20,
        enableHiding: false,
        Cell: ({ row }) => {
          const id = row.original.id;

          return (
            <div className="flex gap-2">
              <PaymentEdit
               onClick={() => navigate(`/payment-edit/${id}`)}
                className="flex items-center space-x-2"
              />
              {/* <div
              onClick={() => navigate(`/payment-edit/${id}`)}
                className="flex items-center space-x-2"
                title="Edit"
              >
                <IconEdit className="h-5 w-5 text-blue-500 cursor-pointer" />
              </div> */}
            
              
              
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: paymentData || [],
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    mantineTableContainerProps: { sx: { maxHeight: "400px" } },
 
    initialState: { columnVisibility: { address: false } },
  });
  return (
  <Layout>
     <div className="max-w-screen">
        
        <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
            <h1 className="border-b-2 font-[400] border-dashed border-orange-800 text-center md:text-left">
              Payment List
            </h1>
            <div className="flex gap-2">
              <PaymentCreate
              onClick={()=>navigate('/createPayment')}
                className=" flex flex-row items-center gap-1 text-center text-sm font-[400] cursor-pointer  w-[6rem] text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              />
              {/* <button
              onClick={()=>navigate('/createPayment')}
                className=" flex flex-row items-center gap-1 text-center text-sm font-[400] cursor-pointer  w-[6rem] text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              
              >
                <IconPlus className='w-4 h-4'/>Payment
              </button> */}
              </div>
          </div>
        </div>

        <div className=" shadow-md">
          <MantineReactTable table={table} />
        </div>
      </div>
  </Layout>
  )
}

export default PaymentList