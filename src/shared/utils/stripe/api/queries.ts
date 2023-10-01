import { fetchGetJSON, fetchPostJSON } from '../api-helpers';
import getStripe from '../get-stripejs';

export async function fetchCustomer(email: string) {
    const URL = `/api/get-customer?email=${encodeURIComponent(email)}`;
    const response = await fetchGetJSON(URL);
    return response.data[0]?.id;
}

export async function fetchCheckoutSession(email: string, subscription: object, payment_method_types: string[]) {
    const customerId = await fetchCustomer(email);
    const response = await fetchPostJSON('/api/checkout-sessions', {
        subscription: subscription,
        payment_method_types: payment_method_types,
        customer_email: email,
        customer: customerId
    });

    const stripe = await getStripe();
    await stripe!.redirectToCheckout({ sessionId: response.id });
}

export async function fetchSubscriptions(email: string) {
    const customerId = await fetchCustomer(email);
    const URL = `/api/get-subscriptions?customer=${customerId}`;
    const response = await fetchGetJSON(URL);

    return response.data
        .filter((sub: any) => sub.status === 'active')
        .map((sub: any) => ({
            billingDate: new Date(sub.current_period_start * 1000).toLocaleDateString(),
            subscriptionEnd: new Date(sub.current_period_end * 1000).toLocaleDateString(),
            id: sub.id,
            status: sub.status
        }));
}
