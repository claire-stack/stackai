import { Button } from "@/components/ui/button";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ArrowRight,
  Workflow
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Templates", href: "#templates" },
      { name: "Integrations", href: "#integrations" },
      { name: "Pricing", href: "#pricing" },
      { name: "API Docs", href: "#api" }
    ],
    Company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
      { name: "Press Kit", href: "#press" }
    ],
    Support: [
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" },
      { name: "Status", href: "#status" },
      { name: "Security", href: "#security" },
      { name: "Privacy", href: "#privacy" }
    ],
    Resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Tutorials", href: "#tutorials" },
      { name: "Webinars", href: "#webinars" },
      { name: "Case Studies", href: "#cases" },
      { name: "Partners", href: "#partners" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="relative py-20 border-t border-border/50">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="glass rounded-2xl border border-border/50 p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Workflow className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Stay ahead of the automation curve
            </h3>
            <p className="text-foreground/70 mb-8">
              Get weekly insights, tutorials, and updates delivered to your inbox. 
              Join 50,000+ automation enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="accent" className="group">
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FlowForge
              </span>
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              The most powerful no-code automation platform. 
              Connect your apps, automate workflows, and scale your business 
              without writing a single line of code.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center justify-center w-10 h-10 rounded-xl glass border border-border/50 hover:border-primary/50 transition-colors group"
                  >
                    <IconComponent className="w-5 h-5 group-hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-foreground/60 text-sm">
              © 2024 FlowForge. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#terms" className="text-foreground/60 hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#privacy" className="text-foreground/60 hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#cookies" className="text-foreground/60 hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;