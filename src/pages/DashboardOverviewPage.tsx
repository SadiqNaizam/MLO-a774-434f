import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import DataWidget from '@/components/DataWidget';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts'; // Assuming 'Chart' from shadcn list implies recharts
import { LayoutDashboard, DollarSign, Users, ShoppingBag, Activity, TrendingUp, TrendingDown } from 'lucide-react';

const placeholderChartData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const recentActivity = [
  { id: 1, user: 'Olivia Martin', action: 'completed order #3100', time: '5m ago', avatar: 'https://via.placeholder.com/40/FFC0CB/000000?Text=OM' },
  { id: 2, user: 'Jackson Lee', action: 'signed up', time: '10m ago', avatar: 'https://via.placeholder.com/40/ADD8E6/000000?Text=JL' },
  { id: 3, user: 'Isabella Nguyen', action: 'updated profile', time: '1h ago', avatar: 'https://via.placeholder.com/40/90EE90/000000?Text=IN' },
];

const DashboardOverviewPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  console.log('DashboardOverviewPage loaded');

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
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          </div>
          <ScrollArea className="flex-1">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <DataWidget title="Total Revenue" value="$45,231.89" description="+20.1% from last month" icon={DollarSign} trend={{ value: "+20.1%", direction: "up" }} />
              <DataWidget title="New Signups" value="+2,350" description="+180.1% from last month" icon={Users} trend={{ value: "+180.1%", direction: "up" }}/>
              <DataWidget title="Total Sales" value="+12,234" description="+19% from last month" icon={ShoppingBag} trend={{ value: "+19%", direction: "up" }}/>
              <DataWidget title="Active Now" value="573" description="+201 since last hour" icon={Activity} trend={{value: "+201", direction: "neutral"}}/>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Sales Overview</CardTitle>
                        <CardDescription>A chart showing sales trends over the past months.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={placeholderChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>What's new in your store.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentActivity.map(activity => (
                                <li key={activity.id} className="flex items-center space-x-3">
                                    <img src={activity.avatar} alt={activity.user} className="h-10 w-10 rounded-full" />
                                    <div>
                                        <p className="text-sm font-medium">{activity.user} <span className="text-muted-foreground">{activity.action}</span></p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;