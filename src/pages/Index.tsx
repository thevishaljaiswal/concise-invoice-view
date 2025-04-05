
import InvoiceTable from "@/components/InvoiceTable";
import { mockInvoiceData } from "@/data/mockInvoiceData";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Concise Invoice View</h1>
      <InvoiceTable data={mockInvoiceData} />
    </div>
  );
};

export default Index;
