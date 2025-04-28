// Define your system prompt
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests an Indian vegetarian recipe (unless meat is specified item). 
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page. 
Give out the markdown only as output, without any extra formatting text.
`;

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_MAI_API_KEY}`, // your real key
                "HTTP-Referer": "<YOUR_SITE_URL>", // optional
                "X-Title": "<YOUR_SITE_NAME>",      // optional
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "microsoft/mai-ds-r1:free",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have these ingredients: ${ingredientsString}. Suggest a recipe.` }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        let content = data.choices[0].message.content.trim();
        
        // Remove the markdown code block indicators
        if (content.startsWith("```markdown\n")) {
            content = content.replace("```markdown\n", "");
        }
        if (content.endsWith("\n```")) {
            content = content.replace(/\n```$/, "");
        }
        
        return content;

    } catch (err) {
        console.error("Error generating recipe:", err);
        return "Sorry, I couldn't generate a recipe right now.";
    }
}
