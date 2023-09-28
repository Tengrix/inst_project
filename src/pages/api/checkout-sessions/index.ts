import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const params: Stripe.Checkout.SessionCreateParams = {
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'TEST PRODUCT',
                                description: 'TEST PRODUCT DESC'
                            },
                            unit_amount: req.body.amount,
                            recurring: {
                                interval: req.body.interval
                            }
                        },

                        quantity: 1
                    }
                ],

                success_url: `${req.headers.origin}/profile-settings?success=true`,
                cancel_url: `${req.headers.origin}/profile-settings?success=false`
            };
            if (req.body.customer) {
                Object.assign(params, { customer: req.body.customer });
            } else {
                Object.assign(params, { customer_email: req.body.customer_email });
            }
            const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

            res.status(200).json(checkoutSession);
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'API_HELPERS_STRIPE_ERROR' });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
