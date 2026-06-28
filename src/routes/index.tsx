import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, MapPin, Clock, Heart, Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "../assets/volunteer-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Community Volunteer Plan — June 2026" },
      { name: "description", content: "Join our monthly volunteering schedule. Community garden, beach cleanup, senior visits, and food bank sorting." },
      { property: "og:title", content: "Community Volunteer Plan — June 2026" },
      { property: "og:description", content: "Join our monthly volunteering schedule. Community garden, beach cleanup, senior visits, and food bank sorting." },
    ],
  }),
  component: Index,
});

interface VolunteerEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  category: "Environment" | "Community" | "Education";
}

const EVENTS: VolunteerEvent[] = [];

const CATEGORY_COLORS: Record<string, string> = {
  Environment: "bg-volunteer-lavender/30 text-volunteer-purple border-volunteer-lavender",
  Community: "bg-volunteer-pink/40 text-volunteer-purple border-volunteer-pink",
  Education: "bg-volunteer-cream/60 text-volunteer-purple border-volunteer-cream",
};
const ADMIN_PASSWORD = "M2026";
function Index() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<VolunteerEvent[]>(EVENTS);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(currentMonth, "yyyy-MM-dd"),
    time: "",
    location: "",
    description: "",
    category: "Community" as VolunteerEvent["category"],
  });  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const selectedEvent = selectedDate
    ? events.find((e) => isSameDay(e.date, selectedDate))
    : null;
  function handleOpenAddEvent() {
    const password = window.prompt("Enter admin password to add an event:");

    if (password === ADMIN_PASSWORD) {
      setShowAddEvent(true);
      return;
    }

    if (password !== null) {
      alert("Incorrect password.");
    }
  }  
  function handleAddEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert("Please add at least title, date, and time.");
      return;
    }

    const [year, month, day] = newEvent.date.split("-").map(Number);

    const eventToAdd: VolunteerEvent = {
      id: crypto.randomUUID(),
      title: newEvent.title,
      date: new Date(year, month - 1, day),
      time: newEvent.time,
      location: newEvent.location || "To be announced",
      description: newEvent.description || "Details will be added soon.",
      category: newEvent.category,
    };

    setEvents((prev) => [...prev, eventToAdd]);
    setCurrentMonth(eventToAdd.date);
    setSelectedDate(eventToAdd.date);
    setShowAddEvent(false);

    setNewEvent({
      title: "",
      date: format(eventToAdd.date, "yyyy-MM-dd"),
      time: "",
      location: "",
      description: "",
      category: "Community",
    });
  }  
  function handlePrevMonth() {
    setCurrentMonth((m) => subMonths(m, 1));
    setSelectedDate(null);
  }

  function handleNextMonth() {
    setCurrentMonth((m) => addMonths(m, 1));
    setSelectedDate(null);
  }

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-volunteer-cream/60 via-background to-volunteer-lavender/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-volunteer-lavender/20 px-4 py-1.5 text-sm font-medium text-volunteer-purple">
                <Heart className="h-3.5 w-3.5" />
                June 2026 Schedule
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Make a Difference{" "}
                <span className="text-volunteer-purple">Together</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Join our monthly volunteering plan. From community gardens to
                beach cleanups, there&apos;s a way for everyone to lend a hand.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Button className="rounded-full bg-volunteer-purple px-6 text-primary-foreground hover:bg-volunteer-purple/90">
                  View Events
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-volunteer-lavender text-foreground hover:bg-volunteer-lavender/20"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full max-w-md md:max-w-lg">
              <img
                src={heroImage}
                alt="Diverse community volunteers gardening and cleaning together in a park"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Split View */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3">
            <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
              Annual Plan
            </h2>

          <Button
  type="button"
  size="icon"
  onClick={handleOpenAddEvent}
  className="h-7 w-7 rounded-full bg-volunteer-purple text-primary-foreground shadow-sm hover:bg-volunteer-purple/90"
  aria-label="Add new event"
>
  <Pencil className="h-3.5 w-3.5" />
