"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { calculatePrayerTimes } from "@/lib/prayer-times"
import { getHijriDate } from "@/lib/hijri-date"

export default function DailyPrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string>>({})
  const [currentDate, setCurrentDate] = useState<{
    gregorian: string
    hijri: string
  }>({
    gregorian: "",
    hijri: "",
  })

  useEffect(() => {
    const today = new Date()

    // Get prayer times for today
    const times = calculatePrayerTimes(
      today,
      34.0522, // Los Angeles latitude
      -118.2437, // Los Angeles longitude
      "hanafi", // Default madhhab
      "isna", // Default calculation method
    )

    // Format times for display
    const formattedTimes: Record<string, string> = {}
    for (const [name, time] of Object.entries(times)) {
      const date = new Date(time)
      formattedTimes[name] = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    }

    setPrayerTimes(formattedTimes)

    // Set dates
    const gregorianDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const hijriDate = getHijriDate(today)

    setCurrentDate({
      gregorian: gregorianDate,
      hijri: hijriDate,
    })
  }, [])

  const prayerOrder = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"]
  const prayerNames: Record<string, string> = {
    fajr: "Fajr",
    sunrise: "Sunrise",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
  }

  // Determine which prayer is next
  const getNextPrayer = () => {
    const now = new Date()
    for (const prayer of prayerOrder) {
      if (prayerTimes[prayer]) {
        const [hourStr, minuteStr] = prayerTimes[prayer].split(":")
        const [minute, period] = minuteStr.split(" ")
        let hour = Number.parseInt(hourStr)
        if (period === "PM" && hour !== 12) hour += 12
        if (period === "AM" && hour === 12) hour = 0

        const prayerTime = new Date()
        prayerTime.setHours(hour, Number.parseInt(minute), 0)

        if (prayerTime > now) return prayer
      }
    }
    return "fajr" // If all prayers passed, next is Fajr tomorrow
  }

  const nextPrayer = getNextPrayer()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">{currentDate.gregorian}</h2>
        <p className="text-muted-foreground">{currentDate.hijri}</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {prayerOrder.map((prayer) => (
              <div
                key={prayer}
                className={`flex justify-between items-center p-4 ${
                  prayer === nextPrayer ? "bg-primary/10 dark:bg-primary/20" : ""
                }`}
              >
                <div className="flex items-center">
                  {prayer === nextPrayer && <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>}
                  <span className={prayer === nextPrayer ? "font-bold" : ""}>{prayerNames[prayer]}</span>
                </div>
                <span className={prayer === nextPrayer ? "font-bold" : ""}>{prayerTimes[prayer] || "--:--"}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
