import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateCard } from "@/components/CandidateCard";
import { mockCandidates } from "@/data/mockData";
import { Candidate, CandidateStatus } from "@/types/candidate";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const columns: { id: CandidateStatus; title: string; color: string; emoji: string }[] = [
  { id: "applied", title: "Applied", color: "bg-muted", emoji: "📝" },
  { id: "screening", title: "Screening", color: "bg-warning", emoji: "🔍" },
  { id: "interview", title: "Interview", color: "bg-primary", emoji: "💬" },
  { id: "offer", title: "Offer", color: "bg-accent", emoji: "🎯" },
  { id: "hired", title: "Hired", color: "bg-success", emoji: "🎉" },
];

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeCandidate = candidates.find((c) => c.id === active.id);
    const newStatus = over.id as CandidateStatus;

    if (activeCandidate && activeCandidate.status !== newStatus) {
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === active.id ? { ...c, status: newStatus } : c
        )
      );
      
      toast.success(`${activeCandidate.name} moved to ${newStatus}`, {
        description: `Status updated successfully`,
      });
    }

    setActiveId(null);
  };

  const getCandidatesByStatus = (status: CandidateStatus) => {
    return candidates.filter((c) => c.status === status);
  };

  const activeCandidate = candidates.find((c) => c.id === activeId);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-gradient">Candidate Pipeline</h1>
        <p className="text-muted-foreground mt-2">
          Drag and drop candidates to update their status • Real-time updates
        </p>
      </motion.div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {columns.map((column, columnIndex) => {
            const columnCandidates = getCandidatesByStatus(column.id);
            return (
              <SortableContext
                key={column.id}
                id={column.id}
                items={columnCandidates.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: columnIndex * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="shadow-soft hover:shadow-strong transition-all min-h-[600px] relative overflow-hidden group">
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity",
                      column.color.replace('bg-', 'bg-gradient-to-br from-')
                    )} />
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                          className="text-2xl"
                        >
                          {column.emoji}
                        </motion.div>
                        <motion.div
                          className={cn(
                            "h-3 w-3 rounded-full",
                            column.color
                          )}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: columnIndex * 0.2
                          }}
                        />
                        <CardTitle className="text-base">
                          {column.title}
                        </CardTitle>
                        <motion.span 
                          className="ml-auto text-sm font-bold bg-gradient-primary bg-clip-text text-transparent"
                          key={columnCandidates.length}
                          initial={{ scale: 1.5 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          {columnCandidates.length}
                        </motion.span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {columnCandidates.map((candidate) => (
                          <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                          />
                        ))}
                      </AnimatePresence>
                      
                      {columnCandidates.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-12 text-muted-foreground"
                        >
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-4xl mb-2"
                          >
                            {column.emoji}
                          </motion.div>
                          <p className="text-sm">Drop candidates here</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </SortableContext>
            );
          })}
        </div>

        <DragOverlay>
          {activeCandidate ? (
            <div className="rotate-6 scale-105">
              <CandidateCard candidate={activeCandidate} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Candidates;
