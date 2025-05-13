"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { calculatePrayerTimes } from "@/lib/prayer-times"

export default function PrayerCountdown() {
  const [nextPrayer, setNextPrayer] = useState<{
    name: string
    time: Date
    timeRemaining: string
    percentage: number
  }>({
    name: "Fajr",
    time: new Date(),
    timeRemaining: "00:00:00",
    percentage: 0,
  })

  const [settings, setSettings] = useState({
    calculationMethod: "north_america",
    madhab: "shafi",
    latitude: 34.0522, // Los Angeles latitude
    longitude: -118.2437, // Los Angeles longitude
  })

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("prayerSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings((prevSettings) => ({
          ...prevSettings,
          calculationMethod: parsedSettings.calculationMethod || prevSettings.calculationMethod,
          madhab: parsedSettings.madhab || prevSettings.madhab,
        }))
      } catch (e) {
        console.error("Error loading saved settings:", e)
      }
    }

    // Listen for settings changes
    const handleSettingsChange = (event: CustomEvent) => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        calculationMethod: event.detail.calculationMethod || prevSettings.calculationMethod,
        madhab: event.detail.madhab || prevSettings.madhab,
      }))
    }

    window.addEventListener("prayerSettingsChanged", handleSettingsChange as EventListener)

    return () => {
      window.removeEventListener("prayerSettingsChanged", handleSettingsChange as EventListener)
    }
  }, [])

  useEffect(() => {
    // Get prayer times for today
    const prayerTimes = calculatePrayerTimes(
      new Date(),
      settings.latitude,
      settings.longitude,
      settings.madhab,
      settings.calculationMethod,
    )

    // Update countdown every second
    const updateCountdown = () => {
      const now = new Date()

      // Find the next prayer
      let nextPrayerName = ""
      let nextPrayerTime = new Date()
      let timeUntilNextPrayer = Number.POSITIVE_INFINITY
      let previousPrayerTime = new Date()

      for (const [name, time] of Object.entries(prayerTimes)) {
        const prayerDate = new Date(time)
        const timeDiff = prayerDate.getTime() - now.getTime()

        if (timeDiff > 0 && timeDiff < timeUntilNextPrayer) {
          timeUntilNextPrayer = timeDiff
          nextPrayerName = name
          nextPrayerTime = prayerDate

          // Find the previous prayer to calculate percentage
          const prayerNames = Object.keys(prayerTimes)
          const currentIndex = prayerNames.indexOf(name)
          const previousIndex = currentIndex > 0 ? currentIndex - 1 : prayerNames.length - 1
          previousPrayerTime = new Date(prayerTimes[prayerNames[previousIndex]])
        }
      }

      // If no next prayer found today, use first prayer of tomorrow
      if (timeUntilNextPrayer === Number.POSITIVE_INFINITY) {
        const tomorrowPrayerTimes = calculatePrayerTimes(
          new Date(now.getTime() + 24 * 60 * 60 * 1000),
          settings.latitude,
          settings.longitude,
          settings.madhab,
          settings.calculationMethod,
        )

        nextPrayerName = "Fajr"
        nextPrayerTime = new Date(tomorrowPrayerTimes.fajr)
        timeUntilNextPrayer = nextPrayerTime.getTime() - now.getTime()
        previousPrayerTime = new Date(prayerTimes.isha)
      }

      // Format the time remaining
      const hours = Math.floor(timeUntilNextPrayer / (1000 * 60 * 60))
      const minutes = Math.floor((timeUntilNextPrayer % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeUntilNextPrayer % (1000 * 60)) / 1000)

      const timeRemaining = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      // Calculate percentage of time elapsed since last prayer
      const totalInterval = nextPrayerTime.getTime() - previousPrayerTime.getTime()
      const elapsedInterval = now.getTime() - previousPrayerTime.getTime()
      const percentage = 100 - Math.min(100, Math.max(0, (elapsedInterval / totalInterval) * 100))

      setNextPrayer({
        name: formatPrayerName(nextPrayerName),
        time: nextPrayerTime,
        timeRemaining,
        percentage,
      })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [settings])

  const formatPrayerName = (name: string) => {
    const names: Record<string, string> = {
      fajr: "Fajr",
      sunrise: "Sunrise",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
    }
    return names[name.toLowerCase()] || name
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-square flex flex-col items-center justify-center p-6">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" />

              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(2 * Math.PI * 45 * nextPrayer.percentage) / 100} ${(2 * Math.PI * 45 * (100 - nextPrayer.percentage)) / 100}`}
                transform="rotate(-90 50 50)"
              />

              {/* Center content */}
              <foreignObject x="15" y="15" width="70" height="70">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-[8px] font-medium text-muted-foreground">Next Prayer</p>
                  <h2 className="text-sm font-bold">{nextPrayer.name}</h2>
                  <p className="text-[8px] text-muted-foreground">{formatTime(nextPrayer.time)}</p>
                  <p className="text-xs font-mono mt-0.5">{nextPrayer.timeRemaining}</p>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
