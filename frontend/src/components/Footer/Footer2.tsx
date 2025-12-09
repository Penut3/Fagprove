import type React from "react"
import { Button } from "@/components/ui/button"
import type { FooterSection, FooterLink } from "./Footer.types"

export type FooterProps = {
  logo?: React.ReactNode // Logo element like <img src="logo.png">, text, or custom component
  description?: React.ReactNode
  sections?: FooterSection[]
  bottomText?: React.ReactNode
  bottomLinks?: FooterLink[]
  socialLinks?: FooterLink[]
  className?: string
  style?: React.CSSProperties
}

const Footer: React.FC<FooterProps> = ({
  logo = null,
  description = null,
  sections = [],
  bottomText,
  bottomLinks = [],
  socialLinks = [],
  className = "",
  style,
}) => (
  <footer className={`w-full bg-background text-foreground pt-16 pb-8 ${className}`} style={style}>
    <div className="container mx-auto px-4">
      {/* Top section with logo and sections in a new layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Logo and description column */}
        {(logo || socialLinks.length > 0) && (
          <div className="lg:col-span-4 space-y-6">
            {logo && <div className="mb-4">{logo}</div>}

            {description && <div className="text-muted-foreground text-sm max-w-md">{description}</div>}

            {/* Social links in the left column */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((link, idx) => (
                  <Button
                    key={idx}
                    asChild
                    variant="outline"
                    size="icon"
                    className="rounded-full border-muted-foreground/20 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                  >
                    <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sections in a different arrangement */}
        <div className={`${logo || socialLinks.length > 0 ? "lg:col-span-8" : "lg:col-span-12"}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="font-medium text-base border-b border-border pb-2">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section with a new design */}
      <div className="mt-16 pt-6 border-t border-border">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          {/* Bottom text */}
          {bottomText && <div className="text-sm text-muted-foreground">{bottomText}</div>}

          {/* Bottom links with a new style */}
          {bottomLinks && bottomLinks.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-end">
              {bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
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

export default Footer
