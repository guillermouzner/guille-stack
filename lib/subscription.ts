// @ts-nocheck
// TODO: Fix this when we turn strict mode on.
import {UserSubscriptionPlan} from "types";

import {freePlan, proPlan} from "@/config/subscriptions";
import {db} from "@/lib/db";

export async function getUserSubscriptionPlan(userId: string): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    // especificar qué campos se deben incluir en el resultado de la consulta:
    select: {
      mercadopagoSubscriptionId: true,
      mercadopagoCurrentPeriodEnd: true,
      mercadopagoCustomerId: true,
      mercadopagoPriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is on a pro plan.
  const isPro =
    user.mercadopagoPriceId &&
    user.mercadopagoCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    mercadopagoCurrentPeriodEnd: user.mercadopagoCurrentPeriodEnd?.getTime(),
    isPro,
  };
}
