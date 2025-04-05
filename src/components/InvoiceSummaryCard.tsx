
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
}

const InvoiceSummaryCard: React.FC<InvoiceSummaryCardProps> = ({
  title,
  total,
  details,
  colorClass = "text-purple-700",
  bgClass = "bg-white",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <Card className={cn("overflow-hidden transition-all duration-200", bgClass)}>
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="font-medium">{title}</div>
        <div className="flex items-center gap-3">
          <span className={cn("font-semibold text-lg", colorClass)}>
            {formatter.format(total)}
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
          <InvoiceDetailRow label="Consideration" detail={details.consideration} colorClass={colorClass} />
          <InvoiceDetailRow label="Admin" detail={details.admin} colorClass={colorClass} />
          <InvoiceDetailRow label="Other" detail={details.other} colorClass={colorClass} />
          <InvoiceDetailRow label="Interest" detail={details.interest} colorClass={colorClass} />
        </div>
      )}
    </Card>
  );
};

export default InvoiceSummaryCard;
