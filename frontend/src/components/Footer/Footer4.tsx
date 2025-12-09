import type React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { FooterSection, FooterLink } from "./Footer.types"

export type FooterProps = {
  logo?: React.ReactNode
  companyName?: string
  description?: React.ReactNode
  companyInfo?: {
    address?: string
    phone?: string
    email?: string
  }
  sections?: FooterSection[]
  featuredLinks?: FooterLink[]
  bottomText?: React.ReactNode
  bottomLinks?: FooterLink[]
  socialLinks?: FooterLink[]
  badge?: {
    text: string
    variant?: "default" | "secondary" | "outline"
  }
  className?: string
  style?: React.CSSProperties
}

const Footer: React.FC<FooterProps> = ({
  logo = null,
  companyName = "",
  description = null,
  companyInfo = {},
  sections = [],
  featuredLinks = [],
  bottomText,
  bottomLinks = [],
  socialLinks = [],
  badge = null,
  className = "",
  style,
}) => {
  return (
    <footer className={`w-full bg-background text-foreground ${className}`} style={style}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px]">
          {/* Left sidebar - Company info */}
          <div className="lg:col-span-2 bg-muted/30 p-8 lg:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Logo and company name */}
              <div className="space-y-4">
                {logo && <div className="mb-4">{logo}</div>}
                {companyName && <h3 className="text-xl font-bold">{companyName}</h3>}
                {badge && (
                  <Badge variant={badge.variant || "default"} className="w-fit">
                    {badge.text}
                  </Badge>
                )}
              </div>

              {/* Description */}
              {description && <p className="text-muted-foreground leading-relaxed">{description}</p>}

              {/* Company contact info */}
              {(companyInfo.address || companyInfo.phone || companyInfo.email) && (
                <div className="space-y-2 text-sm">
                  {companyInfo.address && (
                    <div className="flex items-start gap-2">
                      <span className="text-muted-foreground min-w-0 flex-1">{companyInfo.address}</span>
                    </div>
                  )}
                  {companyInfo.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{companyInfo.phone}</span>
                    </div>
                  )}
                  {companyInfo.email && (
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Social links at bottom of sidebar */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3 pt-6">
                {socialLinks.map((link, idx) => (
                  <Button key={idx} asChild variant="ghost" size="icon" className="rounded-lg hover:bg-background/80">
                    <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Right content area */}
          <div className="lg:col-span-3 p-8 lg:p-12">
            {/* Featured links section */}
            {featuredLinks && featuredLinks.length > 0 && (
              <div className="mb-10">
                <h4 className="font-semibold text-lg mb-4">Quick Access</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuredLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                    >
                      {link.icon && <div className="text-primary">{link.icon}</div>}
                      <span className="font-medium group-hover:text-primary transition-colors">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Regular sections in compact layout */}
            {sections.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <a href={link.href} className="text-sm hover:text-primary transition-colors block py-1">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <Separator />
        <div className="px-8 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            {bottomText && <div className="text-muted-foreground">{bottomText}</div>}

            {bottomLinks && bottomLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {bottomLinks.map((link, idx) => (
                  <a key={idx} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
