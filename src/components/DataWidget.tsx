import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react'; // Type for icon component
import { cn } from '@/lib/utils';

interface DataWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  className?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  onClick?: () => void; // Optional click handler
}

const DataWidget: React.FC<DataWidgetProps> = ({
  title,
  value,
  description,
  icon: Icon,
  className,
  trend,
  onClick,
}) => {
  console.log("Rendering DataWidget:", title);

  const trendColor = trend?.direction === 'up' ? 'text-green-600' : trend?.direction === 'down' ? 'text-red-600' : 'text-muted-foreground';

  return (
    <Card className={cn("w-full", onClick ? "cursor-pointer hover:shadow-md transition-shadow" : "", className)} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
            <p className={cn("text-xs mt-1", trendColor)}>
                {trend.value}
            </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataWidget;