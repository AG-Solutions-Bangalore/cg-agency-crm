import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Title, Container, Center } from '@mantine/core';
import Layout from '../../../layout/Layout';
import { useReactToPrint } from 'react-to-print';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import BASE_URL from '../../../base/BaseUrl';

const SupplierReport = () => {
  const [vendors, setVendors] = useState([]);
  const reportRef = useRef();

  
  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await fetch(`${BASE_URL}/api/panel-fetch-vendor-report`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'report-view': 'true',
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVendors(data.vendor || []);
        } else {
          console.error('Failed to fetch vendor data');
        }
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchVendors();
  }, []);

  // Print functionality using react-to-print
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: 'Supplier Report',
  });

  // Generate PDF using pdfMake
  const handlePdfDownload = () => {
    const tableBody = vendors.map((vendor, index) => [
      index + 1,
      vendor.vendor_company,
      vendor.vendor_name,
      vendor.vendor_mobile,
      vendor.vendor_email,
      vendor.vendor_brand,
      vendor.vendor_status,
    ]);

    const docDefinition = {
      content: [
        { text: 'Supplier Details', style: 'header', alignment: 'center' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Sl No', style: 'tableHeader' },
                { text: 'Company', style: 'tableHeader' },
                { text: 'Name', style: 'tableHeader' },
                { text: 'Mobile', style: 'tableHeader' },
                { text: 'Email', style: 'tableHeader' },
                { text: 'Brand', style: 'tableHeader' },
                { text: 'Status', style: 'tableHeader' },
              ],
              ...tableBody,
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black',
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake.createPdf(docDefinition).download('Supplier_Report.pdf');
  };

  return (
    <Layout>
      <Container className="p-6">
        <Title align="center" className="mb-6 text-2xl font-bold">
          Supplier Report
        </Title>
        <div ref={reportRef}>
          <Table
            striped
            highlightOnHover
            className="border border-gray-300 shadow-md"
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="text-center p-2">Sl No</th>
                <th className="text-left p-2">Company</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Mobile</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Brand</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index}>
                  <td className="text-center p-2">{index + 1}</td>
                  <td className="p-2">{vendor.vendor_company}</td>
                  <td className="p-2">{vendor.vendor_name}</td>
                  <td className="p-2">{vendor.vendor_mobile}</td>
                  <td className="p-2">{vendor.vendor_email}</td>
                  <td className="p-2">{vendor.vendor_brand}</td>
                  <td
                    className={`p-2 ${
                      vendor.vendor_status === 'Active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {vendor.vendor_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Center className="mt-6">
          <Button
            onClick={handlePrint}
            className="mr-4 bg-blue-600 hover:bg-blue-700"
          >
            Print
          </Button>
          <Button
            onClick={handlePdfDownload}
            className="bg-green-600 hover:bg-green-700"
          >
            Download PDF
          </Button>
        </Center>
      </Container>
    </Layout>
  );
};

export default SupplierReport;
