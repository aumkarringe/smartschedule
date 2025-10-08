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

const columns: { id: CandidateStatus; title: string; color: string }[] = [
  { id: "applied", title: "Applied", color: "bg-muted" },
  { id: "screening", title: "Screening", color: "bg-warning" },
  { id: "interview", title: "Interview", color: "bg-primary" },
  { id: "offer", title: "Offer", color: "bg-accent" },
  { id: "hired", title: "Hired", color: "bg-success" },
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
    }

    setActiveId(null);
  };

  const getCandidatesByStatus = (status: CandidateStatus) => {
    return candidates.filter((c) => c.status === status);
  };

  const activeCandidate = candidates.find((c) => c.id === activeId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Candidate Pipeline</h1>
        <p className="text-muted-foreground mt-2">
          Drag and drop candidates to update their status
        </p>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {columns.map((column) => {
            const columnCandidates = getCandidatesByStatus(column.id);
            return (
              <SortableContext
                key={column.id}
                id={column.id}
                items={columnCandidates.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <Card className="shadow-soft min-h-[600px]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          column.color
                        )}
                      />
                      <CardTitle className="text-base">
                        {column.title}
                      </CardTitle>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {columnCandidates.length}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {columnCandidates.map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                      />
                    ))}
                  </CardContent>
                </Card>
              </SortableContext>
            );
          })}
        </div>

        <DragOverlay>
          {activeCandidate ? (
            <CandidateCard candidate={activeCandidate} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Candidates;
