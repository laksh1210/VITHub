import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/feedback/skeleton";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  loading?: boolean;
  className?: string;
}

export function StatCard({ title, value, description, icon, trend, loading, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24 mb-1" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        
        {trend && !loading && (
          <div className="mt-1 flex items-center text-xs">
            {trend.positive ? (
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
            )}
            <span className={cn("mr-1 font-medium", trend.positive ? "text-emerald-500" : "text-destructive")}>
              {trend.positive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
        
        {description && !trend && !loading && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        
        {loading && (description || trend) && (
          <Skeleton className="h-3 w-32 mt-2" />
        )}
      </CardContent>
    </Card>
  );
}
