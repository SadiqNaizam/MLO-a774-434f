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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LayoutDashboard, Search, MoreHorizontal, Eye, Mail, UserCheck } from 'lucide-react';

const sampleCustomers = [
  { id: 'CUST001', name: 'Alice Wonderland', email: 'alice@example.com', joinedDate: '2023-01-15', totalOrders: 5, totalSpent: 450.00, segment: 'VIP', avatarUrl: 'https://via.placeholder.com/40/FFADAD/000000?Text=AW' },
  { id: 'CUST002', name: 'Bob The Builder', email: 'bob@example.com', joinedDate: '2023-03-22', totalOrders: 2, totalSpent: 120.50, segment: 'New', avatarUrl: 'https://via.placeholder.com/40/FFD6A5/000000?Text=BB' },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', joinedDate: '2022-11-05', totalOrders: 10, totalSpent: 890.75, segment: 'Loyal', avatarUrl: 'https://via.placeholder.com/40/FDFFB6/000000?Text=CB' },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana@example.com', joinedDate: '2023-05-10', totalOrders: 1, totalSpent: 75.00, segment: 'New', avatarUrl: 'https://via.placeholder.com/40/CAFFBF/000000?Text=DP' },
  { id: 'CUST005', name: 'Edward Scissorhands', email: 'edward@example.com', joinedDate: '2023-02-01', totalOrders: 3, totalSpent: 210.00, segment: 'Regular', avatarUrl: 'https://via.placeholder.com/40/9BF6FF/000000?Text=ES' },
];

const getSegmentBadgeVariant = (segment: string) => {
  switch (segment.toLowerCase()) {
    case 'vip': return 'default';
    case 'loyal': return 'secondary';
    case 'new': return 'outline';
    default: return 'outline';
  }
};

const CustomersPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof sampleCustomers[0]) | null>(null);
  console.log('CustomersPage loaded');

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
            <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          </div>

          <Card>
            <CardHeader className="px-7">
              <div className="flex items-center justify-between">
                <CardTitle>Customers List</CardTitle>
                 <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search customers..." className="pl-8 w-full md:w-[250px]" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by segment" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Segments</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="loyal">Loyal</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10 rounded-full">
                            <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                            <AvatarFallback>{customer.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.joinedDate}</TableCell>
                        <TableCell>
                          <Badge variant={getSegmentBadgeVariant(customer.segment) as any}>{customer.segment}</Badge>
                        </TableCell>
                        <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                               <Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(customer)}>
                                <Eye className="h-4 w-4" /> <span className="sr-only">View Profile</span>
                              </Button>
                            </DialogTrigger>
                            {selectedCustomer && selectedCustomer.id === customer.id && (
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle>Customer Profile: {selectedCustomer.name}</DialogTitle>
                                <DialogDescription>
                                    Details for {selectedCustomer.email}. Joined on {selectedCustomer.joinedDate}.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-2">
                                    <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                                    <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}</p>
                                    <p><strong>Segment:</strong> <Badge variant={getSegmentBadgeVariant(selectedCustomer.segment) as any}>{selectedCustomer.segment}</Badge></p>
                                    <h4 className="font-semibold mt-2">Order History (Sample)</h4>
                                    <ul className="list-disc list-inside text-sm">
                                        <li>Order #ORD123 - $150.00</li>
                                        <li>Order #ORD124 - $75.50</li>
                                    </ul>
                                </div>
                                <DialogFooter>
                                <Button type="button" variant="secondary">Close</Button>
                                </DialogFooter>
                            </DialogContent>
                            )}
                          </Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                                <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4" /> Mark as VIP</DropdownMenuItem>
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

export default CustomersPage;