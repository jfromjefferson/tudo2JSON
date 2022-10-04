import { htmlParser } from './parser';
import { getRecipe, getRecipeUrlList } from './utils/utils';

// const tempUrl = 'https://www.tudogostoso.com.br/categorias/1004-carnes';
const tempUrl = 'https://www.tudogostoso.com.br/receita/47884-esfiha-de-carne-adaptada-receita-turca.html';

(async () => {
  const page = await htmlParser(tempUrl);

  if(tempUrl.split('categorias').length === 1){
    const recipe = getRecipe(page)

    console.log(recipe)

  }else {
    const recipeUrlList = getRecipeUrlList(page)

    const recipeList = await Promise.all(recipeUrlList.map(async url => {
      const recipePage = await htmlParser(url);
      const recipe = getRecipe(recipePage);

      return recipe;
    }));

    console.log(recipeList);
  }

  
})()

