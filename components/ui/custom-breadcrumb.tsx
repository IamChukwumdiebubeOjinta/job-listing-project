import type React from "react"
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbProps extends React.ComponentProps<typeof ShadcnBreadcrumb> {
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem
  Link: typeof BreadcrumbLink
  List: typeof BreadcrumbList
  Page: typeof BreadcrumbPage
  Separator: typeof BreadcrumbSeparator
} = ({ className, children, ...props }) => (
  <ShadcnBreadcrumb className={className} {...props}>
    {children}
  </ShadcnBreadcrumb>
)

Breadcrumb.Item = BreadcrumbItem
Breadcrumb.Link = BreadcrumbLink
Breadcrumb.List = BreadcrumbList
Breadcrumb.Page = BreadcrumbPage
Breadcrumb.Separator = BreadcrumbSeparator

