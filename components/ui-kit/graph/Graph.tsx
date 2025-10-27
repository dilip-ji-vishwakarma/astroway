"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type MonthlyData = {
  month: string;
  year: number;
  totalEarning?: number;
  totalRequests?: number;
};

type MonthlyGraph = {
  earnings: MonthlyData[];
  requests: MonthlyData[];
};

type GraphProps = {
  monthlyGraph: MonthlyGraph;
};

export const Graph = ({ monthlyGraph }: GraphProps) => {
  const earningsData = monthlyGraph.earnings.map((item) => ({
    month: `${item.month} ${item.year}`,
    totalEarning: item.totalEarning,
  }));

  const requestsData = monthlyGraph.requests.map((item) => ({
    month: `${item.month} ${item.year}`,
    totalRequests: item.totalRequests,
  }));

  const earningsConfig = {
    totalEarning: {
      label: "Earnings (₹)",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const requestsConfig = {
    totalRequests: {
      label: "Requests",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earning Report</CardTitle>
          <CardDescription>
            Showing total earnings for the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={earningsConfig}>
            <AreaChart
              accessibilityLayer
              data={earningsData}
              margin={{
                left: -20,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="totalEarning"
                type="natural"
                fill="var(--color-totalEarning)"
                fillOpacity={0.4}
                stroke="var(--color-totalEarning)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                {earningsData[0]?.month} –{" "}
                {earningsData[earningsData.length - 1]?.month}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Monthly Request</CardTitle>
          <CardDescription>
            Showing total requests for the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={requestsConfig}>
            <AreaChart
              accessibilityLayer
              data={requestsData}
              margin={{
                left: -20,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={3}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="totalRequests"
                type="natural"
                fill="var(--color-totalRequests)"
                fillOpacity={0.4}
                stroke="var(--color-totalRequests)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 12% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                {requestsData[0]?.month} –{" "}
                {requestsData[requestsData.length - 1]?.month}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
