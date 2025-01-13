const OpenAI = require("openai");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const readChannel = (channel) => {
    console.log("Reading from channel", channel);
};

const parseLine = (line) => {
    console.log("Parsing line", line);
};

const prompt = async () => {
    console.log("Prompting");

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-4o",
    });
};

const claude = async () => {
    const endpoint = "https://api.anthropic.com/v1/messages";

    const prompt = {
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: "Hello, world" }],
    };

    // Post using axios
    const response = await axios.post(endpoint, prompt, {
        headers: {
            'x-api-key': process.env["ANTHROPIC_API_KEY"],
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
    });

    console.log(response);
};

const main = async () => {
    console.log("Starting main");

    readChannel("test");
    parseLine("test");
    await claude();
};

main();
