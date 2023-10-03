import { NextApiRequest, NextApiResponse } from 'next';

import { createCheckoutSession, handlerWrapper } from '@/shared/utils/stripe/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    handlerWrapper(req, res, 'POST', createCheckoutSession);
}
