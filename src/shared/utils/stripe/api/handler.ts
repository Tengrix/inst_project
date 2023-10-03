import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export async function handlerWrapper(
    req: NextApiRequest,
    res: NextApiResponse,
    method: string,
    callback: (req: NextApiRequest, stripe: Stripe) => Promise<object> | Promise<Stripe.Subscription.CollectionMethod>
) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2023-08-16'
    });

    if (req.method === method) {
        try {
            const response = await callback(req, stripe);
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'API_HELPERS_STRIPE_ERROR' });
        }
    } else {
        res.setHeader('Allow', method);
        res.status(405).end('Method Not Allowed');
    }
}
