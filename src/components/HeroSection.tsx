import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-border/50 mb-8">
            <Zap className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">5000+ Workflow Templates</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Automate Everything
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Build Workflows Faster
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect your apps and automate workflows with our powerful no-code platform. 
            Build, deploy, and scale automation in minutes, not hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="accent" size="xl" className="group">
              Start Building Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl" className="group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 rounded-2xl"></div>
            <img
              src={heroImage}
              alt="FlowForge Dashboard - Workflow Automation Platform"
              className="w-full rounded-2xl shadow-2xl border border-border/50 glow"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-foreground/60">Active Users</div>
            </div>
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-foreground/60">Workflows Created</div>
            </div>
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-foreground/60">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;