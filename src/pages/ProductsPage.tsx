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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Shadcn Form
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LayoutDashboard, Search, PlusCircle, MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { useForm } from "react-hook-form"; // For form handling
import { zodResolver } from "@hookform/resolvers/zod"; // For Zod schema validation
import * as z from "zod"; // Zod for schema definition

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const sampleProducts = [
  { id: 'PROD001', name: 'Wireless Mouse', sku: 'WM-BLK-01', price: 29.99, stock: 150, category: 'Electronics', imageUrl: 'https://via.placeholder.com/40/A0A0A0/FFFFFF?Text=P1' },
  { id: 'PROD002', name: 'Ergonomic Keyboard', sku: 'EK-GRY-05', price: 79.99, stock: 75, category: 'Electronics', imageUrl: 'https://via.placeholder.com/40/B0B0B0/FFFFFF?Text=P2' },
  { id: 'PROD003', name: 'Coffee Mug', sku: 'CM-WHT-12', price: 12.50, stock: 300, category: 'Home Goods', imageUrl: 'https://via.placeholder.com/40/C0C0C0/FFFFFF?Text=P3' },
  { id: 'PROD004', name: 'Notebook', sku: 'NB-BLU-03', price: 5.99, stock: 50, category: 'Stationery', imageUrl: 'https://via.placeholder.com/40/D0D0D0/FFFFFF?Text=P4' },
  { id: 'PROD005', name: 'Desk Lamp', sku: 'DL-BLK-02', price: 45.00, stock: 20, category: 'Office', imageUrl: 'https://via.placeholder.com/40/E0E0E0/FFFFFF?Text=P5' },
];

const getStockBadgeVariant = (stock: number) => {
  if (stock === 0) return 'destructive';
  if (stock < 50) return 'secondary'; // 'warning' like yellow if available
  return 'default'; // 'success' like green
};

const ProductsPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', sku: '', price: 0, stock: 0, category: '', description: '', imageUrl: '' },
  });

  const handleEdit = (product: (typeof sampleProducts)[0]) => {
    setEditingProduct(product);
    form.reset(product); // Populate form with product data
    setIsFormOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingProduct(null);
    form.reset({ name: '', sku: '', price: 0, stock: 0, category: '', description: '', imageUrl: '' }); // Reset to default for new product
    setIsFormOpen(true);
  };

  function onSubmit(values: ProductFormData) {
    console.log(editingProduct ? "Updating product:" : "Adding new product:", values);
    // Here you would typically call an API
    setIsFormOpen(false);
  }

  console.log('ProductsPage loaded');

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
            <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                  <DialogDescription>
                    {editingProduct ? 'Update the details of this product.' : 'Fill in the form to add a new product to your catalog.'}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Product Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="sku" render={({ field }) => (
                        <FormItem><FormLabel>SKU</FormLabel><FormControl><Input placeholder="SKU-001" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                       <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem><FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">Electronics</SelectItem>
                              <SelectItem value="home-goods">Home Goods</SelectItem>
                              <SelectItem value="stationery">Stationery</SelectItem>
                              <SelectItem value="office">Office</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" placeholder="0.00" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="stock" render={({ field }) => (
                        <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" placeholder="0" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="imageUrl" render={({ field }) => (
                        <FormItem><FormLabel>Image URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Description (Optional)</FormLabel><FormControl><Textarea placeholder="Product description..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Product</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className="px-7">
              <div className="flex items-center justify-between">
                <CardTitle>Products List</CardTitle>
                 <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search products..." className="pl-8 w-full md:w-[250px]" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home-goods">Home Goods</SelectItem>
                        <SelectItem value="stationery">Stationery</SelectItem>
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
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10 rounded">
                            <AvatarImage src={product.imageUrl} alt={product.name} />
                            <AvatarFallback>{product.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <Badge variant={getStockBadgeVariant(product.stock) as any}>{product.stock} units</Badge>
                        </TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(product)}><Edit2 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
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

export default ProductsPage;