"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_TIME_SLOTS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const convertTo24Hour = (slot) => {
  const [time, meridiem] = slot.split(" ");
  const [rawHour, minute] = time.split(":").map(Number);
  let hour = rawHour;

  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const displayFrom24Hour = (value) => {
  if (!value) return "";
  const [hourString, minuteString] = value.split(":");
  let hour = Number(hourString);
  const meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${minuteString} ${meridiem}`;
};

const todayNormalized = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const isPastTimeSlotOnDate = (dateString, slotValue) => {
  if (!dateString || !slotValue) return false;

  const [hour, minute] = slotValue.split(":").map(Number);
  const slotDate = parseLocalDate(dateString);
  if (!slotDate) return false;

  const now = new Date();
  const slotDateTime = new Date(
    slotDate.getFullYear(),
    slotDate.getMonth(),
    slotDate.getDate(),
    hour,
    minute,
    0,
    0,
  );

  return slotDateTime <= now;
};

export default function CalendarScheduler({ dateValue, timeValue, onChange }) {
  const [selectedDate, setSelectedDate] = useState(dateValue || "");
  const [selectedTime, setSelectedTime] = useState(timeValue || "");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const parsed = parseLocalDate(dateValue);
    return parsed ?? new Date();
  });

  const today = useMemo(todayNormalized, []);

  useEffect(() => {
    if (dateValue) {
      setSelectedDate(dateValue);
      const parsed = parseLocalDate(dateValue);
      if (parsed) {
        setCurrentMonth(parsed);
      }
    } else {
      setSelectedDate("");
    }
  }, [dateValue]);

  useEffect(() => {
    setSelectedTime(timeValue || "");
  }, [timeValue]);

  const applySelection = useCallback(
    (nextDate, nextTime) => {
      setSelectedDate(nextDate);
      setSelectedTime(nextTime);

      const hasSelection = nextDate && nextTime;
      const differsFromProps = nextDate !== dateValue || nextTime !== timeValue;

      if (hasSelection && differsFromProps) {
        onChange({ date: nextDate, time: nextTime });
      }

      if (!hasSelection && (dateValue || timeValue)) {
        onChange({ date: nextDate, time: nextTime });
      }
    },
    [dateValue, timeValue, onChange],
  );

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    const offset = firstDay.getDay();

    const days = Array.from({ length: offset }, () => null);
    for (let day = 1; day <= lastDay; day += 1) {
      days.push(day);
    }
    return days;
  }, [currentMonth]);

  const isPastDate = (day) => {
    if (!day) return true;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isTodayDate = (day) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDate = (day) => {
    if (!day || !selectedDate) return false;
    const parsed = parseLocalDate(selectedDate);
    if (!parsed) return false;
    return (
      parsed.getDate() === day &&
      parsed.getMonth() === currentMonth.getMonth() &&
      parsed.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleDayClick = (day) => {
    if (!day || isPastDate(day)) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formatted = formatLocalDate(newDate);
    const validTime =
      selectedTime && !isPastTimeSlotOnDate(formatted, selectedTime)
        ? selectedTime
        : "";

    applySelection(formatted, validTime);
  };

  const handleReset = () => {
    applySelection("", "");
  };

  const selectedSummary = useMemo(() => {
    if (!selectedDate || !selectedTime) return "";
    const parsed = parseLocalDate(selectedDate);
    if (!parsed) return "";
    const readableDate = `${MONTHS[parsed.getMonth()]} ${parsed.getDate()}, ${parsed.getFullYear()}`;
    return `${readableDate} at ${displayFrom24Hour(selectedTime)}`;
  }, [selectedDate, selectedTime]);

  return (
    <div className="rounded-lg border border-white/15 bg-white/[0.03] p-6 backdrop-blur-sm">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.3em] text-[#FF9500]">Schedule a call</p>
        <p className="mt-2 text-sm text-white">
          Pick a preferred day and time for a discovery call. We&apos;ll confirm the slot by email within 24 hours.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-md border border-white/10 bg-black/60 p-4">
          <div className="mb-4 flex items-center justify-between text-white">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
                )
              }
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-white/10 hover:border-white/30 hover:bg-white/10"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs uppercase tracking-[0.26em]">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
                )
              }
              className="inline-flex h-8 w-8 items-center justify-center rounded border border-white/10 hover:border-white/30 hover:bg-white/10"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] uppercase tracking-[0.18em] text-white">
            {WEEKDAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-sm">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <span key={`empty-${index}`} className="aspect-square" />;
              }

              const disabled = isPastDate(day);
              const selected = isSelectedDate(day);
              const todayFlag = isTodayDate(day);

              return (
                <button
                  key={`${day}-${index}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-md border transition-colors ${
                    selected
                      ? "border-[#FF9500] bg-[#FF9500] text-black"
                      : disabled
                      ? "border-transparent text-white cursor-not-allowed opacity-40"
                      : todayFlag
                      ? "border-[#FF9500]/40 text-white"
                      : "border-white/10 text-white hover:border-[#FF9500]/30 hover:bg-white/5"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-md border border-white/10 bg-black/60 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white">Pick a time</p>
          <div className="grid max-h-[220px] grid-cols-2 gap-2 overflow-y-auto pr-1">
            {DEFAULT_TIME_SLOTS.map((slot) => {
              const value = convertTo24Hour(slot);
              const isActive = selectedTime === value;
              const disabled = selectedDate && isPastTimeSlotOnDate(selectedDate, value);

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={disabled || !selectedDate}
                  onClick={() => applySelection(selectedDate, value)}
                  className={`rounded border px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive
                      ? "border-[#FF9500] bg-[#FF9500] text-white"
                      : disabled
                      ? "border-white/5 bg-white/5 text-white cursor-not-allowed"
                      : !selectedDate
                      ? "border-white/10 bg-white/5 text-white cursor-not-allowed"
                      : "border-white/10 bg-white/5 text-white hover:border-[#FF9500]/40 hover:text-[#FF9500]"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
        <div className="text-xs text-white">
          {selectedSummary ? (
            <span className="uppercase tracking-[0.2em]">Selected: {selectedSummary}</span>
          ) : (
            <span className="uppercase tracking-[0.2em]">No slot selected</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs uppercase tracking-[0.24em] text-white"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => applySelection(selectedDate, selectedTime)}
            disabled={!selectedDate || !selectedTime}
            className={`text-xs uppercase tracking-[0.3em] border-b pb-1 transition-colors ${
              !selectedDate || !selectedTime
                ? "border-white/20 text-white cursor-not-allowed"
                : "border-[#FF9500] text-[#FF9500] hover:text-white hover:border-white"
            }`}
          >
            Confirm slot
          </button>
        </div>
      </div>
    </div>
  );
}
