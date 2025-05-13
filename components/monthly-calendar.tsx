"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Printer } from "lucide-react"
import { calculatePrayerTimes } from "@/lib/prayer-times"
import { getHijriDate, getHijriMonth } from "@/lib/hijri-date"

export default function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  const months = [
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
  ]

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i)

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const prayerTimes = calculatePrayerTimes(
        date,
        34.0522, // Los Angeles latitude
        -118.2437, // Los Angeles longitude
        "hanafi", // Default madhhab
        "isna", // Default calculation method
      )

      days.push({
        day: i,
        date,
        hijriDate: getHijriDate(date),
        prayerTimes: {
          fajr: new Date(prayerTimes.fajr).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          sunrise: new Date(prayerTimes.sunrise).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          dhuhr: new Date(prayerTimes.dhuhr).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          asr: new Date(prayerTimes.asr).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          maghrib: new Date(prayerTimes.maghrib).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          isha: new Date(prayerTimes.isha).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        },
      })
    }

    return days
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handlePrint = () => {
    window.print()
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Select
            value={currentDate.getMonth().toString()}
            onValueChange={(value) => {
              setCurrentDate(new Date(currentDate.getFullYear(), Number.parseInt(value), 1))
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={currentDate.getFullYear().toString()}
            onValueChange={(value) => {
              setCurrentDate(new Date(Number.parseInt(value), currentDate.getMonth(), 1))
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setView("calendar")}>
            Calendar
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView("list")}>
            List
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <p className="text-muted-foreground">{getHijriMonth(currentDate)}</p>
      </div>

      {view === "calendar" ? (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium p-2">
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] border rounded-md p-2 ${
                    day === null
                      ? "bg-muted/30"
                      : day.date.toDateString() === new Date().toDateString()
                        ? "bg-primary/10 dark:bg-primary/20"
                        : ""
                  }`}
                >
                  {day !== null && (
                    <>
                      <div className="flex justify-between items-start">
                        <span className="font-bold">{day.day}</span>
                        <span className="text-xs text-muted-foreground">{day.hijriDate.split(" ")[0]}</span>
                      </div>
                      <div className="mt-2 text-xs space-y-1">
                        <div>Fajr: {day.prayerTimes.fajr}</div>
                        <div>Dhuhr: {day.prayerTimes.dhuhr}</div>
                        <div>Asr: {day.prayerTimes.asr}</div>
                        <div>Maghrib: {day.prayerTimes.maghrib}</div>
                        <div>Isha: {day.prayerTimes.isha}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {calendarDays
                .filter((day) => day !== null)
                .map((day, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-4 ${
                      day.date.toDateString() === new Date().toDateString() ? "bg-primary/10 dark:bg-primary/20" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">
                        {day.date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </h3>
                      <span className="text-sm text-muted-foreground">{day.hijriDate}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <div className="text-sm">
                        <span className="font-medium">Fajr:</span> {day.prayerTimes.fajr}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Sunrise:</span> {day.prayerTimes.sunrise}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Dhuhr:</span> {day.prayerTimes.dhuhr}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Asr:</span> {day.prayerTimes.asr}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Maghrib:</span> {day.prayerTimes.maghrib}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Isha:</span> {day.prayerTimes.isha}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
