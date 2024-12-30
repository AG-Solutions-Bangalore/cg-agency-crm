import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../base/BaseUrl';
import axios from 'axios';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const BillingList = () => {
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const fetchBuyerData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-billing-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBillingData(response.data?.billing);
    } catch (error) {
      console.error("Error fetching billing data", error);
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "billing_date",
        header: "Date",
        size:150,
       
      },
      {
        accessorKey: "billing_no",
        header: "Bill No",
        size: 150,
      },
      {
        accessorKey: "vendor_company",
        header: "Supplier",
        size: 50,
      },
      {
        accessorKey: "buyer_company",
        header: "Buyer",
        size: 150,
      },
      {
        accessorKey: "billing_total_amount",
        header: "Total Amount",
        size: 150,
      },
      {
        accessorKey: "billing_tax",
        header: "Tax",
        size: 150,
      },
      {
        accessorKey: "billing_discount",
        header: "	Discount",
        size: 150,
      },
      {
        accessorKey: "billing_other",
        header: "Other",
        size: 50,
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
              
              <div
                onClick={() => navigate(`/billing-edit/${id}`)}
                className="flex items-center space-x-2"
                title="Edit"
              >
                <IconEdit className="h-5 w-5 text-blue-500 cursor-pointer" />
              </div>
            
              
              
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: billingData || [],
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
              Billing List
            </h1>
            <div className="flex gap-2">
              <button
              onClick={()=>navigate('/createBilling')}
                className=" flex flex-row items-center gap-1 text-center text-sm font-[400] cursor-pointer  w-[7rem] text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              
              >
                <IconPlus className='w-4 h-4'/> Billing
              </button>
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

export default BillingList