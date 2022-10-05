
export async function htmlParser(url: string) {
    
    try {
        const response = await fetch(url);

        const parser = new DOMParser();
        const parsed = parser.parseFromString(await response.text(), 'text/html');

        return parsed;
    } catch (error) {
        alert('Can not parse html response')
        document.querySelector('.get-recipe-button')!.removeAttribute('disabled')

        throw new Error(`Can not parse html response: ${error}`)
    }
}