</Button>
          </div>

          <p className="mt-2 text-muted-foreground">
            {events.length > 0
              ? "Click a highlighted date to see event details"
              : "Activities will be added soon"}
          </p>
        </div>
{showAddEvent && (
  <Card className="mb-8 border-volunteer-lavender/30 shadow-sm">
    <CardContent className="p-5">
      <form onSubmit={handleAddEvent} className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">
            Event title
          </label>
          <input
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Example: Winter Clothes Distribution"
            className="w-full rounded-xl border border-volunteer-lavender/40 bg-background px-4 py-2 text-sm outline-none focus:border-volunteer-purple"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Date
          </label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full rounded-xl border border-volunteer-lavender/40 bg-background px-4 py-2 text-sm outline-none focus:border-volunteer-purple"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Time
          </label>
          <input
            value={newEvent.time}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, time: e.target.value }))
            }
            placeholder="Example: 10:00 AM – 2:00 PM"
            className="w-full rounded-xl border border-volunteer-lavender/40 bg-background px-4 py-2 text-sm outline-none focus:border-volunteer-purple"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Location
          </label>
          <input
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="Example: Community Center"
            className="w-full rounded-xl border border-volunteer-lavender/40 bg-background px-4 py-2 text-sm outline-none focus:border-volunteer-purple"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Category
          </label>
          <select
            value={newEvent.category}
            onChange={(e) =>
              setNewEvent((prev) => ({
                ...prev,
                category: e.target.value as VolunteerEvent["category"],
              }))
            }
            className="w-full rounded-xl border border-volunteer-lavender/40 bg-background px-4 py-2 text-sm outline-none focus:border-volunteer-purple"
          >
            <option value="Community">Community</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Write a short description for people who will view the plan."
            rows={3}
            className="w-full rounded-xl border border-volunteer-lavender/40 bg-background px-4 py-2 text-sm outline-none focus:border-volunteer-purple"
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAddEvent(false)}
            className="rounded-full"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="rounded-full bg-volunteer-purple text-primary-foreground hover:bg-volunteer-purple/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
)}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Calendar — 2 columns */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-volunteer-lavender/30 shadow-sm">
              <CardContent className="p-5">
                {/* Calendar Header */}
                <div className="mb-4 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevMonth}
                    className="h-8 w-8 rounded-full hover:bg-volunteer-lavender/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {format(currentMonth, "MMMM yyyy")}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextMonth}
                    className="h-8 w-8 rounded-full hover:bg-volunteer-lavender/20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Weekday Labels */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {weekdayLabels.map((d) => (
                    <div
                      key={d}
                      className="py-1.5 text-center text-xs font-medium text-muted-foreground"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day) => {
                    const inMonth = isSameMonth(day, currentMonth);
                    const isSelected =
                      selectedDate && isSameDay(day, selectedDate);
                    const dayEvents = events.filter((e) =>
                      isSameDay(e.date, day),
                    );
                    const hasEvent = dayEvents.length > 0;

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-all",
                          !inMonth && "text-muted-foreground/40",
                          inMonth && !isSelected && "text-foreground hover:bg-volunteer-lavender/15",
                          isSelected &&
                            "bg-volunteer-purple font-semibold text-primary-foreground shadow-sm",
                        )}
                      >
                        <span>{format(day, "d")}</span>
                        {hasEvent && !isSelected && (
                          <span className="mt-0.5 flex gap-0.5">
                            {dayEvents.slice(0, 3).map((e) => (
                              <span
                                key={e.id}
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full",
                                  e.category === "Environment"
                                    ? "bg-volunteer-lavender"
                                    : "bg-volunteer-pink",
                                )}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-volunteer-lavender/20 pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-volunteer-lavender" />
                    Environment
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-volunteer-pink" />
                    Community
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

{/* Event List — 3 columns */}
<div className="lg:col-span-3">
  <div className="space-y-4">
    {selectedEvent ? (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDate(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all events
          </Button>
        </div>

        <EventDetailCard event={selectedEvent} />
      </div>
    ) : events.length > 0 ? (
      events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isActive={selectedDate ? isSameDay(event.date, selectedDate) : false}
          onClick={() => setSelectedDate(event.date)}
        />
      ))
    ) : (
      <Card className="border-volunteer-lavender/30">
        <CardContent className="p-6 text-center">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            No activities added yet
          </h3>
          <p className="mt-2 text-muted-foreground">
            Click the pencil button above to add the first activity.
          </p>
        </CardContent>
      </Card>
    )}
  </div>
</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-volunteer-lavender/20 py-8 text-center text-sm text-muted-foreground">
        <p>
          Made with{" "}
          <Heart className="inline h-3.5 w-3.5 text-volunteer-pink" /> by our
          amazing volunteers
        </p>
      </footer>
    </div>
  );
}

function EventCard({
  event,
  isActive,
  onClick,
}: {
  event: VolunteerEvent;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer border transition-all duration-200 hover:shadow-md",
        isActive
          ? "border-volunteer-purple bg-volunteer-purple/5"
          : "border-volunteer-lavender/30 hover:border-volunteer-lavender/60",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Date Badge */}
          <div className="flex flex-col items-center rounded-xl border border-volunteer-lavender/30 bg-volunteer-cream/50 px-3 py-2 text-center">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {format(event.date, "MMM")}
            </span>
            <span className="font-heading text-xl font-bold text-foreground">
              {format(event.date, "d")}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  CATEGORY_COLORS[event.category],
                )}
              >
                {event.category}
              </span>
            </div>
            <h3 className="font-heading text-lg font-semibold leading-tight text-foreground">
              {event.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EventDetailCard({ event }: { event: VolunteerEvent }) {
  return (
    <Card className="overflow-hidden border-volunteer-purple/20 shadow-md">
      <div
        className={cn(
          "h-2 w-full",
          event.category === "Environment"
            ? "bg-volunteer-lavender"
            : "bg-volunteer-pink",
        )}
      />
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              CATEGORY_COLORS[event.category],
            )}
          >
            {event.category}
          </span>
          <span className="text-sm text-muted-foreground">
            {format(event.date, "EEEE, MMMM d, yyyy")}
          </span>
        </div>

        <h3 className="font-heading text-2xl font-bold text-foreground">
          {event.title}
        </h3>

        <p className="text-base leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="grid gap-3 rounded-xl bg-volunteer-cream/40 p-4 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-volunteer-purple" />
            <span className="font-medium">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="h-4 w-4 text-volunteer-purple" />
            <span className="font-medium">{event.location}</span>
          </div>
        </div>

        <Button className="w-full rounded-full bg-volunteer-purple text-primary-foreground hover:bg-volunteer-purple/90">
          <Heart className="mr-2 h-4 w-4" />
          I want to volunteer
        </Button>
      </CardContent>
    </Card>
  );
}
