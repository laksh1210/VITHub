"use client";

import { useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useBuildings } from "@/hooks/use-buildings";
import { useCreateMaintenanceRequest } from "@/hooks/use-maintenance";
import { useRooms } from "@/hooks/use-rooms";
import { FilterSelect } from "@/components/common/filter-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITIES, PRIORITY_LABEL } from "@/lib/types/enums";

const INITIAL_FORM = {
  title: "",
  description: "",
  category: "",
  priority: "MEDIUM",
  buildingId: "NONE",
  roomId: "NONE",
};

export function CreateComplaintForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { data: buildings } = useBuildings();
  const selectedBuildingId = form.buildingId === "NONE" ? undefined : form.buildingId;
  const { data: rooms } = useRooms(selectedBuildingId);
  const createRequest = useCreateMaintenanceRequest();

  const buildingOptions = useMemo(
    () =>
      (buildings ?? []).map((building) => ({
        value: building.id,
        label: `${building.name} (${building.code})`,
      })),
    [buildings]
  );

  const roomOptions = useMemo(
    () =>
      (rooms ?? []).map((room) => ({
        value: room.id,
        label: `${room.roomNumber} - ${room.type.replaceAll("_", " ")}`,
      })),
    [rooms]
  );

  return (
    <Card className="bg-gradient-to-br from-card to-primary/[0.04]">
      <div className="p-5">
        <div>
          <h2 className="text-sm font-semibold">Create complaint</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Submit a maintenance issue using the existing backend complaint API.
          </p>
        </div>

        <form
          className="mt-4 grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setFeedback(null);

            try {
              await createRequest.mutateAsync({
                title: form.title.trim(),
                description: form.description.trim(),
                category: form.category.trim(),
                priority: form.priority as (typeof PRIORITIES)[number],
                buildingId: form.buildingId === "NONE" ? undefined : form.buildingId,
                roomId: form.roomId === "NONE" ? undefined : form.roomId,
              });

              setForm(INITIAL_FORM);
              setFeedback("Complaint created successfully.");
            } catch (error) {
              setFeedback(
                error instanceof Error
                  ? error.message
                  : "Couldn't create the complaint. Make sure you're authenticated and the API is reachable."
              );
            }
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="Eg. AC not working in study room"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Input
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({ ...current, category: event.target.value }))
                }
                placeholder="Electrical, plumbing, furniture..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Describe the issue clearly so the maintenance team can act quickly."
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <FilterSelect
                value={form.priority}
                onChange={(value) => setForm((current) => ({ ...current, priority: value }))}
                options={PRIORITIES.map((value) => ({
                  value,
                  label: PRIORITY_LABEL[value],
                }))}
                placeholder="Priority"
                allLabel="Priority"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Building</label>
              <FilterSelect
                value={form.buildingId}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    buildingId: value,
                    roomId: "NONE",
                  }))
                }
                options={buildingOptions}
                placeholder="Building"
                allLabel="No building"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Room</label>
              <FilterSelect
                value={form.roomId}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    roomId: value,
                  }))
                }
                options={roomOptions}
                placeholder="Room"
                allLabel="No room"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {feedback ?? "Reporter identity is resolved by the backend from your JWT."}
            </p>
            <Button type="submit" disabled={createRequest.isPending}>
              {createRequest.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Submit complaint
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
