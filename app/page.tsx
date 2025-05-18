import Link from "next/link";
import {
  BarChart3,
  Users,
  PieChart,
  TrendingUp,
  Layers,
  Settings,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Employee Management <span className="text-primary">Simplified</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A powerful, modern solution for HR teams to manage employee data,
          track performance, and make data-driven decisions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/employees">View Employees</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Employees",
            value: "500+",
            description: "Easily manage all your employees",
            icon: Users,
          },
          {
            title: "Departments",
            value: "12",
            description: "Track performance across departments",
            icon: Layers,
          },
          {
            title: "Data Points",
            value: "50+",
            description: "Comprehensive employee metrics",
            icon: BarChart3,
          },
          {
            title: "Growth",
            value: "24%",
            description: "Year-over-year company growth",
            icon: TrendingUp,
          },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Features & Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our system gives you everything you need to manage your workforce efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Analytics Dashboard",
              description: "Visual insights into workforce trends and performance metrics",
              icon: PieChart,
            },
            {
              title: "Employee Records",
              description: "Complete employee profiles with all essential information",
              icon: Users,
            },
            {
              title: "Performance Tracking",
              description: "Track and analyze employee performance ratings",
              icon: TrendingUp,
            },
            {
              title: "Real-time Updates",
              description: "Instant updates to employee records and metrics",
              icon: Clock,
            },
            {
              title: "Secure Data",
              description: "Enterprise-grade security for sensitive employee information",
              icon: Shield,
            },
            {
              title: "Customizable",
              description: "Adapt the system to your organization's unique requirements",
              icon: Settings,
            },
          ].map((feature, i) => (
            <Card key={i} className="border border-border bg-background">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-12 px-6 rounded-lg text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Ready to get started?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access the dashboard to see your employee data and start making informed decisions.
        </p>
        <Button size="lg" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </section>
    </div>
  );
}
