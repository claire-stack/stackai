import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Slack, 
  Database, 
  Calendar, 
  ShoppingCart, 
  BarChart3,
  Users,
  Workflow,
  ArrowRight,
  Star,
  Download
} from "lucide-react";

const TemplatesSection = () => {
  const categories = [
    { name: "AI", active: true },
    { name: "Sales", active: false },
    { name: "Marketing", active: false },
    { name: "IT Ops", active: false },
    { name: "HR", active: false },
    { name: "Support", active: false }
  ];

  const templates = [
    {
      title: "AI Content Generator",
      description: "Generate blog posts, social media content, and marketing copy using AI",
      icon: BarChart3,
      downloads: "2.1k",
      rating: 4.9,
      category: "Marketing",
      featured: true
    },
    {
      title: "Lead Scoring Automation", 
      description: "Automatically score and route leads based on behavior and demographics",
      icon: Users,
      downloads: "1.8k",
      rating: 4.8,
      category: "Sales"
    },
    {
      title: "Customer Onboarding Flow",
      description: "Welcome new customers with personalized email sequences and task automation",
      icon: Mail,
      downloads: "3.2k",
      rating: 4.9,
      category: "Support"
    },
    {
      title: "Inventory Management",
      description: "Track stock levels, auto-reorder products, and sync with your e-commerce platform",
      icon: ShoppingCart,
      downloads: "1.5k",
      rating: 4.7,
      category: "E-commerce"
    },
    {
      title: "Meeting Scheduler",
      description: "Coordinate meetings across time zones with automatic calendar integration",
      icon: Calendar,
      downloads: "2.7k",
      rating: 4.8,
      category: "Productivity"
    },
    {
      title: "Data Sync Pipeline",
      description: "Keep your databases in sync across multiple platforms and applications",
      icon: Database,
      downloads: "1.9k",
      rating: 4.6,
      category: "IT Ops"
    }
  ];

  return (
    <section id="templates" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-border/50 mb-6">
            <Workflow className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">5684 Templates Available</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Ready-to-use
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              automation templates
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
            Start with proven workflows from our community. 
            Copy, customize, and deploy in minutes.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  category.active
                    ? 'bg-gradient-to-r from-primary to-accent text-accent-foreground'
                    : 'glass border border-border/50 hover:border-primary/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <div
                key={index}
                className={`glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 group hover:scale-105 ${
                  template.featured ? 'ring-2 ring-accent/20' : ''
                }`}
              >
                {template.featured && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-accent to-accent-glow text-accent-foreground text-xs font-medium mb-4">
                    Featured
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-foreground/60 mb-1">
                      <Download className="w-4 h-4 mr-1" />
                      {template.downloads}
                    </div>
                    <div className="flex items-center text-sm text-foreground/60">
                      <Star className="w-4 h-4 mr-1 fill-accent text-accent" />
                      {template.rating}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{template.title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">
                    {template.category}
                  </span>
                  <Button variant="ghost" size="sm" className="group">
                    Use Template
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button variant="accent" size="lg" className="group">
            View All 5,684 Templates
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;