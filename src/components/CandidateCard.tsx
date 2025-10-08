import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types/candidate";
import { Mail, MapPin, Calendar, GripVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="cursor-move shadow-soft hover:shadow-strong transition-all group relative overflow-hidden">
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <CardContent className="p-4 relative">
              <div className="flex items-start gap-3">
                <motion.div
                  {...attributes}
                  {...listeners}
                  className="cursor-grab active:cursor-grabbing mt-1"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </motion.div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {candidate.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {candidate.position}
                      </p>
                    </div>
                    <motion.div 
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm shrink-0"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.slice(0, 3).map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-xs hover:bg-primary/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{candidate.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(candidate.appliedDate, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 glass" side="right">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div>
              <h4 className="font-semibold">{candidate.name}</h4>
              <p className="text-sm text-muted-foreground">
                {candidate.position}
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{candidate.location}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Experience: {candidate.experience}
              </p>
            </div>
          </motion.div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};
