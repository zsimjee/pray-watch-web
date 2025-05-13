"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import PrayerSettings from "./prayer-settings"
import { useToast } from "@/components/ui/use-toast"

export default function LocationSelector() {
  const [usingGeolocation, setUsingGeolocation] = useState(false)
  const [location, setLocation] = useState("los-angeles")
  const [calculationMethod, setCalculationMethod] = useState("north_america")
  const [madhab, setMadhab] = useState("shafi")
  const { toast } = useToast()

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("prayerSettings")
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        if (settings.calculationMethod) setCalculationMethod(settings.calculationMethod)
        if (settings.madhab) setMadhab(settings.madhab)
        if (settings.location) setLocation(settings.location)
      } catch (e) {
        console.error("Error loading saved settings:", e)
      }
    }

    // Check if geolocation is available
    if (navigator.geolocation) {
      setUsingGeolocation(true)

      // In a real app, we would use the coordinates to determine the city
      // For this demo, we'll just simulate it
      setTimeout(() => {
        setLocation("los-angeles")
      }, 1000)
    }
  }, [])

  const handleSettingsChange = (settings: { calculationMethod: string; madhab: string }) => {
    setCalculationMethod(settings.calculationMethod)
    setMadhab(settings.madhab)

    // Save settings to localStorage
    localStorage.setItem(
      "prayerSettings",
      JSON.stringify({
        calculationMethod: settings.calculationMethod,
        madhab: settings.madhab,
        location,
      }),
    )

    // Notify the user
    toast({
      title: "Settings Updated",
      description: "Your prayer time calculation settings have been updated.",
    })

    // In a real app, we would trigger a recalculation of prayer times
    // This would involve passing these settings to the prayer time components
    window.dispatchEvent(
      new CustomEvent("prayerSettingsChanged", {
        detail: {
          calculationMethod: settings.calculationMethod,
          madhab: settings.madhab,
          location,
        },
      }),
    )
  }

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation)

    // Save location to localStorage
    localStorage.setItem(
      "prayerSettings",
      JSON.stringify({
        calculationMethod,
        madhab,
        location: newLocation,
      }),
    )

    // In a real app, we would trigger a recalculation of prayer times
    window.dispatchEvent(
      new CustomEvent("prayerSettingsChanged", {
        detail: {
          calculationMethod,
          madhab,
          location: newLocation,
        },
      }),
    )
  }

  const popularCities = [
    { value: "los-angeles", label: "Los Angeles" },
    { value: "new-york", label: "New York" },
    { value: "chicago", label: "Chicago" },
    { value: "houston", label: "Houston" },
    { value: "london", label: "London" },
    { value: "cairo", label: "Cairo" },
    { value: "dubai", label: "Dubai" },
    { value: "istanbul", label: "Istanbul" },
  ]

  return (
    <div className="flex items-center gap-2">
      <Select value={location} onValueChange={handleLocationChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {popularCities.map((city) => (
            <SelectItem key={city.value} value={city.value}>
              {city.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                // In a real app, we would use these coordinates
                console.log(position.coords.latitude, position.coords.longitude)
                setUsingGeolocation(true)
                // For demo, we'll just set to Los Angeles
                handleLocationChange("los-angeles")
              },
              (error) => {
                console.error("Error getting location:", error)
                setUsingGeolocation(false)
              },
            )
          }
        }}
      >
        <MapPin className={`h-4 w-4 ${usingGeolocation ? "text-primary" : ""}`} />
        <span className="sr-only">Use current location</span>
      </Button>

      <PrayerSettings calculationMethod={calculationMethod} madhab={madhab} onSettingsChange={handleSettingsChange} />
    </div>
  )
}
