import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../layout/Layout'
import axios from 'axios';
import BASE_URL from '../../base/BaseUrl';
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Table, Button, Title, Container, Center } from "@mantine/core";
const MonthWiseInvoiceReport = () => {
    const [payments, setPayments] = useState([]);
    const [groupedPayments, setGroupedPayments] = useState({});
    const reportRef = useRef();
  
    useEffect(() => {
      const fetchPayments = async () => {
        const token = localStorage.getItem("token");
        const from_date = localStorage.getItem("from_date");
        const to_date = localStorage.getItem("to_date");
        const invoice_to_id = localStorage.getItem("invoice_to_id");
        const invoice_from_id = localStorage.getItem("invoice_from_id");
  
        try {
          const response = await axios.post(
            `${BASE_URL}/api/panel-fetch-invoice-monthwise-report`,
            {
              from_date,
              to_date,
              invoice_to_id,
              invoice_from_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.data.invoice) {
            setPayments(response.data.invoice);
            groupPaymentsByVendorAndDate(response.data.invoice);
          }
        } catch (error) {
          console.error("Error fetching payment data:", error);
          toast.error("Failed to fetch payment data");
        }
      };
  
      fetchPayments();
    }, []);
  
    const groupPaymentsByVendorAndDate = (payments) => {
      const grouped = payments.reduce((acc, payment) => {
        const { vendor_company, invoice_date } = payment;
        if (!acc[vendor_company]) {
          acc[vendor_company] = {};
        }
        if (!acc[vendor_company][invoice_date]) {
          acc[vendor_company][invoice_date] = [];
        }
        acc[vendor_company][invoice_date].push(payment);
        return acc;
      }, {});
      setGroupedPayments(grouped);
    };
  
    const handlePrint = useReactToPrint({
      content: () => reportRef.current,
      documentTitle: "MonthWise Invoice Report",
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
  
    const handlePdfDownload = () => {
      const content = [];
  
      Object.entries(groupedPayments).forEach(([vendor, dates]) => {
        content.push({
          text: `Vendor: ${vendor}`,
          style: "vendorHeader",
          margin: [0, 10, 0, 5],
        });
  
        Object.entries(dates).forEach(([date, payments]) => {
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          });
  
          content.push({
            text: formattedDate,
            style: "dateHeader",
            margin: [0, 5, 0, 5],
          });
  
          const tableBody = payments.map((payment, index) => [
            index + 1,
            payment.buyer_company,
            payment.invoice_date,
            payment.invoice_sub_bill_no,
            payment.invoice_sub_total,
          ]);
  
          content.push({
            table: {
              headerRows: 1,
              widths: ["8%", "23%", "23%", "23%","23%"],
              body: [
                [
                  { text: "Sl No", style: "tableHeader" },
                  { text: "Buyer", style: "tableHeader" },
                  { text: "Billing Date", style: "tableHeader" },
                  { text: "Billing No", style: "tableHeader" },
                  { text: "Total  Amount", style: "tableHeader" },
                  
                ],
                ...tableBody,
              ],
            },
            margin: [0, 0, 0, 10],
          });
        });
      });
  
      const docDefinition = {
        content: [
          {
            text: "MonthWise Invoice Report",
            style: "header",
            alignment: "center",
          },
          ...content,
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          vendorHeader: {
            fontSize: 14,
            bold: true,
          },
          dateHeader: {
            fontSize: 12,
            bold: true,
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
  
      pdfMake.createPdf(docDefinition).download("Monthwise_Invoice_Report.pdf");
    };
  
    const downloadReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const from_date = localStorage.getItem("from_date");
        const to_date = localStorage.getItem("to_date");
        const invoice_to_id = localStorage.getItem("invoice_to_id");
        const invoice_from_id = localStorage.getItem("invoice_from_id");
  
        const res = await axios.post(
          `${BASE_URL}/api/panel-download-invoice-monthwise-report`,
          {
            from_date,
            to_date,
            invoice_to_id,
            invoice_from_id,
          },
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
        link.setAttribute("download", "MonthWise_Payment_Report.csv");
        document.body.appendChild(link);
        link.click();
  
        toast.success("Report downloaded successfully");
      } catch (err) {
        console.error("Error downloading report:", err);
        toast.error("Error downloading report");
      }
    };
  
  return (
   <Layout>
     <div className="p-6 max-w-screen bg-white">
           <div ref={reportRef} className="bg-white">
             
             <Title
               align="center"
               className="text-xl font-bold text-black mb-4 print:mt-4"
             >
               MonthWise Invoice Report
             </Title>
           
   
             {Object.entries(groupedPayments).map(([vendor, dates]) => (
               <div key={vendor} className="mb-4">
                 <h2 className="text-lg font-bold mb-2">Vendor: {vendor}</h2>
   
                 {Object.entries(dates).map(([date, payments]) => {
                   const formattedDate = new Date(date).toLocaleDateString(
                     "en-US",
                     {
                       year: "numeric",
                       month: "long",
                     }
                   );
   
                   return (
                     <div key={date} className="mb-">
                       <h3 className="text-md font-semibold mb-2">
                         {formattedDate}
                       </h3>
                       <Table
                         striped
                         highlightOnHover
                         className="w-full border border-black"
                       >
                         <thead>
                           <tr className="bg-white text-black">
                             <th className="text-center p-2 border border-black">
                               Sl No
                             </th>
                             <th className="text-center p-2 border border-black">
                               Buyer
                             </th>
                             <th className="text-center p-2 border border-black">
                               Billing Date
                             </th>
                             <th className="text-center p-2 border border-black">
                               Billing No
                             </th>
   
                             <th className="text-center p-2 border border-black  w-28 ">
                               Total  Amount
                             </th>
                             <th className=" p-2 border border-black "></th>
                           </tr>
                         </thead>
                         <tbody>
                           {payments.map((payment, index) => (
                             <tr key={index}>
                               <td className="text-center p-2 border border-black">
                                 {index + 1}
                               </td>
                               <td className="text-center p-2 border border-black">
                                 {payment.buyer_company}
                               </td>
                               <td className="text-center p-2 border border-black">
                                 {payment.invoice_date}
                               </td>
                               <td className="text-center p-2 border border-black">
                                 {payment.invoice_sub_bill_no}
                               </td>
   
                               <td className="text-right p-2 border border-black ">
                                 {payment.invoice_sub_total}
                               </td>
                               <td className=" p-2 border border-black "></td>
                             </tr>
                           ))}
                         </tbody>
                       </Table>
                     </div>
                   );
                 })}
               </div>
             ))}
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
               onClick={downloadReport}
               className="bg-orange-600 hover:bg-orange-700"
             >
               Download Report
             </Button>
           </Center>
         </div>
   </Layout>
  )
}

export default MonthWiseInvoiceReport