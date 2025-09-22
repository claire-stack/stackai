import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      title: "10 Game-Changing Automation Ideas for 2025",
      excerpt: "Discover the latest automation trends that are transforming how businesses operate and scale their workflows.",
      author: "Sarah Chen",
      date: "Dec 18, 2024",
      readTime: "5 min read",
      category: "Automation",
      featured: true,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      title: "How to Build Your First AI-Powered Workflow",
      excerpt: "Step-by-step guide to creating intelligent automations that learn and adapt to your business needs.",
      author: "Marcus Rodriguez",
      date: "Dec 15, 2024", 
      readTime: "8 min read",
      category: "Tutorial",
      featured: false,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      title: "Enterprise Security Best Practices",
      excerpt: "Essential security measures every enterprise should implement when deploying workflow automation at scale.",
      author: "Emily Watson",
      date: "Dec 12, 2024",
      readTime: "6 min read", 
      category: "Security",
      featured: false,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    }
  ];

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-border/50 mb-6">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Latest Insights</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Learn from the
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              automation experts
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Stay ahead with the latest automation trends, tutorials, and best practices 
            from industry leaders and our expert team.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="glass rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-accent to-accent-glow text-accent-foreground text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-6 text-lg">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent mr-3"></div>
                    <div>
                      <div className="font-medium">{blogPosts[0].author}</div>
                      <div className="text-sm text-foreground/60">{blogPosts[0].date}</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="group">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.slice(1).map((post, index) => (
            <div
              key={index}
              className="glass rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent mr-2"></div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs text-foreground/60">{post.date}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button variant="accent" size="lg" className="group">
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;