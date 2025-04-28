import { useState } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";

export default function MainContent() {

    const [items, setItems] = useState([]);
    const [recipeShown, setRecipeShown] = useState(false);

    function toggleRecipeShown() {
        setRecipeShown(prevShown => !prevShown)
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
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {   items.length > 0 && <IngredientsList items={items} toggleRecipeShown={toggleRecipeShown} /> }
            
            {   recipeShown && <Recipe/>    }
        </main>
    )
}