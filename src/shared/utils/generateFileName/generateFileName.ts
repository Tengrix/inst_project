import { v4 as uuidv4 } from 'uuid';

export const getUniqFileName = (fileName?: string): string => {
    const pathName = fileName?.split('.') || [];
    const extention = pathName.length > 1 ? pathName.at(-1) : '';
    const salt = uuidv4();
    const uniqFileName = salt + '.' + extention;
    return uniqFileName;
};
