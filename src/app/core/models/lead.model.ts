export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: string;
  status: 'New' | 'Qualified' | 'Quoted' | 'Won' | 'Lost';
  assignedTo: string;
  createdAt: Date;
}