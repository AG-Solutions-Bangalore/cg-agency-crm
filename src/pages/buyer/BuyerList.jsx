import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../layout/Layout'
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../base/BaseUrl';
import axios from 'axios';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { BillingCreate, BuyerCreate, BuyerEdit } from '../../components/buttonIndex/ButtonComponents';

const BuyerList = () => {
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const fetchBuyerData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-buyer-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBuyerData(response.data?.buyer);
    } catch (error) {
      console.error("Error fetching buyer data", error);
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
        accessorKey: "buyer_company",
        header: "Company",
        size:150,
       
      },
      {
        accessorKey: "buyer_name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "buyer_mobile",
        header: "Mobile",
        size: 50,
      },
      {
        accessorKey: "buyer_email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "buyer_status",
        header: "Status",
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
              <BuyerEdit
                onClick={() => navigate(`/buyer-edit/${id}`)}
                className="flex items-center space-x-2"
              />
              {/* <div
                onClick={() => navigate(`/buyer-edit/${id}`)}
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
    data: buyerData || [],
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
              Buyer List
            </h1>
            <div className="flex gap-2">
              <BuyerCreate
                 onClick={()=>navigate('/createBuyer')}
                className=" flex flex-row items-center gap-1 text-center text-sm font-[400] cursor-pointer  w-[5rem] text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              />
              {/* <button
              onClick={()=>navigate('/createBuyer')}
                className=" flex flex-row items-center gap-1 text-center text-sm font-[400] cursor-pointer  w-[7rem] text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              
              >
                <IconPlus className='w-4 h-4'/> Buyer
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

export default BuyerList