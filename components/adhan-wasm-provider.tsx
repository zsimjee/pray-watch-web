"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { initAdhanWasm } from "@/lib/adhan-wasm"

export default function AdhanWasmProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const loadWasm = async () => {
      try {
        await initAdhanWasm()
        console.log("Adhan WASM module initialized")
        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to initialize Adhan WASM module:", error)
        toast({
          title: "Prayer Time Calculation Notice",
          description: "Using simplified prayer time calculations. For more accuracy, please reload the page.",
          variant: "default",
        })
        // Set loaded anyway so the app can continue with fallback calculations
        setIsLoaded(true)
      }
    }

    loadWasm()
  }, [toast])

  // Show loading state if WASM is not loaded yet
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading prayer time calculations...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
