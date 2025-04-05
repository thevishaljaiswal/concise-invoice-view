
import React from "react";
import { DetailItem } from "@/types/invoice";
import { cn } from "@/lib/utils";

interface InvoiceDetailRowProps {
  label: string;
  detail: DetailItem;
  colorClass?: string;
  showDiscount?: boolean;
}

const InvoiceDetailRow: React.FC<InvoiceDetailRowProps> = ({
  label,
  detail,
  colorClass = "text-gray-600",
  showDiscount = false,
}) => {
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
      <div className="grid grid-cols-3 text-sm py-1 border-b border-gray-100">
        <div className={cn("text-left font-medium", colorClass)}>{label}</div>
        <div className="text-right">{formatNumber(detail.value)}</div>
        <div className="text-right">{formatNumber(detail.gst)}</div>
      </div>
      
      {showDiscount && detail.discount && (
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
