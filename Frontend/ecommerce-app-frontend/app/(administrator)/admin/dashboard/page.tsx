"use client";

import { useState, useEffect } from "react";
import { getAdminDashboardData } from "@/lib/admin_handler";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  AlertCircle,
  Package,
  Users,
  Layers,
  BarChart3,
} from "lucide-react";
import { CategoryChart } from "./_components/category-chart";
import { UserRoleChart } from "./_components/user-role-chart";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getAdminDashboardData();
      setDashboardData(data);
    } catch (error) {
      setError("Error fetching dashboard data. Please try again.");
      console.error("Error fetching dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={fetchDashboardData}
          variant="outline"
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Products"
              value={dashboardData.totalProducts}
              icon={<Package className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Categories"
              value={dashboardData.totalCategories}
              icon={<Layers className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Users"
              value={dashboardData.totalUsers}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Total Orders"
              value={dashboardData.totalOrders}
              icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Products per Category</CardTitle>
                <CardDescription>
                  Distribution of products across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CategoryChart data={dashboardData.productsPerCategory} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Users per Role</CardTitle>
                <CardDescription>
                  Distribution of users across roles
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <UserRoleChart data={dashboardData.usersPerRole} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
