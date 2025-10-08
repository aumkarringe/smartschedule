import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
  index?: number;
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  gradient = false,
  index = 0,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      <Card className={cn(
        "overflow-hidden transition-all hover:shadow-strong relative group",
        gradient && "bg-gradient-primary text-primary-foreground border-0"
      )}>
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <motion.p 
                className={cn(
                  "text-sm font-medium",
                  gradient ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {title}
              </motion.p>
              <motion.p 
                className="text-3xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1 + 0.3
                }}
              >
                {value}
              </motion.p>
              {change && (
                <motion.p 
                  className={cn(
                    "text-sm font-medium",
                    gradient ? "text-primary-foreground/90" : "",
                    !gradient && changeType === "positive" && "text-success",
                    !gradient && changeType === "negative" && "text-destructive",
                    !gradient && changeType === "neutral" && "text-muted-foreground"
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {change}
                </motion.p>
              )}
            </div>
            <motion.div 
              className={cn(
                "rounded-lg p-3",
                gradient ? "bg-white/20" : "bg-primary/10"
              )}
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={cn(
                "h-6 w-6",
                gradient ? "text-primary-foreground" : "text-primary"
              )} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
