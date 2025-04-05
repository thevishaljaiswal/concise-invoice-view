
export interface DiscountItem {
  value: number;
  gst: number;
}

export interface DetailItem {
  value: number;
  gst: number;
  discount?: DiscountItem;
}

export interface InvoiceDetails {
  consideration: DetailItem;
  admin: DetailItem;
  other: DetailItem;
  interest: DetailItem;
}

export interface InvoiceTotals {
  payable: {
    total: number;
    details: InvoiceDetails;
  };
  invoice: {
    total: number;
    details: InvoiceDetails;
  };
  paid: {
    total: number;
    details: InvoiceDetails;
  };
  outstanding: {
    total: number;
    details: InvoiceDetails;
  };
}
