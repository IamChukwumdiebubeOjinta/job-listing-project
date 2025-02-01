import { Card } from "@/components/ui/custom-card"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="p-8 max-w-sm w-full">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-2xl font-semibold text-center">Loading...</h2>
          <p className="text-center text-muted-foreground">Please wait while we fetch your data.</p>
        </div>
      </Card>
    </div>
  )
}

