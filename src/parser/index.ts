
export async function htmlParser(url: string) {
    const response = await fetch(url);
    
    try {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(await response.text(), 'text/html');

        return parsed;
    } catch (error) {
        throw new Error(`Can not parse html response: ${error}`)
    }
}