import { NextApiRequest, NextApiResponse } from 'next';

import { getSubscriptions, handlerWrapper } from '@/shared/utils/stripe/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    handlerWrapper(req, res, 'GET', getSubscriptions);
}

export const config = {
    api: {
        externalResolver: true
    }
};
