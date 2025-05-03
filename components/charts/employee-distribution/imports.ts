
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {genderChartConfig , raceChartConfig} from "./config"
import {Legend} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type employeeDistributionByGender , type employeeDistributionByRace} from '@/data/types';
export {
    TrendingUp,
    Label,
    Pie,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    PieChart,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    genderChartConfig,
    Legend,
    employeeDistributionByGender,
    employeeDistributionByRace,
    raceChartConfig
    
}