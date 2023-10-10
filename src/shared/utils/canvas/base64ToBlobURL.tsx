export const base64ToBlobURL = async (url: string) => {
    const blob = await fetch(url).then(r => r.blob());
    const newURL = URL.createObjectURL(blob);
    return newURL;
};
