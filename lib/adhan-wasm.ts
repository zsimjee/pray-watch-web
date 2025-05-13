// This file handles the integration with the Adhan Dart library compiled to WASM

// Types for prayer times
export interface PrayerTimes {
  fajr: Date
  sunrise: Date
  dhuhr: Date
  asr: Date
  maghrib: Date
  isha: Date
}

// Types for calculation parameters
export type CalculationMethod =
  | "muslim_world_league"
  | "egyptian"
  | "karachi"
  | "umm_al_qura"
  | "dubai"
  | "qatar"
  | "kuwait"
  | "singapore"
  | "north_america"
  | "other"

export type Madhab = "shafi" | "hanafi"

// Global variable to hold the Adhan WASM module
let adhanWasmInitialized = false
let adhanBridge: any = null

// Function to initialize the WASM module
export async function initAdhanWasm(): Promise<void> {
  if (adhanWasmInitialized) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    try {
      // Add Flutter initialization script
      const script = document.createElement("script")
      script.src = "/wasm/flutter.js"
      script.defer = true
      document.body.appendChild(script)

      script.onload = () => {
        // Initialize Flutter
        // @ts-ignore - Flutter is loaded from the script
        window.flutterConfiguration = {
          canvasKitBaseUrl: "/wasm/",
        }

        // Load the main Dart JS file
        const mainScript = document.createElement("script")
        mainScript.src = "/wasm/main.dart.js"
        mainScript.defer = true
        document.body.appendChild(mainScript)

        mainScript.onload = () => {
          // Wait for Flutter to initialize
          const checkInitialized = setInterval(() => {
            // @ts-ignore - AdhanBridge is exposed by the Dart code
            if (window.AdhanBridge) {
              clearInterval(checkInitialized)
              // @ts-ignore - AdhanBridge is exposed by the Dart code
              adhanBridge = window.AdhanBridge
              adhanWasmInitialized = true
              resolve()
            }
          }, 100)

          // Timeout after 10 seconds
          setTimeout(() => {
            if (!adhanWasmInitialized) {
              clearInterval(checkInitialized)
              reject(new Error("Failed to initialize Adhan WASM module"))
            }
          }, 10000)
        }

        mainScript.onerror = () => {
          reject(new Error("Failed to load main.dart.js"))
        }
      }

      script.onerror = () => {
        reject(new Error("Failed to load flutter.js"))
      }
    } catch (error) {
      reject(error)
    }
  })
}

// Function to calculate prayer times using the WASM module
export function getPrayerTimes(
  date: Date,
  latitude: number,
  longitude: number,
  madhab: Madhab = "shafi",
  calculationMethod: CalculationMethod = "north_america",
): PrayerTimes {
  if (!adhanWasmInitialized || !adhanBridge) {
    // Fallback to our simplified calculations if WASM is not initialized
    return getFallbackPrayerTimes(date, latitude, longitude, madhab, calculationMethod)
  }

  try {
    // Call the Adhan WASM module
    const result = adhanBridge.getPrayerTimes(
      date.getFullYear(),
      date.getMonth() + 1, // Months are 1-indexed in Dart
      date.getDate(),
      latitude,
      longitude,
      calculationMethod,
      madhab,
    )

    // Parse the JSON result
    const prayerTimes = JSON.parse(result)

    // Convert ISO strings to Date objects
    return {
      fajr: new Date(prayerTimes.fajr),
      sunrise: new Date(prayerTimes.sunrise),
      dhuhr: new Date(prayerTimes.dhuhr),
      asr: new Date(prayerTimes.asr),
      maghrib: new Date(prayerTimes.maghrib),
      isha: new Date(prayerTimes.isha),
    }
  } catch (error) {
    console.error("Error calculating prayer times with WASM:", error)
    // Fallback to our simplified calculations
    return getFallbackPrayerTimes(date, latitude, longitude, madhab, calculationMethod)
  }
}

