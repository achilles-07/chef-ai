export default function IngredientsList({ items, getRecipe }) {

    const itemList = items.map(item => {
        return <li>{item}</li>
    })

    return (
        <section>
            <h2>Ingredients in hand:</h2>
            <i>(Add atleast 4 ingredients to continue)</i>
            <ul className="ingredients-list" aria-live="polite">
                {itemList}
            </ul>
            {itemList.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}