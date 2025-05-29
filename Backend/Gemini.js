import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    if (!apiUrl) {
      throw new Error("GEMINI_API_URL is not defined");
    }

    const prompt = `
You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.
Always provide accurate and contextually appropriate responses related to date, time, and day of the week when asked.

When prompted to open or access a web app or website (e.g., "Open Instagram", "Redirect to YouTube"), respond by acknowledging the request in a clear, professional tone and include the corresponding URL (e.g., https://www.instagram.com).

Use natural language like:
“Sure, opening Instagram for you. You can access it here: https://www.instagram.com.”
Maintain a professional and helpful tone throughout, especially when executing actions or providing system-level responses.
Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
           "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userinput": "<original user input without your own name>",
  "response": "<a short spoken response to read out loud to the user>"
  "redirectTo" "link to app if user asks to open some app"
}

Instructions:
- "type": determine the intent of the user.
- "userinput": original sentence the user spoke, minus your name.
- "response": a short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question.
- "google-search": if user wants to search something on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.

- "calculator-open": if user wants to open a calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user asks about the weather.

Important:
- If the user asks "who created you", "who is your creator", "who made you", or anything similar, always answer with "I was created by ${userName}."
- Only respond with the JSON object, nothing else.

Examples:
User: Who created you?
Response:
{
  "type": "general",
  "userinput": "who created you",
  "response": "I was created by ${userName}."
}

User: Who is your creator?
Response:
{
  "type": "general",
  "userinput": "who is your creator",
  "response": "I was created by ${userName}."
}

Now your userInput - ${command}
    `.trim();

    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const rawResponse = result.data.candidates[0].content.parts[0].text;
    const cleaned = rawResponse.replace(/```json|```/g, "").trim();

    // Step 2: Parse the cleaned string to a JSON object
    try {
      const parsed = JSON.parse(cleaned);
      console.log(parsed);

      // Parse JSON response (sometimes API might return with extra whitespace/newlines)
      // let parsedResponse;
      return parsed;
      //   parsedResponse = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error(
        "Failed to parse Gemini response JSON:",
        parseError,
        rawResponse
      );
      return {
        type: "general",
        userinput: command,
        response: "Sorry, I couldn't understand the response from Gemini.",
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      type: "general",
      userinput: command,
      response: "Sorry, I couldn't process that.",
    };
  }
};

export default geminiResponse;
