import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LayoutDashboard, Search, MoreHorizontal, Eye, FileText, Truck } from 'lucide-react';

const sampleOrders = [
  { id: 'ORD001', customer: 'Liam Johnson', email: 'liam@example.com', date: '2023-10-26', status: 'Delivered', total: '$250.00', items: [{name: 'Product A', qty: 2}, {name: 'Product B', qty: 1}] },
  { id: 'ORD002', customer: 'Olivia Smith', email: 'olivia@example.com', date: '2023-10-25', status: 'Shipped', total: '$150.00', items: [{name: 'Product C', qty: 1}] },
  { id: 'ORD003', customer: 'Noah Williams', email: 'noah@example.com', date: '2023-10-24', status: 'Processing', total: '$350.00', items: [{name: 'Product D', qty: 3}] },
  { id: 'ORD004', customer: 'Emma Brown', email: 'emma@example.com', date: '2023-10-23', status: 'Pending', total: '$450.00', items: [{name: 'Product E', qty: 1}, {name: 'Product F', qty: 2}] },
  { id: 'ORD005', customer: 'Ava Jones', email: 'ava@example.com', date: '2023-10-22', status: 'Cancelled', total: '$50.00', items: [{name: 'Product G', qty: 1}] },
];

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered': return 'default'; // Green in many themes, but 'default' for shadcn (primary)
    case 'shipped': return 'secondary'; // Blue/Info
    case 'processing': return 'outline'; // Yellow/Warning-like
    case 'pending': return 'destructive'; // Red/Danger-like
    case 'cancelled': return 'secondary'; // Gray/Muted
    default: return 'outline';
  }
};


const OrdersPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<(typeof sampleOrders[0]) | null>(null);
  console.log('OrdersPage loaded');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar className="hidden border-r bg-background md:block" />

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="flex flex-col p-0 max-w-[220px] lg:max-w-[280px]">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
              <LayoutDashboard className="h-6 w-6" />
              <span>Dashboard Co.</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar className="block border-r-0 md:hidden" />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex flex-col">
        <Header onToggleSidebar={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 flex flex-col gap-4 p-4 sm:px-6 md:gap-8 lg:p-6 xl:px-8 overflow-hidden">
          <div className="flex items-center justify-between space-y-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
          </div>

          <Card>
            <CardHeader className="px-7">
              <div className="flex items-center justify-between">
                <CardTitle>Orders List</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search orders..." className="pl-8 w-full md:w-[250px]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="flex-1"> {/* ScrollArea for Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Button>
                            </DialogTrigger>
                            {selectedOrder && selectedOrder.id === order.id && (
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                                  <DialogDescription>
                                    Customer: {selectedOrder.customer} ({selectedOrder.email})
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                                  <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedOrder.status) as any}>{selectedOrder.status}</Badge></p>
                                  <p><strong>Total:</strong> {selectedOrder.total}</p>
                                  <h4 className="font-semibold mt-2">Items:</h4>
                                  <ul>{selectedOrder.items.map(item => <li key={item.name}>{item.name} (Qty: {item.qty})</li>)}</ul>
                                </div>
                                <DialogFooter>
                                  <Button type="button" variant="secondary">Close</Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> View Invoice</DropdownMenuItem>
                              <DropdownMenuItem><Truck className="mr-2 h-4 w-4" /> Track Shipment</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardContent className="p-7 pt-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default OrdersPage;