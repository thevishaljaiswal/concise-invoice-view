
import React, { useState } from "react";
import { InvoiceDetails } from "@/types/invoice";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import InvoiceDetailRow from "./InvoiceDetailRow";
import { cn } from "@/lib/utils";

interface InvoiceSummaryCardProps {
  title: string;
  total: number;
  details: InvoiceDetails;
  colorClass?: string;
  bgClass?: string;
  showDiscounts?: boolean;
}

const InvoiceSummaryCard: React.FC<InvoiceSummaryCardProps> = ({
  title,
  total,
  details,
  colorClass = "text-purple-700",
  bgClass = "bg-white",
  showDiscounts = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    currencyDisplay: 'code'
  });

  const formatNumber = (value: number) => {
    return formatter.format(value).replace("USD", "").trim();
  };

  const valueTotal = details.consideration.value + details.admin.value + 
                     details.other.value + details.interest.value;
  const gstTotal = details.consideration.gst + details.admin.gst + 
                   details.other.gst + details.interest.gst;

  const getNetValue = (item) => {
    if (item.discount) {
      return item.value - item.discount.value;
    }
    return item.value;
  };

  const getNetGST = (item) => {
    if (item.discount) {
      return item.gst - item.discount.gst;
    }
    return item.gst;
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-200", bgClass)}>
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-3">
          <span className={cn("font-semibold text-lg", colorClass)}>
            {formatNumber(total)}
          </span>
          {isExpanded ? 
            <ChevronUp className="h-4 w-4 text-gray-500" /> : 
            <ChevronDown className="h-4 w-4 text-gray-500" />
          }
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-3 bg-gray-50 animate-accordion-down">
          <div className="grid grid-cols-3 text-xs font-medium text-gray-500 py-2">
            <div className="text-left">Category</div>
            <div className="text-right">Value</div>
            <div className="text-right">GST</div>
          </div>
          <InvoiceDetailRow label="Consideration" detail={details.consideration} colorClass={colorClass} showDiscount={showDiscounts} />
          <InvoiceDetailRow label="Admin" detail={details.admin} colorClass={colorClass} showDiscount={showDiscounts} />
          
          <InvoiceDetailRow label="Other" detail={details.other} colorClass={colorClass} showDiscount={showDiscounts} />
          <InvoiceDetailRow label="Interest" detail={details.interest} colorClass={colorClass} showDiscount={showDiscounts} />
          
          <div className="grid grid-cols-3 text-sm py-2 mt-1 border-t border-gray-300">
            <div className={cn("text-left font-medium", colorClass)}>Total</div>
            <div className="text-right font-semibold">{formatNumber(valueTotal)}</div>
            <div className="text-right font-semibold">{formatNumber(gstTotal)}</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default InvoiceSummaryCard;
