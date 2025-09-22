import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "Free",
      period: "Forever",
      description: "Perfect for trying out FlowForge",
      features: [
        "Up to 3 workflows",
        "100 executions/month",
        "Basic integrations",
        "Community support",
        "Basic analytics"
      ],
      cta: "Get Started",
      popular: false,
      variant: "glass" as const
    },
    {
      name: "Professional",
      icon: Crown,
      price: "$49",
      period: "/month",
      description: "For growing teams and businesses",
      features: [
        "Unlimited workflows",
        "10,000 executions/month",
        "All integrations",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
        "Custom branding",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true,
      variant: "accent" as const
    },
    {
      name: "Enterprise", 
      icon: Rocket,
      price: "$199",
      period: "/month",
      description: "For large organizations at scale",
      features: [
        "Everything in Professional",
        "Unlimited executions",
        "Dedicated support",
        "SOC 2 compliance",
        "SSO/SAML",
        "Custom integrations",
        "On-premise deployment",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false,
      variant: "glass" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-border/50 mb-6">
            <Crown className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Choose the plan
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              that scales with you
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core automation features 
            and 24/7 monitoring.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative glass rounded-2xl border p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-accent ring-2 ring-accent/20 scale-105' 
                    : 'border-border/50 hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-2 bg-gradient-to-r from-accent to-accent-glow text-accent-foreground rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-foreground/70">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-foreground/60 ml-2">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-foreground/60 mb-6">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="glass p-6 rounded-2xl border border-border/50 max-w-2xl mx-auto">
            <h4 className="font-semibold mb-2">Need a custom plan?</h4>
            <p className="text-foreground/70 mb-4">
              Contact our sales team for volume discounts and custom enterprise solutions.
            </p>
            <Button variant="ghost">
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;