import { getPrayerTimes, type Madhab, type CalculationMethod } from "./adhan-wasm"

export function calculatePrayerTimes(
  date: Date,
  latitude: number,
  longitude: number,
  madhab = "hanafi",
  calculationMethod = "isna",
): Record<string, string> {
  // Convert madhab and calculationMethod to the format expected by the Adhan library
  const adhanMadhab: Madhab = madhab === "hanafi" ? "hanafi" : "shafi"

  // Map our calculation methods to Adhan's calculation methods
  let adhanCalculationMethod: CalculationMethod
  switch (calculationMethod.toLowerCase()) {
    case "mwl":
    case "muslim_world_league":
      adhanCalculationMethod = "muslim_world_league"
      break
    case "isna":
    case "north_america":
      adhanCalculationMethod = "north_america"
      break
    case "egypt":
    case "egyptian":
      adhanCalculationMethod = "egyptian"
      break
    case "karachi":
      adhanCalculationMethod = "karachi"
      break
    case "umm_al_qura":
    case "makkah":
      adhanCalculationMethod = "umm_al_qura"
      break
    case "dubai":
      adhanCalculationMethod = "dubai"
      break
    default:
      adhanCalculationMethod = "north_america"
  }

  // Get prayer times using the Adhan library
  const prayerTimes = getPrayerTimes(date, latitude, longitude, adhanMadhab, adhanCalculationMethod)

  // Convert to the format expected by our application
  return {
    fajr: prayerTimes.fajr.toISOString(),
    sunrise: prayerTimes.sunrise.toISOString(),
    dhuhr: prayerTimes.dhuhr.toISOString(),
    asr: prayerTimes.asr.toISOString(),
    maghrib: prayerTimes.maghrib.toISOString(),
    isha: prayerTimes.isha.toISOString(),
  }
}
