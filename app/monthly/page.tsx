"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Download, Printer } from "lucide-react"
import { calculatePrayerTimes } from "@/lib/prayer-times"
import { getHijriDate, getHijriMonth } from "@/lib/hijri-date"
import Link from "next/link"

export default function MonthlyCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const printRef = useRef<HTMLDivElement>(null)

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
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold">
            Pray Watch
          </Link>
          <span className="text-sm text-muted-foreground">by IslamiCity</span>
        </div>
      </header>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Monthly Prayer Calendar</h1>
        <p className="text-muted-foreground">Print or download a monthly prayer schedule for your location</p>
      </div>

      <div className="flex justify-between items-center mb-6">
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
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div ref={printRef} className="print:p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Prayer Times for {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <p className="text-muted-foreground">{getHijriMonth(currentDate)} | Los Angeles, CA</p>
        </div>

        <Card className="print:shadow-none">
          <CardContent className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Hijri</th>
                  <th className="p-2 text-center">Fajr</th>
                  <th className="p-2 text-center">Sunrise</th>
                  <th className="p-2 text-center">Dhuhr</th>
                  <th className="p-2 text-center">Asr</th>
                  <th className="p-2 text-center">Maghrib</th>
                  <th className="p-2 text-center">Isha</th>
                </tr>
              </thead>
              <tbody>
                {calendarDays
                  .filter((day) => day !== null)
                  .map((day, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        day.date.toDateString() === new Date().toDateString()
                          ? "bg-primary/10 dark:bg-primary/20"
                          : index % 2 === 0
                            ? "bg-muted/30"
                            : ""
                      }`}
                    >
                      <td className="p-2">
                        {day.date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="p-2 text-sm">{day.hijriDate.split(" ")[0]}</td>
                      <td className="p-2 text-center">{day.prayerTimes.fajr}</td>
                      <td className="p-2 text-center">{day.prayerTimes.sunrise}</td>
                      <td className="p-2 text-center">{day.prayerTimes.dhuhr}</td>
                      <td className="p-2 text-center">{day.prayerTimes.asr}</td>
                      <td className="p-2 text-center">{day.prayerTimes.maghrib}</td>
                      <td className="p-2 text-center">{day.prayerTimes.isha}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground print:mt-8">
          <p>Generated by Pray Watch | IslamiCity</p>
          <p>Download our mobile apps for iOS and Android</p>
        </div>
      </div>
    </div>
  )
}
