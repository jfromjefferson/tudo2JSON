
export const mainUrl = 'https://www.tudogostoso.com.br';


function getIngredientList(ingredientArea: HTMLElement | null) {
    const ingredienList: string[] = [];

    ingredientArea?.querySelectorAll('li').forEach(element => {
        ingredienList.push(element.textContent || '');
    })

    return ingredienList;
}


function getInstructionList(instructionArea: HTMLElement | null) {
    const instructionList: string[] = [];

    instructionArea?.querySelectorAll('li').forEach(element => {
        instructionList.push(element.textContent || '');
    })

    return instructionList;
}


export function getRecipeUrlList(page: Document) {
    const recipeUrlList: string[] = [];

    page.querySelectorAll('.recipe-card a').forEach(element => {
        recipeUrlList.push(`${mainUrl}${element.getAttribute('href')}` || '');
    })

    return recipeUrlList;
}

export function getRecipe(page: Document) {
    const title = page.querySelector('.recipe-title h1')?.textContent?.trim();
    const serve = page.querySelector('.serve data')?.textContent?.trim();

    const ingredienList = getIngredientList(page.querySelector('.ingredients-card'));
    const instructionList = getInstructionList(page.querySelector('.instructions'));

    return {
        title,
        serve,
        ingredienList,
        instructionList
    }
}