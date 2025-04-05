
import React from "react";
import { InvoiceTotals } from "@/types/invoice";
import InvoiceSummaryCard from "./InvoiceSummaryCard";

interface InvoiceTableProps {
  data: InvoiceTotals;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ data }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
      
      {/* Category Headers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-1">
        <div></div> {/* Empty space for card titles */}
        <div className="grid grid-cols-3 text-xs font-medium text-gray-500 px-4">
          <div className="text-left">Category</div>
          <div className="text-right">Value</div>
          <div className="text-right">GST</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <InvoiceSummaryCard 
          title="Total Payable" 
          total={data.payable.total} 
          details={data.payable.details}
          colorClass="text-purple-700"
          showDiscounts={true}
          showCategoryHeader={false}
        />
        <InvoiceSummaryCard 
          title="Total Invoice" 
          total={data.invoice.total} 
          details={data.invoice.details} 
          colorClass="text-blue-600"
          bgClass="bg-blue-50/50"
          showCategoryHeader={false}
        />
        <InvoiceSummaryCard 
          title="Total Paid" 
          total={data.paid.total} 
          details={data.paid.details}
          colorClass="text-green-600" 
          bgClass="bg-green-50/50"
          showCategoryHeader={false}
        />
        <InvoiceSummaryCard 
          title="Outstanding" 
          total={data.outstanding.total} 
          details={data.outstanding.details}
          colorClass="text-amber-600"
          bgClass="bg-amber-50/50"
          showCategoryHeader={false} 
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
