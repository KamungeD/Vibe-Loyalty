export interface Customer {
  id: string;
  name: string;
  phone: string;
  points: number;
  visits: number;
  created_at: string;
}

export interface Visit {
  id: string;
  customer_id: string;
  timestamp: string;
}