import { NextApiRequest } from 'next';
import type { Stripe } from 'stripe';

export async function getCustomer(req: NextApiRequest, stripe: Stripe) {
    const customer = await stripe.customers.search({
        query: `email: "${req.query.email}"`
    });
    return customer;
}
