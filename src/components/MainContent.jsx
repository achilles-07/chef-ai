export default function MainContent() {

    let ingredients = ["Chicken", "Oregano", "Tomatoes"]

    const ingredLi = ingredients.map(ingredient => <li>{ingredient}</li>)

    return (
        <main>
            <form action="" className="add-ingredient-form" onSubmit={(event) => 
                {
                    event.preventDefault(); 
                    // console.log('Submitted!')
                    const formData = new FormData(event.currentTarget);
                    const newIngredient = formData.get("ingredient");
                    console.log(newIngredient)
                    ingredients.push(newIngredient);
                    console.log(ingredients) 
                }}>
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            <ul>
                {ingredLi}
            </ul>
        </main>
    )
}