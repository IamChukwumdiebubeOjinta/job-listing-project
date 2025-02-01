import Link from "next/link"
import { Card } from "@/components/ui/custom-card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="p-8 max-w-sm w-full">
        <div className="flex flex-col items-center space-y-4">
          <XCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl font-semibold text-center">Page Not Found</h2>
          <p className="text-center text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
          <Button asChild>
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}


