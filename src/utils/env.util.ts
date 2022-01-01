export const isDebug = (): boolean => {
    if (process.env.NODE_ENV?.includes('PROD') || process.env.NODE_ENV?.includes('prod')) return false;
    return true;
};
