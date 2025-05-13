import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, MapPin, Search } from "lucide-react"

export const metadata = {
  title: "Prayer Times Directory | Pray Watch by IslamiCity",
  description:
    "Find accurate Islamic prayer times for cities worldwide. View Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times for any location.",
}

export default function PrayerTimesDirectoryPage() {
  const popularCities = [
    { name: "Los Angeles", slug: "los-angeles" },
    { name: "New York", slug: "new-york" },
    { name: "Chicago", slug: "chicago" },
    { name: "Houston", slug: "houston" },
    { name: "London", slug: "london" },
    { name: "Cairo", slug: "cairo" },
    { name: "Dubai", slug: "dubai" },
    { name: "Istanbul", slug: "istanbul" },
  ]

  const regions = [
    {
      name: "North America",
      cities: [
        { name: "Los Angeles", slug: "los-angeles" },
        { name: "New York", slug: "new-york" },
        { name: "Chicago", slug: "chicago" },
        { name: "Houston", slug: "houston" },
        { name: "Toronto", slug: "toronto" },
        { name: "Mexico City", slug: "mexico-city" },
      ],
    },
    {
      name: "Europe",
      cities: [
        { name: "London", slug: "london" },
        { name: "Paris", slug: "paris" },
        { name: "Berlin", slug: "berlin" },
        { name: "Madrid", slug: "madrid" },
        { name: "Rome", slug: "rome" },
        { name: "Istanbul", slug: "istanbul" },
      ],
    },
    {
      name: "Middle East",
      cities: [
        { name: "Cairo", slug: "cairo" },
        { name: "Dubai", slug: "dubai" },
        { name: "Riyadh", slug: "riyadh" },
        { name: "Mecca", slug: "mecca" },
        { name: "Medina", slug: "medina" },
        { name: "Tehran", slug: "tehran" },
      ],
    },
    {
      name: "Asia",
      cities: [
        { name: "Kuala Lumpur", slug: "kuala-lumpur" },
        { name: "Jakarta", slug: "jakarta" },
        { name: "Karachi", slug: "karachi" },
        { name: "Mumbai", slug: "mumbai" },
        { name: "Dhaka", slug: "dhaka" },
        { name: "Singapore", slug: "singapore" },
      ],
    },
  ]

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
        <h1 className="text-3xl font-bold mb-2">Prayer Times Directory</h1>
        <p className="text-muted-foreground">Find accurate Islamic prayer times for cities worldwide</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm border rounded-lg bg-background"
          placeholder="Search for a city..."
        />
        <Button className="absolute right-2.5 bottom-2.5">Search</Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Popular Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularCities.map((city) => (
            <Card key={city.slug}>
              <CardContent className="p-4">
                <Link href={`/prayer-times/${city.slug}`} className="flex items-center gap-2 hover:text-primary">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{city.name}</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {regions.map((region) => (
          <div key={region.name}>
            <h2 className="text-xl font-bold mb-4">{region.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {region.cities.map((city) => (
                <Card key={city.slug}>
                  <CardContent className="p-4">
                    <Link href={`/prayer-times/${city.slug}`} className="flex items-center gap-2 hover:text-primary">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{city.name}</span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-muted rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">About Prayer Times</h2>
            <p className="mb-4">
              Prayer times (Salah) are determined based on the position of the sun in the sky. The five daily prayers in
              Islam are Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night).
            </p>
            <p>
              Different calculation methods exist to determine the exact times, based on various schools of thought in
              Islam. Pray Watch provides accurate prayer times using established astronomical calculations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Download the Pray Watch App</h2>
            <p className="mb-4">
              Get prayer time notifications, qibla direction, and more on your mobile device. Our app is
              privacy-focused, ad-free, and designed with a beautiful interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="https://apps.apple.com/app/pray-watch">
                  <Download className="mr-2 h-4 w-4" />
                  iOS App
                </Link>
              </Button>
              <Button asChild>
                <Link href="https://play.google.com/store/apps/details?id=org.islamicity.praywatch">
                  <Download className="mr-2 h-4 w-4" />
                  Android App
                </Link>
              </Button>
            </div>
          </div>
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
