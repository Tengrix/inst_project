import { NextApiRequest, NextApiResponse } from 'next';

import { getCustomer, handlerWrapper } from '@/shared/utils/stripe/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    handlerWrapper(req, res, 'GET', getCustomer);
}

export const config = {
    api: {
        externalResolver: true
    }
};
