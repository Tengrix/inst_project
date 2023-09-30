import { NextApiRequest } from 'next';

export async function getCustomer(req: NextApiRequest, stripe) {
    const customer = await stripe.customers.search({
        query: `email: "${req.query.email}"`
    });
    return customer;
}
