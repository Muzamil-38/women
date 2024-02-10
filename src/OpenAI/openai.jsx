import { OpenAI } from "openai";

const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey);

if (!apiKey) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty."
  );
}

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true }); // Set dangerouslyAllowBrowser to true

export async function sendMsgToOpenAI(message) {
  try {
    const completion = await openai.completions.create({
      model: "davinci-002",
      prompt: message,
      max_tokens: 256,
    });
    return completion.choices[0].text;
  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    throw error;
  }
}