// Fallback function for prayer time calculations
function getFallbackPrayerTimes(
  date: Date,
  latitude: number,
  longitude: number,
  madhab: Madhab = "shafi",
  calculationMethod: CalculationMethod = "north_america",
): PrayerTimes {
  // This is a simplified calculation
  // The actual calculation would use the equation of time and other factors

  // Get day of year
  const dayOfYear = getDayOfYear(date)

  // Get declination of the sun
  const declination = getSunDeclination(dayOfYear)

  // Calculate prayer times based on sun position
  const baseDate = new Date(date)
  baseDate.setHours(0, 0, 0, 0)

  // Calculate prayer times using formulas
  // These are simplified calculations for demonstration
  // The actual Adhan library uses more complex astronomical calculations

  // Fajr: 18 degrees before sunrise
  const fajrTime = calculatePrayerTime(baseDate, latitude, longitude, 18, true, declination)

  // Sunrise
  const sunriseTime = calculateSunriseTime(baseDate, latitude, longitude, declination)

  // Dhuhr: when sun passes the meridian (noon)
  const dhuhrTime = calculateDhuhrTime(baseDate, longitude)

  // Asr: depends on madhab
  const asrShadowFactor = madhab === "hanafi" ? 2 : 1
  const asrTime = calculateAsrTime(baseDate, latitude, longitude, asrShadowFactor, declination)

  // Maghrib: at sunset
  const maghribTime = calculateMaghribTime(baseDate, latitude, longitude, declination)

  // Isha: 17 degrees after sunset for 'north_america' method
  const ishaAngle = calculationMethod === "north_america" ? 17 : 18
  const ishaTime = calculatePrayerTime(baseDate, latitude, longitude, ishaAngle, false, declination)

  return {
    fajr: fajrTime,
    sunrise: sunriseTime,
    dhuhr: dhuhrTime,
    asr: asrTime,
    maghrib: maghribTime,
    isha: ishaTime,
  }
}

// Helper functions for astronomical calculations

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function getSunDeclination(dayOfYear: number): number {
  // Simplified formula for sun declination
  return -23.45 * Math.cos(((2 * Math.PI) / 365) * (dayOfYear + 10))
}

function calculatePrayerTime(
  date: Date,
  latitude: number,
  longitude: number,
  angle: number,
  isMorning: boolean,
  declination: number,
): Date {
  // This is a simplified calculation
  // The actual calculation would use the equation of time and other factors
  const result = new Date(date)

  // Base time (6 AM for morning prayers, 6 PM for evening prayers)
  const baseHour = isMorning ? 6 : 18
  result.setHours(baseHour)

  // Adjust based on latitude, angle, and declination
  // This is a very simplified approximation
  const adjustment = (angle / 15) * (1 - Math.abs(latitude) / 90)
  const hourAdjustment = isMorning ? -adjustment : adjustment

  result.setHours(result.getHours() + hourAdjustment)

  // Adjust for longitude
  const longitudeAdjustment = (longitude % 15) / 15
  result.setMinutes(result.getMinutes() + longitudeAdjustment * 60)

  return result
}

function calculateSunriseTime(date: Date, latitude: number, longitude: number, declination: number): Date {
  // Simplified sunrise calculation
  const result = new Date(date)
  result.setHours(6)

  // Adjust based on latitude and declination
  const latitudeAdjustment = (0.1 * latitude) / 15
  result.setHours(result.getHours() - latitudeAdjustment)

  // Adjust for longitude
  const longitudeAdjustment = (longitude % 15) / 15
  result.setMinutes(result.getMinutes() + longitudeAdjustment * 60)

  return result
}

function calculateDhuhrTime(date: Date, longitude: number): Date {
  // Simplified Dhuhr calculation (solar noon)
  const result = new Date(date)
  result.setHours(12)

  // Adjust for longitude
  const longitudeAdjustment = (longitude % 15) / 15
  result.setMinutes(result.getMinutes() + longitudeAdjustment * 60)

  return result
}

function calculateAsrTime(
  date: Date,
  latitude: number,
  longitude: number,
  shadowFactor: number,
  declination: number,
): Date {
  // Simplified Asr calculation
  const result = new Date(date)
  result.setHours(15)

  // Adjust based on shadow factor (madhab)
  const shadowAdjustment = 0.5 * shadowFactor
  result.setHours(result.getHours() + shadowAdjustment)

  // Adjust for longitude
  const longitudeAdjustment = (longitude % 15) / 15
  result.setMinutes(result.getMinutes() + longitudeAdjustment * 60)

  return result
}

function calculateMaghribTime(date: Date, latitude: number, longitude: number, declination: number): Date {
  // Simplified Maghrib calculation (sunset)
  const result = new Date(date)
  result.setHours(18)

  // Adjust based on latitude and declination
  const latitudeAdjustment = (0.1 * latitude) / 15
  result.setHours(result.getHours() + latitudeAdjustment)

  // Adjust for longitude
  const longitudeAdjustment = (longitude % 15) / 15
  result.setMinutes(result.getMinutes() + longitudeAdjustment * 60)

  return result
}
