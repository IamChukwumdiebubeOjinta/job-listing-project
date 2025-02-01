import type React from "react"
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardProps extends React.ComponentProps<typeof ShadcnCard> {
  className?: string
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <ShadcnCard className={`bg-card/50 backdrop-blur-md border-border ${className}`} {...props}>
    {children}
  </ShadcnCard>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

