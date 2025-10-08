import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = false,
}: StatsCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-medium",
      gradient && "bg-gradient-primary text-primary-foreground"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              gradient ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {title}
            </p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <p className={cn(
                "text-sm font-medium",
                gradient ? "text-primary-foreground/90" : "",
                !gradient && changeType === "positive" && "text-success",
                !gradient && changeType === "negative" && "text-destructive",
                !gradient && changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "rounded-lg p-3",
            gradient ? "bg-white/20" : "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              gradient ? "text-primary-foreground" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
