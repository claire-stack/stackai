import { 
  Zap, 
  Code, 
  Globe, 
  Shield, 
  Workflow, 
  BarChart3,
  Clock,
  Users,
  Puzzle
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Deploy workflows in seconds with our optimized runtime engine."
    },
    {
      icon: Code,
      title: "No-Code Builder",
      description: "Drag, drop, and connect. Build complex automations without writing code."
    },
    {
      icon: Globe,
      title: "500+ Integrations",
      description: "Connect with all your favorite apps and services seamlessly."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with SOC 2, GDPR, and more."
    },
    {
      icon: Workflow,
      title: "Advanced Logic",
      description: "Conditional paths, loops, and complex decision trees made simple."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor performance and optimize workflows with detailed insights."
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Automatic error handling and smart retry mechanisms."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share workflows, manage permissions, and work together seamlessly."
    },
    {
      icon: Puzzle,
      title: "Custom Functions",
      description: "Extend functionality with custom code snippets and API calls."
    }
  ];

  return (
    <section id="product" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-border/50 mb-6">
            <Workflow className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              automate workflows
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From simple task automation to complex business processes, 
            FlowForge provides all the tools you need to succeed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="glass p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass p-8 rounded-2xl border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your workflow?
            </h3>
            <p className="text-foreground/70 mb-6">
              Join thousands of teams already automating with FlowForge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:scale-105 transition-transform glow-accent">
                Start Free Trial
              </button>
              <button className="px-8 py-3 glass border border-border/50 rounded-xl hover:border-primary/50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;