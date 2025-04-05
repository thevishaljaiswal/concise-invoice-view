
import { InvoiceTotals } from "@/types/invoice";

export const mockInvoiceData: InvoiceTotals = {
  payable: {
    total: 12540.75,
    details: {
      consideration: { value: 9000.00, gst: 900.00 },
      admin: { value: 1200.00, gst: 120.00 },
      other: { value: 800.00, gst: 80.00 },
      interest: { value: 400.00, gst: 40.75 }
    }
  },
  invoice: {
    total: 10540.75,
    details: {
      consideration: { value: 7500.00, gst: 750.00 },
      admin: { value: 1000.00, gst: 100.00 },
      other: { value: 700.00, gst: 70.00 },
      interest: { value: 380.00, gst: 40.75 }
    }
  },
  paid: {
    total: 8250.50,
    details: {
      consideration: { value: 6000.00, gst: 600.00 },
      admin: { value: 800.00, gst: 80.00 },
      other: { value: 500.00, gst: 50.00 },
      interest: { value: 200.00, gst: 20.50 }
    }
  },
  outstanding: {
    total: 2290.25,
    details: {
      consideration: { value: 1500.00, gst: 150.00 },
      admin: { value: 200.00, gst: 20.00 },
      other: { value: 200.00, gst: 20.00 },
      interest: { value: 180.00, gst: 20.25 }
    }
  }
};
