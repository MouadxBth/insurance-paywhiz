"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  Car,
  CheckCircle,
  Heart,
  Home,
  Shield,
  Star,
  ThumbsUp,
  Umbrella,
} from "lucide-react";
import {
  InsurancePlan,
  mockCurrentPlans,
  mockRecommendedPlans,
} from "@/lib/mock-data";
import { InsuranceChatbot } from "./insurance-chatbot";

export function EmployeeDashboard() {
  const [coverageAmount, setCoverageAmount] = useState(250000);
  const [deductible, setDeductible] = useState(500);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
  const [selectedPlansToCompare, setSelectedPlansToCompare] = useState<
    string[]
  >([]);

  const [agreed, setAgreed] = useState(false);

  const handleEnroll = (plan: InsurancePlan | null) => {
    setSelectedPlan(plan);
    setIsEnrollDialogOpen(true);
  };

  const confirmEnrollment = () => {
    alert(`Successfully enrolled in ${selectedPlan?.name}`);
    setIsEnrollDialogOpen(false);
  };

  const togglePlanComparison = (planId: string) => {
    setSelectedPlansToCompare((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">My Insurance</TabsTrigger>
          <TabsTrigger value="explore">Explore Plans</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCurrentPlans.length > 0 ? (
              mockCurrentPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {plan.type === "auto" && (
                          <Car className="h-5 w-5 text-blue-500" />
                        )}
                        {plan.type === "home" && (
                          <Home className="h-5 w-5 text-green-500" />
                        )}
                        {plan.type === "life" && (
                          <Heart className="h-5 w-5 text-red-500" />
                        )}
                        <CardTitle>{plan.name}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 hover:bg-green-100"
                      >
                        Active
                      </Badge>
                    </div>
                    <CardDescription>{plan.provider}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid gap-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Monthly Premium:
                        </span>
                        <span className="font-medium">${plan.premium}/mo</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Coverage:</span>
                        <span className="font-medium">
                          ${plan.coverage.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Deductible:
                        </span>
                        <span className="font-medium">${plan.deductible}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Renewal Date:
                        </span>
                        <span className="font-medium">{plan.renewalDate}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Modify Plan</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <Umbrella className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">
                  No Active Insurance Plans
                </h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  You don&apos;t have any active insurance plans through PayWhiz
                  yet.
                </p>
                <Button>Explore Available Plans</Button>
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>
                Based on your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockRecommendedPlans.slice(0, 3).map((plan) => (
                  <Card
                    key={plan.id}
                    className="overflow-hidden border-2 border-primary/20"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        {plan.type === "auto" && (
                          <Car className="h-5 w-5 text-blue-500" />
                        )}
                        {plan.type === "home" && (
                          <Home className="h-5 w-5 text-green-500" />
                        )}
                        {plan.type === "life" && (
                          <Heart className="h-5 w-5 text-red-500" />
                        )}
                        <CardTitle>{plan.name}</CardTitle>
                      </div>
                      <CardDescription>{plan.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid gap-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Monthly Premium:
                          </span>
                          <span className="font-medium">
                            ${plan.premium}/mo
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Coverage:
                          </span>
                          <span className="font-medium">
                            ${plan.coverage.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-primary">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>Recommended: {plan.recommendationReason}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3">
                      <Button
                        className="w-full"
                        onClick={() => handleEnroll(plan)}
                      >
                        Enroll Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explore" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find the Right Coverage</CardTitle>
              <CardDescription>
                Customize your search to find plans that fit your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="insurance-type">Insurance Type</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger id="insurance-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto Insurance</SelectItem>
                        <SelectItem value="home">Home Insurance</SelectItem>
                        <SelectItem value="life">Life Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="provider">Provider</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Providers</SelectItem>
                        <SelectItem value="statewide">
                          Statewide Insurance
                        </SelectItem>
                        <SelectItem value="liberty">Liberty Mutual</SelectItem>
                        <SelectItem value="progressive">Progressive</SelectItem>
                        <SelectItem value="allstate">Allstate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="coverage-amount">Coverage Amount</Label>
                      <span className="text-sm text-muted-foreground">
                        ${coverageAmount.toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      id="coverage-amount"
                      defaultValue={[250000]}
                      max={1000000}
                      step={50000}
                      onValueChange={(value) => setCoverageAmount(value[0])}
                      className="py-4"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="deductible">Deductible</Label>
                      <span className="text-sm text-muted-foreground">
                        ${deductible}
                      </span>
                    </div>
                    <Slider
                      id="deductible"
                      defaultValue={[500]}
                      max={2000}
                      step={100}
                      onValueChange={(value) => setDeductible(value[0])}
                      className="py-4"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="payroll-deduction" defaultChecked />
                    <Label htmlFor="payroll-deduction">Payroll Deduction</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="employer-discount" defaultChecked />
                    <Label htmlFor="employer-discount">
                      Include Employer Discounts
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="bundle-discount" />
                    <Label htmlFor="bundle-discount">
                      Bundle Multiple Policies
                    </Label>
                  </div>

                  <Button className="w-full mt-4">Search Plans</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockRecommendedPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {plan.type === "auto" && (
                        <Car className="h-5 w-5 text-blue-500" />
                      )}
                      {plan.type === "home" && (
                        <Home className="h-5 w-5 text-green-500" />
                      )}
                      {plan.type === "life" && (
                        <Heart className="h-5 w-5 text-red-500" />
                      )}
                      <CardTitle>{plan.name}</CardTitle>
                    </div>
                    {plan.isPopular && (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        <Star className="mr-1 h-3 w-3" /> Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{plan.provider}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Monthly Premium:
                      </span>
                      <span className="font-medium">${plan.premium}/mo</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coverage:</span>
                      <span className="font-medium">
                        ${plan.coverage.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deductible:</span>
                      <span className="font-medium">${plan.deductible}</span>
                    </div>
                    {plan?.employerContribution &&
                      plan?.employerContribution > 0 && (
                        <div className="flex items-center mt-2 text-sm text-green-600">
                          <Shield className="h-4 w-4 mr-1" />
                          <span>
                            {plan.employerContribution}% employer contribution
                          </span>
                        </div>
                      )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => handleEnroll(plan)}>
                    Enroll
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compare Insurance Plans</CardTitle>
                <CardDescription>
                  Select plans to compare side by side
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">
                    Select plans to compare
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockRecommendedPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPlansToCompare.includes(plan.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => togglePlanComparison(plan.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {plan.type === "auto" && (
                              <Car className="h-5 w-5 text-blue-500" />
                            )}
                            {plan.type === "home" && (
                              <Home className="h-5 w-5 text-green-500" />
                            )}
                            {plan.type === "life" && (
                              <Heart className="h-5 w-5 text-red-500" />
                            )}
                            <span className="font-medium">{plan.name}</span>
                          </div>
                          <Checkbox
                            checked={selectedPlansToCompare.includes(plan.id)}
                            onCheckedChange={() =>
                              togglePlanComparison(plan.id)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {plan.provider}
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="flex justify-between">
                            <span>Premium:</span>
                            <span className="font-medium">
                              ${plan.premium}/mo
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPlansToCompare.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left p-2 border-b">Features</th>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            if (!plan) return null;
                            return (
                              <th key={plan.id} className="p-2 border-b">
                                <div className="flex flex-col items-center">
                                  {plan.type === "auto" && (
                                    <Car className="h-5 w-5 text-blue-500 mb-1" />
                                  )}
                                  {plan.type === "home" && (
                                    <Home className="h-5 w-5 text-green-500 mb-1" />
                                  )}
                                  {plan.type === "life" && (
                                    <Heart className="h-5 w-5 text-red-500 mb-1" />
                                  )}
                                  <span>{plan.name}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {plan.provider}
                                  </span>
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border-b">Monthly Premium</td>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            return plan ? (
                              <td
                                key={`${plan.id}-premium`}
                                className="p-2 border-b text-center"
                              >
                                ${plan.premium}
                              </td>
                            ) : null;
                          })}
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Coverage Limit</td>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            return plan ? (
                              <td
                                key={`${plan.id}-coverage`}
                                className="p-2 border-b text-center"
                              >
                                ${plan.coverage.toLocaleString()}
                              </td>
                            ) : null;
                          })}
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Deductible</td>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            return plan ? (
                              <td
                                key={`${plan.id}-deductible`}
                                className="p-2 border-b text-center"
                              >
                                ${plan.deductible}
                              </td>
                            ) : null;
                          })}
                        </tr>
                        <tr>
                          <td className="p-2 border-b">
                            Employer Contribution
                          </td>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            return plan ? (
                              <td
                                key={`${plan.id}-contribution`}
                                className="p-2 border-b text-center"
                              >
                                {plan.employerContribution}%
                              </td>
                            ) : null;
                          })}
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Your Monthly Cost</td>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            return plan ? (
                              <td
                                key={`${plan.id}-cost`}
                                className="p-2 border-b text-center font-medium"
                              >
                                $
                                {(
                                  plan.premium -
                                  (plan.premium *
                                    (plan?.employerContribution ?? 0)) /
                                    100
                                ).toFixed(2)}
                              </td>
                            ) : null;
                          })}
                        </tr>
                        <tr>
                          <td className="p-2"></td>
                          {selectedPlansToCompare.map((planId) => {
                            const plan = mockRecommendedPlans.find(
                              (p) => p.id === planId
                            );
                            return plan ? (
                              <td
                                key={`${plan.id}-action`}
                                className="p-2 text-center"
                              >
                                <Button
                                  size="sm"
                                  onClick={() => handleEnroll(plan)}
                                >
                                  Select
                                </Button>
                              </td>
                            ) : null;
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center p-8 border rounded-lg">
                    <p className="text-muted-foreground">
                      Select at least one plan to compare
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Comparison Features</CardTitle>
                <CardDescription>
                  Detailed feature comparison for selected insurance types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="auto">
                  <TabsList className="mb-4">
                    <TabsTrigger value="auto">Auto Insurance</TabsTrigger>
                    <TabsTrigger value="home">Home Insurance</TabsTrigger>
                    <TabsTrigger value="life">Life Insurance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="auto">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left p-2 border-b">Feature</th>
                            <th className="p-2 border-b">Basic</th>
                            <th className="p-2 border-b">Standard</th>
                            <th className="p-2 border-b">Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border-b">Liability Coverage</td>
                            <td className="p-2 border-b text-center">
                              $50,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $100,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $300,000
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">Collision Coverage</td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Comprehensive Coverage
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Roadside Assistance
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Rental Car Coverage
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Accident Forgiveness
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="home">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left p-2 border-b">Feature</th>
                            <th className="p-2 border-b">Basic</th>
                            <th className="p-2 border-b">Standard</th>
                            <th className="p-2 border-b">Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border-b">Dwelling Coverage</td>
                            <td className="p-2 border-b text-center">
                              $150,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $250,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $500,000
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">Personal Property</td>
                            <td className="p-2 border-b text-center">
                              50% of dwelling
                            </td>
                            <td className="p-2 border-b text-center">
                              70% of dwelling
                            </td>
                            <td className="p-2 border-b text-center">
                              75% of dwelling
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Liability Protection
                            </td>
                            <td className="p-2 border-b text-center">
                              $100,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $300,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $500,000
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">Flood Coverage</td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">Replacement Cost</td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="life">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left p-2 border-b">Feature</th>
                            <th className="p-2 border-b">Basic</th>
                            <th className="p-2 border-b">Standard</th>
                            <th className="p-2 border-b">Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border-b">Death Benefit</td>
                            <td className="p-2 border-b text-center">
                              $100,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $250,000
                            </td>
                            <td className="p-2 border-b text-center">
                              $500,000
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">Cash Value Growth</td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Accelerated Death Benefit
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">Waiver of Premium</td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border-b">
                              Guaranteed Insurability
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                            </td>
                            <td className="p-2 border-b text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Enrollment</DialogTitle>
            <DialogDescription>
              You&apos;re about to enroll in {selectedPlan?.name} from{" "}
              {selectedPlan?.provider}.
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Monthly Premium:
                    </span>
                    <span className="font-medium">
                      ${selectedPlan.premium}/mo
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Payroll Deduction:
                    </span>
                    <span className="font-medium">
                      ${selectedPlan.premium}/mo
                    </span>
                  </div>
                  {(selectedPlan?.employerContribution ?? 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Employer Contribution:
                      </span>
                      <span className="font-medium text-green-600">
                        -$
                        {(
                          (selectedPlan.premium *
                            (selectedPlan?.employerContribution ?? 0)) /
                          100
                        ).toFixed(2)}
                        /mo
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium pt-2 border-t mt-2">
                    <span>Your Cost:</span>
                    <span>
                      $
                      {selectedPlan.employerContribution
                        ? (
                            selectedPlan.premium -
                            (selectedPlan.premium *
                              selectedPlan.employerContribution) /
                              100
                          ).toFixed(2)
                        : selectedPlan.premium}
                      /mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="effective-date">Effective Date</Label>
                <Input
                  id="effective-date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  onCheckedChange={() => setAgreed(!agreed)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the terms and conditions of this insurance plan
                </label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEnrollDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmEnrollment} disabled={!agreed}>
              Confirm Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add the chatbot component */}
      <InsuranceChatbot />
    </div>
  );
}
