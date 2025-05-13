import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, MapPin } from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

export function generateMetadata({ params }: PageProps) {
  const cityName = formatCityName(params.city)

  return {
    title: `${cityName} Prayer Times | Pray Watch by IslamiCity`,
    description: `Get accurate prayer times for ${cityName}. View Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times. Download our mobile app for daily notifications.`,
    openGraph: {
      title: `${cityName} Prayer Times | Pray Watch by IslamiCity`,
      description: `Get accurate prayer times for ${cityName}. View Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times. Download our mobile app for daily notifications.`,
      url: `https://islamicity.org/prayer-times/${params.city}`,
      type: "website",
    },
  }
}

export function generateStaticParams() {
  return [
    { city: "los-angeles" },
    { city: "new-york" },
    { city: "chicago" },
    { city: "houston" },
    { city: "london" },
    { city: "cairo" },
    { city: "dubai" },
    { city: "istanbul" },
  ]
}

function formatCityName(slug: string) {
  const cityMap: Record<string, string> = {
    "los-angeles": "Los Angeles",
    "new-york": "New York",
    chicago: "Chicago",
    houston: "Houston",
    london: "London",
    cairo: "Cairo",
    dubai: "Dubai",
    istanbul: "Istanbul",
  }

  return (
    cityMap[slug] ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  )
}

export default function CityPrayerTimesPage({ params }: PageProps) {
  const cityName = formatCityName(params.city)

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold">
            Pray Watch
          </Link>
          <span className="text-sm text-muted-foreground">by IslamiCity</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
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
      </header>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <MapPin className="h-6 w-6 mr-2" />
          {cityName} Prayer Times
        </h1>
        <p className="text-muted-foreground">Accurate Islamic prayer times for {cityName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Today's Prayer Times</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <h3 className="font-medium">Fajr</h3>
                  <p className="text-2xl font-bold">5:15 AM</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <h3 className="font-medium">Sunrise</h3>
                  <p className="text-2xl font-bold">6:45 AM</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <h3 className="font-medium">Dhuhr</h3>
                  <p className="text-2xl font-bold">12:30 PM</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <h3 className="font-medium">Asr</h3>
                  <p className="text-2xl font-bold">3:45 PM</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <h3 className="font-medium">Maghrib</h3>
                  <p className="text-2xl font-bold">6:15 PM</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <h3 className="font-medium">Isha</h3>
                  <p className="text-2xl font-bold">7:45 PM</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">View Interactive Prayer Times</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/monthly">Get Monthly Calendar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">How are prayer times calculated for {cityName}?</h3>
                  <p className="text-muted-foreground">
                    Prayer times for {cityName} are calculated using astronomical formulas based on the sun's position.
                    We use the Adhan.dart library which implements various calculation methods.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">Which calculation method is used?</h3>
                  <p className="text-muted-foreground">
                    By default, we use the ISNA (Islamic Society of North America) method, but you can change this in
                    the settings to match your preferred school of thought.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">Are prayer times adjusted for Daylight Saving Time?</h3>
                  <p className="text-muted-foreground">
                    Yes, all prayer times are automatically adjusted for Daylight Saving Time in {cityName}.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold">How accurate are these prayer times?</h3>
                  <p className="text-muted-foreground">
                    Our prayer times are calculated with high precision astronomical formulas. However, they may differ
                    slightly from your local mosque's schedule, which might use different calculation parameters.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Get the Pray Watch App</h2>

              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v10m0 0v10m0-10h10m-10 0H2" />
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  Get prayer time notifications, qibla direction, and more on your mobile device.
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="https://apps.apple.com/app/pray-watch">
                    <Download className="mr-2 h-4 w-4" />
                    Download for iOS
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="https://play.google.com/store/apps/details?id=org.islamicity.praywatch">
                    <Download className="mr-2 h-4 w-4" />
                    Download for Android
                  </Link>
                </Button>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-bold">App Features:</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Accurate prayer times for {cityName} and worldwide</li>
                  <li>Prayer notifications with custom adhan</li>
                  <li>Qibla direction finder</li>
                  <li>Hijri calendar with Islamic holidays</li>
                  <li>Multiple calculation methods</li>
                  <li>Beautiful, easy-to-use interface</li>
                  <li>No ads, no tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Nearby Cities</h2>

              <ul className="space-y-2">
                <li>
                  <Link href="/prayer-times/new-york" className="text-primary hover:underline">
                    New York Prayer Times
                  </Link>
                </li>
                <li>
                  <Link href="/prayer-times/chicago" className="text-primary hover:underline">
                    Chicago Prayer Times
                  </Link>
                </li>
                <li>
                  <Link href="/prayer-times/houston" className="text-primary hover:underline">
                    Houston Prayer Times
                  </Link>
                </li>
                <li>
                  <Link href="/prayer-times/london" className="text-primary hover:underline">
                    London Prayer Times
                  </Link>
                </li>
                <li>
                  <Link href="/prayer-times" className="font-medium text-primary hover:underline">
                    View All Cities →
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
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
  )
}
