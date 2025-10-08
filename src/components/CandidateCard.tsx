import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types/candidate";
import { Mail, MapPin, Calendar, GripVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
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
    <div ref={setNodeRef} style={style}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="cursor-move shadow-soft hover:shadow-medium transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  {...attributes}
                  {...listeners}
                  className="cursor-grab active:cursor-grabbing mt-1"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm shrink-0">
                      {candidate.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
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
        <HoverCardContent className="w-80" side="right">
          <div className="space-y-3">
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
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
