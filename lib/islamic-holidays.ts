import { getHijriDate } from "./hijri-date"

export function getIslamicHolidays(year: number) {
  // This is a simplified mock implementation
  // In a real app, this would use proper Hijri calendar calculations

  // Mock dates for Islamic holidays in the Gregorian calendar
  // These would normally be calculated based on the Hijri calendar
  const holidays = [
    {
      name: "Islamic New Year",
      date: new Date(year, 7, 8), // Approximate date for 1 Muharram
      description: "The beginning of the Islamic lunar calendar year.",
      type: "major" as const,
    },
    {
      name: "Ashura",
      date: new Date(year, 7, 17), // Approximate date for 10 Muharram
      description: "The Day of Ashura commemorates the martyrdom of Imam Hussein.",
      type: "minor" as const,
    },
    {
      name: "Mawlid al-Nabi",
      date: new Date(year, 9, 18), // Approximate date for 12 Rabi' al-Awwal
      description: "Celebration of the birth of Prophet Muhammad (PBUH).",
      type: "major" as const,
    },
    {
      name: "Laylat al-Mi'raj",
      date: new Date(year, 2, 22), // Approximate date for 27 Rajab
      description:
        "Commemorates the night journey of Prophet Muhammad (PBUH) to Jerusalem and his ascension to heaven.",
      type: "minor" as const,
    },
    {
      name: "Beginning of Ramadan",
      date: new Date(year, 3, 12), // Approximate date for 1 Ramadan
      description: "The beginning of the holy month of fasting.",
      type: "major" as const,
    },
    {
      name: "Laylat al-Qadr",
      date: new Date(year, 4, 8), // Approximate date for 27 Ramadan
      description: "The Night of Power, when the first verses of the Quran were revealed to Prophet Muhammad (PBUH).",
      type: "major" as const,
    },
    {
      name: "Eid al-Fitr",
      date: new Date(year, 4, 12), // Approximate date for 1 Shawwal
      description: "The Festival of Breaking the Fast, marking the end of Ramadan.",
      type: "major" as const,
    },
    {
      name: "Day of Arafah",
      date: new Date(year, 6, 19), // Approximate date for 9 Dhu al-Hijjah
      description: "The day when pilgrims gather on Mount Arafah during Hajj.",
      type: "minor" as const,
    },
    {
      name: "Eid al-Adha",
      date: new Date(year, 6, 20), // Approximate date for 10 Dhu al-Hijjah
      description: "The Festival of Sacrifice, commemorating Prophet Ibrahim's willingness to sacrifice his son.",
      type: "major" as const,
    },
  ]

  // Add Hijri dates to each holiday
  return holidays.map((holiday) => ({
    ...holiday,
    hijriDate: getHijriDate(holiday.date),
  }))
}
