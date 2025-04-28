import { useState } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import Loader from "./Loader";
import { getRecipeFromMistral } from "../../ai";

export default function MainContent() {

    const [items, setItems] = useState([]);
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    async function getRecipe() {
        setLoading(true);
        const generatedRecipe_md = await getRecipeFromMistral(items)
        setRecipe(generatedRecipe_md)
        setLoading(false);
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient");
        if(newIngredient === "") return;
        setItems(prevIngredientsList => [...prevIngredientsList, newIngredient]);
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form" >
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    autoComplete="off" 
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {   items.length > 0 && <IngredientsList items={items} getRecipe={getRecipe} /> }
            
            { loading && <Loader /> }
            {   !loading && recipe && <Recipe recipe={recipe}/>    }
        </main>
    )
}