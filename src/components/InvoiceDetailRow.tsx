
import React, { useState } from "react";
import { DetailItem } from "@/types/invoice";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface InvoiceDetailRowProps {
  label: string;
  detail: DetailItem;
  colorClass?: string;
  showDiscount?: boolean;
  collapsible?: boolean;
}

const InvoiceDetailRow: React.FC<InvoiceDetailRowProps> = ({
  label,
  detail,
  colorClass = "text-gray-600",
  showDiscount = false,
  collapsible = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    currencyDisplay: 'code'
  });

  // Format number without the currency code
  const formatNumber = (value: number) => {
    return formatter.format(value).replace("USD", "").trim();
  };

  return (
    <>
      <div 
        className={cn(
          "grid grid-cols-3 text-sm py-1 border-b border-gray-100", 
          collapsible && "cursor-pointer"
        )}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className={cn("text-left font-medium flex items-center gap-1", colorClass)}>
          {label}
          {collapsible && (
            isExpanded ? 
              <ChevronUp className="h-3 w-3 text-gray-500" /> : 
              <ChevronDown className="h-3 w-3 text-gray-500" />
          )}
        </div>
        <div className="text-right">{formatNumber(detail.value)}</div>
        <div className="text-right">{formatNumber(detail.gst)}</div>
      </div>
      
      {(showDiscount && detail.discount && (!collapsible || (collapsible && isExpanded))) && (
        <div className="grid grid-cols-3 text-xs py-1 pl-4 border-b border-gray-100 text-gray-500">
          <div className="text-left">Discount</div>
          <div className="text-right">-{formatNumber(detail.discount.value)}</div>
          <div className="text-right">-{formatNumber(detail.discount.gst)}</div>
        </div>
      )}
    </>
  );
};

export default InvoiceDetailRow;
