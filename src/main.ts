import { htmlParser } from './parser';
import { getRecipe, getRecipeUrlList } from './utils/utils';
import './styles.scss';

(async () => {

  document.querySelector('form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const get_recipe_button = document.querySelector('.get-recipe-button')!;

    get_recipe_button.classList.add('loading');
    get_recipe_button.setAttribute('disabled', 'disabled');

    document.querySelector('body')?.classList.add('loading');

    const recipeUrl = (document.querySelector('.input-recipe-url') as HTMLInputElement).value;

    const page = await htmlParser(recipeUrl);

    if (recipeUrl.split('categorias').length === 1) {
      const recipe = getRecipe(page)

      document.querySelector('.json-area')!.textContent = JSON.stringify(recipe, undefined, 2);

      if(recipe.title) {
        document.querySelector('.info-area p')!.textContent = '1 receita'
      }

    } else {
      const recipeUrlList = getRecipeUrlList(page)

      const recipeList = await Promise.all(recipeUrlList.map(async url => {
        const recipePage = await htmlParser(url);
        const recipe = getRecipe(recipePage);

        return recipe;
      }));

      document.querySelector('.json-area')!.textContent = JSON.stringify(recipeList, undefined, 2);
      document.querySelector('.info-area p')!.textContent = `${recipeList.length} receitas`
    }

    get_recipe_button.removeAttribute('disabled');
    get_recipe_button.classList.remove('loading');
    document.querySelector('body')?.classList.remove('loading');
  })


})()

