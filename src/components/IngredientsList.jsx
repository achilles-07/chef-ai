export default function IngredientsList({ items, toggleRecipeShown }) {

    const itemList = items.map(item => {
        return <li>{item}</li>
    })

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {itemList}
            </ul>
            {itemList.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={toggleRecipeShown}>Get a recipe</button>
            </div>}
        </section>
    )
}