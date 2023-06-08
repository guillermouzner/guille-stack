import {redirect} from "next/navigation";

import {authOptions} from "@/lib/auth";
import {getCurrentUser} from "@/lib/session";
import {getUserSubscriptionPlan} from "@/lib/subscription";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {BillingForm} from "@/components/billing-form";
import {DashboardHeader} from "@/components/header";
import {Icons} from "@/components/icons";
import {DashboardShell} from "@/components/shell";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;

  // if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
  //   const stripePlan = await stripe.subscriptions.retrieve(subscriptionPlan.stripeSubscriptionId);

  //   isCanceled = stripePlan.cancel_at_period_end;
  // }

  return (
    <DashboardShell>
      <DashboardHeader heading="Billing" text="Manage billing and your subscription plan." />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Guille-Stack app is a demo app using a mercadopago test environment. You can find a list
            of test card numbers on the{" "}
            <a
              className="font-medium underline underline-offset-8"
              href="https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards"
              rel="noreferrer"
              target="_blank"
            >
              mercadopago docs
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </DashboardShell>
  );
}
