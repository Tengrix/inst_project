import { NextApiRequest, NextApiResponse } from 'next';

import { updateSubscription, handlerWrapper } from '@/shared/utils/stripe/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    handlerWrapper(req, res, 'POST', updateSubscription);
}
