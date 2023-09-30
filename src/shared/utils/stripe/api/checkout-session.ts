import { NextApiRequest } from 'next';
import Stripe from 'stripe';

export async function createCheckoutSession(req: NextApiRequest, stripe) {
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
    return checkoutSession;
}
