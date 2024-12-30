import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../layout/Layout'
import BASE_URL from '../../base/BaseUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { IconEdit, IconPlus } from '@tabler/icons-react';

const SupplierList = () => {
  const [supplierData, setSupplierData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const fetchSupplierData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-vendor-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSupplierData(response.data?.vendor);
    } catch (error) {
      console.error("Error fetching vendor data", error);
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchSupplierData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "vendor_company",
        header: "Company",
        size:150,
       
      },
      {
        accessorKey: "vendor_name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "vendor_mobile",
        header: "Mobile",
        size: 50,
      },
      {
        accessorKey: "vendor_email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "vendor_brand",
        header: "Brand",
        size: 150,
      },
      {
        accessorKey: "vendor_status",
        header: "Status",
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
              
              <div
              onClick={() => navigate(`/supplier-edit/${id}`)}
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
    data: supplierData || [],
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
              Supplier List
            </h1>
            <div className="flex gap-2">
              <button
              onClick={()=>navigate('/createSupplier')}
                className=" flex flex-row items-center gap-1 text-center text-sm font-[400] cursor-pointer  w-[6rem] text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              
              >
                <IconPlus className='w-4 h-4'/>Supplier
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

export default SupplierList