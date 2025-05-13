"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Settings } from "lucide-react"

interface PrayerSettingsProps {
  calculationMethod: string
  madhab: string
  onSettingsChange: (settings: { calculationMethod: string; madhab: string }) => void
}

export default function PrayerSettings({ calculationMethod, madhab, onSettingsChange }: PrayerSettingsProps) {
  const [localCalculationMethod, setLocalCalculationMethod] = useState(calculationMethod)
  const [localMadhab, setLocalMadhab] = useState(madhab)

  const handleSave = () => {
    onSettingsChange({
      calculationMethod: localCalculationMethod,
      madhab: localMadhab,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Prayer Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Prayer Time Settings</DialogTitle>
          <DialogDescription>
            Adjust the calculation method and madhab for prayer times. These settings affect how prayer times are
            calculated.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="calculation-method">Calculation Method</Label>
            <RadioGroup
              id="calculation-method"
              value={localCalculationMethod}
              onValueChange={setLocalCalculationMethod}
              className="grid gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="north_america" id="north_america" />
                <Label htmlFor="north_america">North America (ISNA)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="muslim_world_league" id="muslim_world_league" />
                <Label htmlFor="muslim_world_league">Muslim World League</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="egyptian" id="egyptian" />
                <Label htmlFor="egyptian">Egyptian General Authority</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="karachi" id="karachi" />
                <Label htmlFor="karachi">University of Islamic Sciences, Karachi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="umm_al_qura" id="umm_al_qura" />
                <Label htmlFor="umm_al_qura">Umm al-Qura University, Makkah</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dubai" id="dubai" />
                <Label htmlFor="dubai">Dubai</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="madhab">Madhab (for Asr calculation)</Label>
            <RadioGroup id="madhab" value={localMadhab} onValueChange={setLocalMadhab} className="grid gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shafi" id="shafi" />
                <Label htmlFor="shafi">Shafi'i, Maliki, Hanbali (Standard)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hanafi" id="hanafi" />
                <Label htmlFor="hanafi">Hanafi</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
