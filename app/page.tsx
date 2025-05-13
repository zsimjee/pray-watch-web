import PrayerCountdown from "@/components/prayer-countdown"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Download, MapPin } from "lucide-react"
import Link from "next/link"
import ChatILMButton from "@/components/chat-ilm-button"
import LocationSelector from "@/components/location-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DailyPrayerTimes from "@/components/daily-prayer-times"
import MonthlyCalendar from "@/components/monthly-calendar"
import IslamicHolidays from "@/components/islamic-holidays"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Pray Watch</h1>
            <span className="text-sm text-muted-foreground">by IslamiCity</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://apps.apple.com/app/pray-watch">
                  <Download className="mr-2 h-4 w-4" />
                  iOS App
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://play.google.com/store/apps/details?id=com.iw.android.prayerapp">
                  <Download className="mr-2 h-4 w-4" />
                  Android App
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="flex flex-col items-center mb-6">
                <LocationSelector />
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Los Angeles, CA
                </p>
              </div>
              <PrayerCountdown />
              <div className="mt-6 flex flex-col gap-4">
                <Button className="w-full" asChild>
                  <Link href="/monthly">Printable Monthly Calendar</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/widgets">Get Embeddable Widget</Link>
                </Button>
              </div>
              <div className="md:hidden mt-6 flex gap-2 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://apps.apple.com/app/pray-watch">
                    <Download className="mr-2 h-4 w-4" />
                    iOS App
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://play.google.com/store/apps/details?id=org.islamicity.praywatch">
                    <Download className="mr-2 h-4 w-4" />
                    Android App
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="holidays">Holidays</TabsTrigger>
              </TabsList>
              <TabsContent value="daily">
                <DailyPrayerTimes />
              </TabsContent>
              <TabsContent value="monthly">
                <MonthlyCalendar />
              </TabsContent>
              <TabsContent value="holidays">
                <IslamicHolidays />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <footer className="mt-16 py-6 border-t text-center text-sm text-muted-foreground">
          <div className="mb-4">
            <p className="font-medium">"Pray. Watch. Connect."</p>
            <p className="italic">"Establish prayer for My remembrance." – Surah Taha (20:14)</p>
          </div>
          <p>© {new Date().getFullYear()} Human Assistance & Development International (HADI)</p>
          <p>Privacy-first, ad-free, no tracking</p>
        </footer>
      </div>
      <ChatILMButton />
    </main>
  )
}
