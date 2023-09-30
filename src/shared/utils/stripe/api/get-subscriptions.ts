import { NextApiRequest } from 'next';
import type { Stripe } from 'stripe';

export async function getSubscriptions(req: NextApiRequest, stripe: Stripe) {
    const subscriptions = await stripe.subscriptions.list(req.query);
    return subscriptions;
}
