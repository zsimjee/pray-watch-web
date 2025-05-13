"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import Link from "next/link"

export default function WidgetsPage() {
  const [widgetSettings, setWidgetSettings] = useState({
    city: "los-angeles",
    theme: "light",
    madhhab: "hanafi",
    size: "medium",
    showCountdown: true,
    showDailyTimes: true,
  })

  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    const code = document.getElementById("embed-code") as HTMLTextAreaElement
    if (code) {
      navigator.clipboard.writeText(code.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const generateEmbedCode = () => {
    return `<iframe 
  src="https://praywatch.islamicity.org/embed?city=${widgetSettings.city}&theme=${widgetSettings.theme}&madhhab=${widgetSettings.madhhab}&size=${widgetSettings.size}&showCountdown=${widgetSettings.showCountdown}&showDailyTimes=${widgetSettings.showDailyTimes}" 
  width="${widgetSettings.size === "small" ? "300" : widgetSettings.size === "medium" ? "400" : "600"}" 
  height="${widgetSettings.size === "small" ? "300" : widgetSettings.size === "medium" ? "400" : "600"}" 
  frameborder="0">
</iframe>`
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-bold">
            Pray Watch
          </Link>
          <span className="text-sm text-muted-foreground">by IslamiCity</span>
        </div>
      </header>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Widget Builder</h1>
        <p className="text-muted-foreground">Create an embeddable prayer times widget for your website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Widget Settings</h2>

              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="city">Location</Label>
                  <Select
                    value={widgetSettings.city}
                    onValueChange={(value) => setWidgetSettings({ ...widgetSettings, city: value })}
                  >
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="houston">Houston</SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="cairo">Cairo</SelectItem>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="istanbul">Istanbul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={widgetSettings.theme}
                    onValueChange={(value) => setWidgetSettings({ ...widgetSettings, theme: value })}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System (Auto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="madhhab">Calculation Method</Label>
                  <Select
                    value={widgetSettings.madhhab}
                    onValueChange={(value) => setWidgetSettings({ ...widgetSettings, madhhab: value })}
                  >
                    <SelectTrigger id="madhhab">
                      <SelectValue placeholder="Select calculation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hanafi">Hanafi</SelectItem>
                      <SelectItem value="shafi">Shafi'i, Maliki, Hanbali</SelectItem>
                      <SelectItem value="isna">ISNA</SelectItem>
                      <SelectItem value="mwl">Muslim World League</SelectItem>
                      <SelectItem value="egypt">Egyptian General Authority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="size">Widget Size</Label>
                  <Select
                    value={widgetSettings.size}
                    onValueChange={(value) => setWidgetSettings({ ...widgetSettings, size: value })}
                  >
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (300x300)</SelectItem>
                      <SelectItem value="medium">Medium (400x400)</SelectItem>
                      <SelectItem value="large">Large (600x600)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showCountdown"
                    checked={widgetSettings.showCountdown}
                    onChange={(e) => setWidgetSettings({ ...widgetSettings, showCountdown: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showCountdown">Show countdown timer</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showDailyTimes"
                    checked={widgetSettings.showDailyTimes}
                    onChange={(e) => setWidgetSettings({ ...widgetSettings, showDailyTimes: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="showDailyTimes">Show daily prayer times</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Embed Code</h2>
            <div className="relative">
              <textarea
                id="embed-code"
                readOnly
                value={generateEmbedCode()}
                className="w-full h-32 p-4 font-mono text-sm bg-muted rounded-md"
              />
              <Button size="sm" className="absolute top-2 right-2" onClick={handleCopyCode}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Copy and paste this code into your website to embed the prayer times widget.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Widget Preview</h2>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card>
                <CardContent className="p-0 flex items-center justify-center">
                  <div
                    className={`bg-${widgetSettings.theme === "dark" ? "gray-900" : "white"} p-4 rounded-lg`}
                    style={{
                      width:
                        widgetSettings.size === "small"
                          ? "300px"
                          : widgetSettings.size === "medium"
                            ? "400px"
                            : "600px",
                      height:
                        widgetSettings.size === "small"
                          ? "300px"
                          : widgetSettings.size === "medium"
                            ? "400px"
                            : "600px",
                    }}
                  >
                    <div className="text-center mb-4">
                      <h3 className={`font-bold ${widgetSettings.theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Prayer Times
                      </h3>
                      <p className={`text-sm ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                        Los Angeles, CA
                      </p>
                    </div>

                    {widgetSettings.showCountdown && (
                      <div className="flex justify-center mb-4">
                        <div
                          className={`w-32 h-32 rounded-full border-4 ${widgetSettings.theme === "dark" ? "border-gray-700" : "border-gray-200"} flex items-center justify-center`}
                        >
                          <div className="text-center">
                            <p
                              className={`text-xs ${widgetSettings.theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Next Prayer
                            </p>
                            <p
                              className={`font-bold ${widgetSettings.theme === "dark" ? "text-white" : "text-gray-900"}`}
                            >
                              Asr
                            </p>
                            <p
                              className={`text-sm ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                            >
                              3:45 PM
                            </p>
                            <p
                              className={`text-xs font-mono ${widgetSettings.theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                            >
                              01:23:45
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {widgetSettings.showDailyTimes && (
                      <div
                        className={`rounded-lg ${widgetSettings.theme === "dark" ? "bg-gray-800" : "bg-gray-100"} p-2`}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <div className={`p-2 ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-sm">Fajr:</span> <span className="float-right">5:15 AM</span>
                          </div>
                          <div className={`p-2 ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-sm">Sunrise:</span> <span className="float-right">6:45 AM</span>
                          </div>
                          <div className={`p-2 ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-sm">Dhuhr:</span> <span className="float-right">12:30 PM</span>
                          </div>
                          <div
                            className={`p-2 ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"} bg-primary/10`}
                          >
                            <span className="text-sm font-bold">Asr:</span>{" "}
                            <span className="float-right font-bold">3:45 PM</span>
                          </div>
                          <div className={`p-2 ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-sm">Maghrib:</span> <span className="float-right">6:15 PM</span>
                          </div>
                          <div className={`p-2 ${widgetSettings.theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="text-sm">Isha:</span> <span className="float-right">7:45 PM</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-center mt-4">
                      <p className={`text-xs ${widgetSettings.theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Powered by Pray Watch | IslamiCity
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="instructions">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">How to Embed the Widget</h3>
                  <ol className="list-decimal list-inside space-y-2 mb-4">
                    <li>Customize the widget using the settings on the left</li>
                    <li>Copy the generated embed code</li>
                    <li>Paste the code into your website's HTML where you want the widget to appear</li>
                    <li>The widget will automatically load and display prayer times for the selected location</li>
                  </ol>

                  <h3 className="font-bold text-lg mb-2">Technical Requirements</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>The widget uses an iframe which is supported by all modern browsers</li>
                    <li>Your website must allow iframe embedding</li>
                    <li>The widget is responsive and will adapt to its container</li>
                    <li>For best results, ensure the container is at least as wide as the widget</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
