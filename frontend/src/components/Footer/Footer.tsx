import type React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { FooterSection, FooterLink } from "./Footer.types"

export type FooterProps = {
  sections?: FooterSection[]
  bottomText?: React.ReactNode
  bottomLinks?: FooterLink[]
  socialLinks?: FooterLink[]
  className?: string
  style?: React.CSSProperties
}

const Footer: React.FC<FooterProps> = ({
  sections = [],
  bottomText,
  bottomLinks = [],
  socialLinks = [],
  className = "",
  style,
}) => (
  <footer className={`w-full bg-background text-foreground py-12 ${className}`} style={style}>
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-y-10 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="font-semibold text-base tracking-wide">{section.title}</h4>
            <ul className="space-y-3">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
          {bottomLinks?.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-3">
              {socialLinks.map((link, idx) => (
                <Button
                  key={idx}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 hover:bg-muted/80"
                >
                  <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          )}
          {bottomText && <div className="text-sm text-muted-foreground">{bottomText}</div>}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
