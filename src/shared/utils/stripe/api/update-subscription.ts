import { NextApiRequest } from 'next';
import type { Stripe } from 'stripe';

export async function updateSubscription(req: NextApiRequest, stripe: Stripe) {
    const params = { collection_method: req.body.collection_method };

    if (req.body.collection_method === 'send_invoice') {
        Object.assign(params, { days_until_due: 1 });
    }
    const response = await stripe.subscriptions.update(req.body.id, params);
    return response.collection_method;
}
