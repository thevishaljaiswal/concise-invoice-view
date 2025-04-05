import React, { useState } from "react";
import { InvoiceTotals } from "@/types/invoice";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoiceTableProps {
  data: InvoiceTotals;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<{[key: string]: boolean}>({
    other: false,
    interest: false
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    currencyDisplay: 'code'
  });

  const formatNumber = (value: number) => {
    return formatter.format(value).replace("USD", "").trim();
  };

  const toggleRow = (rowName: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowName]: !prev[rowName]
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
      
      <Card className="overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-5 bg-gray-100 px-4 py-3 border-b border-gray-200">
          <div className="text-left font-medium">Category</div>
          <div className="text-right font-medium text-purple-700">Total Payable</div>
          <div className="text-right font-medium text-blue-600">Invoice</div>
          <div className="text-right font-medium text-green-600">Paid</div>
          <div className="text-right font-medium text-amber-600">Outstanding</div>
        </div>
        
        {/* Consideration Row */}
        <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-100">
          <div className="text-left font-medium">Consideration</div>
          <div className="text-right">{formatNumber(data.payable.details.consideration.value + data.payable.details.consideration.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.consideration.value + data.invoice.details.consideration.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.consideration.value + data.paid.details.consideration.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.consideration.value + data.outstanding.details.consideration.gst)}</div>
        </div>
        
        {/* Admin Row */}
        <div className="grid grid-cols-5 px-4 py-3 border-b border-gray-100">
          <div className="text-left font-medium">Admin</div>
          <div className="text-right">{formatNumber(data.payable.details.admin.value + data.payable.details.admin.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.admin.value + data.invoice.details.admin.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.admin.value + data.paid.details.admin.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.admin.value + data.outstanding.details.admin.gst)}</div>
        </div>
        
        {/* Other Row - Collapsible for Total Payable */}
        <div 
          className={cn(
            "grid grid-cols-5 px-4 py-3 border-b border-gray-100", 
            "cursor-pointer"
          )}
          onClick={() => toggleRow('other')}
        >
          <div className="text-left font-medium flex items-center gap-1">
            Other
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-right">{formatNumber(data.payable.details.other.value + data.payable.details.other.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.other.value + data.invoice.details.other.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.other.value + data.paid.details.other.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.other.value + data.outstanding.details.other.gst)}</div>
        </div>
        
        {/* Other Discount Row - Only visible for Total Payable when expanded */}
        {expandedRows.other && data.payable.details.other.discount && (
          <div className="grid grid-cols-5 px-4 py-2 bg-gray-50 border-b border-gray-100">
            <div className="text-left text-sm text-gray-500 pl-6">Discount</div>
            <div className="text-right text-sm text-gray-500">
              -{formatNumber(data.payable.details.other.discount.value + data.payable.details.other.discount.gst)}
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        
        {/* Interest Row - Collapsible for Total Payable */}
        <div 
          className={cn(
            "grid grid-cols-5 px-4 py-3 border-b border-gray-100", 
            "cursor-pointer"
          )}
          onClick={() => toggleRow('interest')}
        >
          <div className="text-left font-medium flex items-center gap-1">
            Interest
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-right">{formatNumber(data.payable.details.interest.value + data.payable.details.interest.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.interest.value + data.invoice.details.interest.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.interest.value + data.paid.details.interest.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.interest.value + data.outstanding.details.interest.gst)}</div>
        </div>
        
        {/* Interest Discount Row - Only visible for Total Payable when expanded */}
        {expandedRows.interest && data.payable.details.interest.discount && (
          <div className="grid grid-cols-5 px-4 py-2 bg-gray-50 border-b border-gray-100">
            <div className="text-left text-sm text-gray-500 pl-6">Discount</div>
            <div className="text-right text-sm text-gray-500">
              -{formatNumber(data.payable.details.interest.discount.value + data.payable.details.interest.discount.gst)}
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        
        {/* Total Row */}
        <div className="grid grid-cols-5 px-4 py-3 bg-gray-50 font-semibold">
          <div className="text-left">Total</div>
          <div className="text-right text-purple-700">{formatNumber(data.payable.total)}</div>
          <div className="text-right text-blue-600">{formatNumber(data.invoice.total)}</div>
          <div className="text-right text-green-600">{formatNumber(data.paid.total)}</div>
          <div className="text-right text-amber-600">{formatNumber(data.outstanding.total)}</div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceTable;
