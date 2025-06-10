import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // For conditional classes
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"; // Using ShadCN NavigationMenu
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, ShoppingCart, Package, Users, BarChart3, Settings } from 'lucide-react'; // Example icons

// Define navigation items
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/products", label: "Products", icon: Package },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }, // Example additional item
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar (custom layout using ShadCN NavigationMenu)");

  return (
    <aside className={cn("hidden border-r bg-muted/40 md:block", className)}>
      <ScrollArea className="h-full py-4">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            {/* You can use NavigationMenu or a simpler list of Links */}
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    location.pathname.startsWith(item.href) && "bg-muted text-primary" // Active state
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Example using NavigationMenu (can be more complex if submenus are needed) */}
            {/* <NavigationMenu orientation="vertical" className="p-4">
              <NavigationMenuList className="flex flex-col space-y-1 w-full">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label} className="w-full">
                    <Link to={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "w-full justify-start",
                          location.pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu> */}
          </div>
          {/* Optional: Pinned items at the bottom of the sidebar */}
          {/* <div className="mt-auto p-4"> ... </div> */}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;