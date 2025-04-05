
import React from "react";
import { DetailItem } from "@/types/invoice";
import { cn } from "@/lib/utils";

interface InvoiceDetailRowProps {
  label: string;
  detail: DetailItem;
  colorClass?: string;
}

const InvoiceDetailRow: React.FC<InvoiceDetailRowProps> = ({
  label,
  detail,
  colorClass = "text-gray-600",
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <div className="grid grid-cols-3 text-sm py-1 border-b border-gray-100">
      <div className={cn("text-left font-medium", colorClass)}>{label}</div>
      <div className="text-right">{formatter.format(detail.value)}</div>
      <div className="text-right">{formatter.format(detail.gst)}</div>
    </div>
  );
};

export default InvoiceDetailRow;
