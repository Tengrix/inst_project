export const blobToBase64 = async (url: string) => {
    const blob = await fetch(url).then(r => r.blob());
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};
