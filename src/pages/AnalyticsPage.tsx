import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, LineChart, BarChart, PieChart, Pie, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, Area, Cell } from 'recharts';
import { LayoutDashboard, CalendarDays, Users, ShoppingCart, TrendingUp, BarChartBig } from 'lucide-react';

const salesTrendData = [
  { date: '2023-01', sales: 4000 }, { date: '2023-02', sales: 3000 }, { date: '2023-03', sales: 5000 },
  { date: '2023-04', sales: 4500 }, { date: '2023-05', sales: 6000 }, { date: '2023-06', sales: 5500 },
];
const revenueByProductData = [
  { name: 'Product A', revenue: 4000 }, { name: 'Product B', revenue: 3000 },
  { name: 'Product C', revenue: 2000 }, { name: 'Product D', revenue: 2780 },
];
const customerAcquisitionData = [
  { month: 'Jan', new: 50, returning: 120 }, { month: 'Feb', new: 60, returning: 150 },
  { month: 'Mar', new: 70, returning: 180 }, { month: 'Apr', new: 80, returning: 200 },
];
const topProductsData = [
    { rank: 1, name: 'Wireless Mouse', unitsSold: 520, revenue: 15548 },
    { rank: 2, name: 'Ergonomic Keyboard', unitsSold: 310, revenue: 24796 },
    { rank: 3, name: 'Coffee Mug', unitsSold: 1205, revenue: 15062 },
];
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  console.log('AnalyticsPage loaded');

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
            <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
            <div className="flex items-center space-x-2">
              <Select defaultValue="last30days">
                <SelectTrigger className="w-[180px]">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground"/>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500"/> Sales Trend</CardTitle>
                  <CardDescription>Monthly sales performance over time.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-blue-500"/>Revenue by Product</CardTitle>
                  <CardDescription>Breakdown of revenue from top products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueByProductData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-purple-500"/>Customer Acquisition</CardTitle>
                  <CardDescription>New vs. returning customer trends.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={customerAcquisitionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="new" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="returning" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChartBig className="h-5 w-5 text-orange-500"/>Top Performing Products</CardTitle>
                    <CardDescription>Units sold and revenue for leading products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rank</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead className="text-right">Units Sold</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topProductsData.map((product) => (
                                <TableRow key={product.rank}>
                                    <TableCell>{product.rank}</TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="text-right">{product.unitsSold}</TableCell>
                                    <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;