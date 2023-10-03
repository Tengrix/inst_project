import { NextApiRequest } from 'next';
import type { Stripe } from 'stripe';

export async function createCheckoutSession(req: NextApiRequest, stripe: Stripe) {
    const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        payment_method_types: req.body.payment_method_types,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.subscription.name,
                        description: req.body.subscription.name
                    },
                    unit_amount: req.body.subscription.value,
                    recurring: {
                        interval: req.body.subscription.interval
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
