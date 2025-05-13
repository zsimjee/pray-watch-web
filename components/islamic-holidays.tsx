"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getIslamicHolidays } from "@/lib/islamic-holidays"

interface Holiday {
  name: string
  date: Date
  hijriDate: string
  description: string
  type: "major" | "minor"
}

export default function IslamicHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    // Get Islamic holidays for the current year
    const holidaysList = getIslamicHolidays(year)
    setHolidays(holidaysList)
  }, [year])

  // Group holidays by month
  const holidaysByMonth: Record<string, Holiday[]> = {}

  holidays.forEach((holiday) => {
    const month = holiday.date.toLocaleString("default", { month: "long" })
    if (!holidaysByMonth[month]) {
      holidaysByMonth[month] = []
    }
    holidaysByMonth[month].push(holiday)
  })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Islamic Holidays {year}</h2>
        <p className="text-muted-foreground">Major Islamic events and observances</p>
      </div>

      <div className="space-y-4">
        {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
          <div key={month}>
            <h3 className="font-medium text-lg mb-2">{month}</h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {monthHolidays.map((holiday, index) => (
                    <div
                      key={index}
                      className={`p-4 ${holiday.type === "major" ? "bg-primary/10 dark:bg-primary/20" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{holiday.name}</h4>
                          <p className="text-sm text-muted-foreground">{holiday.hijriDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {holiday.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          {holiday.type === "major" && (
                            <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">Major Holiday</span>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{holiday.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
