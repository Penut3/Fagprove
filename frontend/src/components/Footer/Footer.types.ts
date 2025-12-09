export type FooterLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
}; 