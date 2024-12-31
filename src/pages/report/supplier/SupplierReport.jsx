import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Title, Container, Center } from "@mantine/core";
import Layout from "../../../layout/Layout";
import { useReactToPrint } from "react-to-print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import BASE_URL from "../../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";

const SupplierReport = () => {
  const [vendors, setVendors] = useState([]);
  const reportRef = useRef();

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${BASE_URL}/api/panel-fetch-vendor-report`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "report-view": "true",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVendors(data.vendor || []);
        } else {
          console.error("Failed to fetch vendor data");
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendors();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: "Supplier Report",
    pageStyle: `
      @page {
        margin: 2mm;
      }
      body {
        font-family: Arial, sans-serif;
        background: white;
        color: black;
        padding: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
      }
      th {
        background: white;
        color: black;
      }
    `,
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
        { text: "Supplier Report", style: "header", alignment: "center" },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "15%", "15%", "20%", "20%", "10%", "10%"],
            body: [
              [
                { text: "Sl No", style: "tableHeader" },
                { text: "Company", style: "tableHeader" },
                { text: "Name", style: "tableHeader" },
                { text: "Mobile", style: "tableHeader" },
                { text: "Email", style: "tableHeader" },
                { text: "Brand", style: "tableHeader" },
                { text: "Status", style: "tableHeader" },
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
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: "black",
        },
      },
      defaultStyle: {
        fontSize: 8,
      },
      pageMargins: [20, 20, 20, 20],
    };

    pdfMake.createPdf(docDefinition).download("Supplier_Report.pdf");
  };


  const downloadReport = async (url, fileName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      console.log(`${fileName} downloaded successfully.`);
      // toast.success("Member data Download");
    } catch (err) {
      console.error(`Error downloading ${fileName}:`, err);
      toast.error("Err on Downloading");
    }
  };

  const downloadVendorReport = (e) => {
    e.preventDefault();
    downloadReport(
      `${BASE_URL}/api/panel-download-vendor-report`,
      "Vendor_Report.csv"
    );
    toast.success("Vendor Report Download Successfully");
  };

  return (
    <Layout>
      <div className="p-6  max-w-screen bg-white">
        <div ref={reportRef} className="bg-white">
          <Title
            align="center"
            className="text-xl font-bold text-black mb-4 print:mt-4"
          >
            Supplier Report
          </Title>
          <Table
            striped
            highlightOnHover
            className="w-full border border-black"
          >
            <thead>
              <tr className="bg-white text-black">
                <th className="text-center p-2 border border-black">Sl No</th>
                <th className="text-left p-2 border border-black">Company</th>
                <th className="text-left p-2 border border-black">Name</th>
                <th className="text-left p-2 border border-black">Mobile</th>
                <th className="text-left p-2 border border-black">Email</th>
                <th className="text-left p-2 border border-black">Brand</th>
                <th className="text-left p-2 border border-black">Status</th>
                <th className="text-left p-2 border border-black"></th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={index}>
                  <td className="text-center p-2 border border-black">
                    {index + 1}
                  </td>
                  <td className="p-2 border border-black">
                    {vendor.vendor_company}
                  </td>
                  <td className="p-2 border border-black">
                    {vendor.vendor_name}
                  </td>
                  <td className="p-2 border border-black">
                    {vendor.vendor_mobile}
                  </td>
                  <td className="p-2 border border-black">
                    {vendor.vendor_email}
                  </td>
                  <td className="p-2 border border-black">
                    {vendor.vendor_brand}
                  </td>
                  <td className="p-2 border border-black">
                    {vendor.vendor_status}
                  </td>
                  <td className="p-2 border border-black"></td>
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
            className="mr-4 bg-green-600 hover:bg-green-700"
          >
            Download PDF
          </Button>
           <Button
                      onClick={downloadVendorReport}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Download Report
                    </Button>
        </Center>
      </div>
    </Layout>
  );
};

export default SupplierReport;
