import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { FooterSection, FooterLink } from "./Footer.types"

export type FooterProps = {
  logo?: React.ReactNode
  tagline?: string
  description?: React.ReactNode
  sections?: FooterSection[]
  bottomText?: React.ReactNode
  bottomLinks?: FooterLink[]
  socialLinks?: FooterLink[]
  ctaButton?: {
    label: string
    href: string
    variant?: "default" | "outline" | "secondary"
  }
  className?: string
  style?: React.CSSProperties
}

const Footer: React.FC<FooterProps> = ({
  logo = null,
  tagline = "",
  description = null,
  sections = [],
  bottomText,
  bottomLinks = [],
  socialLinks = [],
  ctaButton = null,
  className = "",
  style,
}) => {
  return (
    <footer
      className={`w-full bg-gradient-to-br from-background via-background to-muted/20 ${className}`}
      style={style}
    >
      {/* Hero section of footer */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {logo && <div className="mb-6 flex justify-center">{logo}</div>}

          {tagline && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {tagline}
            </h2>
          )}

          {description && (
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {ctaButton && (
              <Button asChild variant={ctaButton.variant || "default"} size="lg" className="px-8">
                <a href={ctaButton.href}>{ctaButton.label}</a>
              </Button>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link, idx) => (
                  <Button
                    key={idx}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  >
                    <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sections in modern card layout */}
        {sections.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sections.map((section, idx) => (
              <Card key={idx} className="border-0 bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-base mb-4 text-primary">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm block py-1"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bottom section with modern styling */}
      <div className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {bottomText && <div className="text-sm text-muted-foreground order-2 md:order-1">{bottomText}</div>}

            {bottomLinks && bottomLinks.length > 0 && (
              <div className="flex flex-wrap gap-6 order-1 md:order-2">
                {bottomLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
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
