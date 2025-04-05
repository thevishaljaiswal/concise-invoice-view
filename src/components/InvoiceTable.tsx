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
        {/* Main Headers */}
        <div className="grid grid-cols-9 bg-gray-100 px-4 py-3 border-b border-gray-200 font-medium">
          <div className="text-left col-span-1"></div>
          <div className="text-center col-span-2 text-purple-700">Total Payable</div>
          <div className="text-center col-span-2 text-blue-600">Invoice</div>
          <div className="text-center col-span-2 text-green-600">Paid</div>
          <div className="text-center col-span-2 text-amber-600">Outstanding</div>
        </div>
        
        {/* Value/GST Headers */}
        <div className="grid grid-cols-9 bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium">
          <div className="text-left col-span-1">Category</div>
          <div className="text-right">Value</div>
          <div className="text-right">GST</div>
          <div className="text-right">Value</div>
          <div className="text-right">GST</div>
          <div className="text-right">Value</div>
          <div className="text-right">GST</div>
          <div className="text-right">Value</div>
          <div className="text-right">GST</div>
        </div>
        
        {/* Consideration Row */}
        <div className="grid grid-cols-9 px-4 py-3 border-b border-gray-100">
          <div className="text-left col-span-1 font-medium">Consideration</div>
          <div className="text-right">{formatNumber(data.payable.details.consideration.value)}</div>
          <div className="text-right">{formatNumber(data.payable.details.consideration.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.consideration.value)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.consideration.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.consideration.value)}</div>
          <div className="text-right">{formatNumber(data.paid.details.consideration.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.consideration.value)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.consideration.gst)}</div>
        </div>
        
        {/* Admin Row */}
        <div className="grid grid-cols-9 px-4 py-3 border-b border-gray-100">
          <div className="text-left col-span-1 font-medium">Admin</div>
          <div className="text-right">{formatNumber(data.payable.details.admin.value)}</div>
          <div className="text-right">{formatNumber(data.payable.details.admin.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.admin.value)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.admin.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.admin.value)}</div>
          <div className="text-right">{formatNumber(data.paid.details.admin.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.admin.value)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.admin.gst)}</div>
        </div>
        
        {/* Other Row - Collapsible */}
        <div 
          className={cn(
            "grid grid-cols-9 px-4 py-3 border-b border-gray-100", 
            "cursor-pointer"
          )}
          onClick={() => toggleRow('other')}
        >
          <div className="text-left col-span-1 font-medium flex items-center gap-1">
            Other
            {expandedRows.other ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <div className="text-right">{formatNumber(data.payable.details.other.value)}</div>
          <div className="text-right">{formatNumber(data.payable.details.other.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.other.value)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.other.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.other.value)}</div>
          <div className="text-right">{formatNumber(data.paid.details.other.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.other.value)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.other.gst)}</div>
        </div>
        
        {/* Other Discount Row - Only visible when expanded */}
        {expandedRows.other && data.payable.details.other.discount && (
          <div className="grid grid-cols-9 px-4 py-2 bg-gray-50 border-b border-gray-100">
            <div className="text-left col-span-1 text-sm text-gray-500 pl-6">Discount</div>
            <div className="text-right text-sm text-gray-500">
              -{formatNumber(data.payable.details.other.discount.value)}
            </div>
            <div className="text-right text-sm text-gray-500">
              -{formatNumber(data.payable.details.other.discount.gst)}
            </div>
            <div className="col-span-6"></div>
          </div>
        )}
        
        {/* Interest Row - Collapsible */}
        <div 
          className={cn(
            "grid grid-cols-9 px-4 py-3 border-b border-gray-100", 
            "cursor-pointer"
          )}
          onClick={() => toggleRow('interest')}
        >
          <div className="text-left col-span-1 font-medium flex items-center gap-1">
            Interest
            {expandedRows.interest ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <div className="text-right">{formatNumber(data.payable.details.interest.value)}</div>
          <div className="text-right">{formatNumber(data.payable.details.interest.gst)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.interest.value)}</div>
          <div className="text-right">{formatNumber(data.invoice.details.interest.gst)}</div>
          <div className="text-right">{formatNumber(data.paid.details.interest.value)}</div>
          <div className="text-right">{formatNumber(data.paid.details.interest.gst)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.interest.value)}</div>
          <div className="text-right">{formatNumber(data.outstanding.details.interest.gst)}</div>
        </div>
        
        {/* Interest Discount Row - Only visible when expanded */}
        {expandedRows.interest && data.payable.details.interest.discount && (
          <div className="grid grid-cols-9 px-4 py-2 bg-gray-50 border-b border-gray-100">
            <div className="text-left col-span-1 text-sm text-gray-500 pl-6">Discount</div>
            <div className="text-right text-sm text-gray-500">
              -{formatNumber(data.payable.details.interest.discount.value)}
            </div>
            <div className="text-right text-sm text-gray-500">
              -{formatNumber(data.payable.details.interest.discount.gst)}
            </div>
            <div className="col-span-6"></div>
          </div>
        )}
        
        {/* Subtotals for Value & GST */}
        <div className="grid grid-cols-9 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="text-left col-span-1 font-medium">Subtotal</div>
          <div className="text-right font-medium">
            {formatNumber(
              data.payable.details.consideration.value +
              data.payable.details.admin.value +
              data.payable.details.other.value +
              data.payable.details.interest.value
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.payable.details.consideration.gst +
              data.payable.details.admin.gst +
              data.payable.details.other.gst +
              data.payable.details.interest.gst
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.invoice.details.consideration.value +
              data.invoice.details.admin.value +
              data.invoice.details.other.value +
              data.invoice.details.interest.value
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.invoice.details.consideration.gst +
              data.invoice.details.admin.gst +
              data.invoice.details.other.gst +
              data.invoice.details.interest.gst
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.paid.details.consideration.value +
              data.paid.details.admin.value +
              data.paid.details.other.value +
              data.paid.details.interest.value
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.paid.details.consideration.gst +
              data.paid.details.admin.gst +
              data.paid.details.other.gst +
              data.paid.details.interest.gst
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.outstanding.details.consideration.value +
              data.outstanding.details.admin.value +
              data.outstanding.details.other.value +
              data.outstanding.details.interest.value
            )}
          </div>
          <div className="text-right font-medium">
            {formatNumber(
              data.outstanding.details.consideration.gst +
              data.outstanding.details.admin.gst +
              data.outstanding.details.other.gst +
              data.outstanding.details.interest.gst
            )}
          </div>
        </div>
        
        {/* Total Row */}
        <div className="grid grid-cols-9 px-4 py-3 bg-gray-100 font-semibold">
          <div className="text-left col-span-1">Total</div>
          <div className="text-right col-span-2 text-purple-700">{formatNumber(data.payable.total)}</div>
          <div className="text-right col-span-2 text-blue-600">{formatNumber(data.invoice.total)}</div>
          <div className="text-right col-span-2 text-green-600">{formatNumber(data.paid.total)}</div>
          <div className="text-right col-span-2 text-amber-600">{formatNumber(data.outstanding.total)}</div>
        </div>
      </Card>
    </div>
  );
};

export default InvoiceTable;
