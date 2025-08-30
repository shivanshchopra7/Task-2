import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
    {/* Top Brand Header */}
    <header className="w-full border-b bg-white shadow-sm">
  <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-2 sm:gap-0">
    {/* Brand */}
    <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-green-700 to-teal-500
 bg-clip-text text-transparent">
      Edzy<span className="text-foreground">.ai</span>
    </span>

    {/* Tagline */}
    <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-right">
      Smart Learning, Simplified
    </span>
  </div>
</header>



      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:py-16 py-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
              Applications Open
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Unlock Your
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Future </span>
                Academic Potential
              </h1>
              
              <p className="text-md text-muted-foreground max-w-lg">
              Join India’s fastest-growing learning platform. With expert
                mentors, personalized study plans, and results-driven strategies,
                we help students not just learn—but truly excel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 text-white"
                  asChild
                >
                  <Link to="/enroll/step-1">
                  Start Your Enrollment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Curriculum Aligned: CBSE • ICSE • State Boards
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Specialized Programs for Classes 9–12
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                src={heroImage} 
                alt="Students learning together" 
                className="relative rounded-3xl shadow-elegant w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
            Because success in academics isn’t about studying harder—it’s about
            studying smarter. Here’s how we help you achieve that.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-form bg-gradient-card border-0 hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Mentorship</h3>
                <p className="text-muted-foreground">
                Learn directly from India’s top educators—experienced,
                approachable, and invested in your success.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-form bg-gradient-card border-0 hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-education/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-education" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Customized study plans based on your class, board, and learning preferences
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-form bg-gradient-card border-0 hover:shadow-elegant transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-muted-foreground">
                  Join thousands of successful students who achieved their academic goals with us
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete our simple 4-step enrollment process and join the community of successful learners
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 text-white"
            asChild
          >
            <Link to="/enroll/step-1">
              Begin Enrollment Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
