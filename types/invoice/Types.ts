export interface IInvoiceState {
  invoices: IInvoice[];
  invoiceItems: IInvoiceItem[];
  invoiceItem: IInvoiceItem;
  formPathOrigin: Record<string, any>;
  invoiceAdditions: IInvoiceAddition[];
  invoiceAddition: IInvoiceAddition;
  factorInfo: Record<any, any>;
  selectedInvoice: Record<string, string | boolean>;
  customer: Record<string, string>;
  customerId: string | null;
  customerType: string;
  targetCurrency: Record<string, any> | null;
}
export interface IInvoice {
  id: string;
  org_id: string;
  invoice_number: string;
  user_name: string;
  phone: string;
  buyer_type: string;
  pre_invoice_number: string;
  invoice_status: string;
  is_final: boolean;
  created_at: string;
  send_at: string | null;
  invoice_date: string | null;
  expired_date: string | null;
  total_amount: number;
}
export interface IInvoiceItem {
  product_id: string;
  description: string;
  price: string;
  quantity: string;
  discount_type: string;
  discount: string;
  tax: number;
  totalPrice: number;
  discount_local: number;
  totalTax: number;
  loading: boolean;
  status: string;
  id?: string;
}
export interface IInvoiceAddition {
  name: string;
  price: string;
  loading: boolean;
  status: string;
}
