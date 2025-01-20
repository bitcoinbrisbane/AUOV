const OpenAI = require("openai");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// https://vscode.blockscan.com/137/0xaDd9dA09AB2f2cC4491b0285980417208120DaFD
const POLYGON_CONTRACT_ADDRESS = "0xeE3Afe347D5C74317041E2618C49534dAf887c24";
const abi = [
    "function getRequest(address requester, bytes32 identifier, uint256 timestamp, bytes memory ancillaryData) public view virtual returns (Request memory)",
    "function setEventBased(bytes32 identifier, uint256 timestamp, bytes memory ancillaryData) external virtual"
];

const client = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

const setEventBased = async (identifier, timestamp, ancillaryData) => {
    // Examples
    // UMIP 107
    // Identifier: YES_OR_NO_QUERY
    const contract = new ethers.Contract(POLYGON_CONTRACT_ADDRESS, abi, provider);
    const transaction = await contract.setEventBased(identifier, timestamp, ancillaryData);
    console.log(transaction);
}

const readChannel = async (channel) => {
    let data = "";

    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://discord.com/api/v9/channels/${channel}/messages?limit=100`,
        headers: {
            Authorization: process.env["DISCORD_TOKEN"],
            Cookie: process.env["DISCORD_COOKIE"],
        },
        data: data,
    };
    console.log("Reading from channel", channel);

    const response = await axios(config);
    const questions = [];

    for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].content);

        const data = {
            id: response.data[i].id,
            content: response.data[i].content,
        }

        if (!response.data[i].content.startsWith("__**Stickied Message:**__")) {
            questions.push(data);

            // get message id as "id"
        }
    }

    // find messages that begin with "Fact Check"
    // const questions = response.data.filter((message) => message.content.startsWith("Fact check:"));
    return questions;
};

const readThread = async (channel) => {
    let data = "";

    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://discord.com/api/v9/channels/${channel}/messages?limit=100`,
        headers: {
            Authorization: process.env["DISCORD_TOKEN"],
            Cookie: process.env["DISCORD_COOKIE"],
        },
        data: data,
    };
    console.log("Reading from channel", channel);

    const response = await axios(config);
    const threads = [];

    for (let i = response.data.length; i > 0; i--) {

        if (!response.data[i]?.content.startsWith("__**Stickied Message:**__")) {
            threads.push(response.data[i].content);

            // get message id as "id"
        }

        if (response.data[i].content.startsWith("*Description:")) {
            const question = response.data[i].content;
            
            console.log("Question", question);
            
        }
    }

    // find messages that begin with "Fact Check"
    // const questions = response.data.filter((message) => message.content.startsWith("Fact check:"));
    return questions;
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

const claude = async (question) => {
    const endpoint = "https://api.anthropic.com/v1/messages";

    const prompt = {
        model: "claude-3-opus-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: `${question}.  Respond using the format "My answer is (x)" so I can use a regex to get the answer please.` }],
    };

    // Post using axios
    const response = await axios.post(endpoint, prompt, {
        headers: {
            "x-api-key": process.env["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
    });

    console.log(response.data);

    // find the response in the response.data.messages
    const messages = response.data.messages;

    // Use regex to find the response "My answer is (p1)"
    const regex = /My answer is (.*)/;
    const match = regex.exec(messages[1].content);

    console.log(match);
    return match[1];
};

const main = async () => {
    console.log("Starting main");

    // await readThread("964000735073284127", "1330557531948585162");
    // const questions = await readChannel("964000735073284127"); // Evidence rational
    const thread = await readThread("1330557531948585162"); // TikTok thread
    // // parseLine("test");
    // await claude();
};

main();
