import { NextApiRequest } from 'next';

export async function getSubscriptions(req: NextApiRequest, stripe) {
    const subscriptions = await stripe.subscriptions.list(req.query);
    return subscriptions;
}
