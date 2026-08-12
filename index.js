const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/sun-tzu-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

const roasts = [
  "You're as useless as the 'ueue' in 'queue'.",
  "You have something on your chin... no, the third one down.",
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "You're like a software update. Whenever I see you, I think, 'Do I really need this right now?'",
  "You're like a broken pencil... pointless.",
  "You're like a cloud. When you disappear, it's a beautiful day.",
  "You're like a software update. Whenever I see you, I think, 'Do I really need this right now?'",
  "You're like a cloud. When you disappear, it's a beautiful day.",
         
];

const decide = [
        " yes",
        " no",
        " maybe",
        " definitely",
        " absolutely not",
        " without a doubt",
        " ask again later",
        " it is certain",
        " very doubtful",
        " most likely",
        " cannot predict now",
        " signs point to yes",
        " better not tell you now",
        " my sources say no",
        " outlook not so good",
        " yes, in due time",
        " you may rely on it",
        " my reply is no",
        " ask me in 10 years",
        " the answer is unclear",
        " the stars say yes",
        " the stars say no",
        " the universe is undecided",

];

const wisdomQuotes = [
  "The supreme art of war is to subdue the enemy without fighting. - Sun Tzu",
  "Appear weak when you are strong, and strong when you are weak. - Sun Tzu",
    "In the midst of chaos, there is also opportunity. - Sun Tzu",
    "If you know the enemy and know yourself, you need not fear the result of a hundred battles. - Sun Tzu",
    "Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win. - Sun Tzu",
    "Opportunities multiply as they are seized. - Sun Tzu",
    "The greatest victory is that which requires no battle. - Sun Tzu",
    "He will win who knows when to fight and when not to fight. - Sun Tzu",
    "Strategy without tactics is the slowest route to victory. Tactics without strategy is the noise before defeat. - Sun Tzu",
    "All warfare is based on deception. - Sun Tzu"
];
app.command("/sun-tzu-wisdom", async ({ ack, respond }) => {
  await ack();
  const randomQuote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
  await respond({ text: `Wisdom Quote:\n${randomQuote}` });
});
app.command("/sun-tzu-decide", async ({ ack, respond }) => {
  await ack();
  const randomDecision = decide[Math.floor(Math.random() * decide.length)];
  await respond({ text: `Decision:\n${randomDecision}` });
});
app.command("/sun-tzu-roast", async ({ ack, respond }) => {
  await ack();
  const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
  await respond({ text: `Roast:\n${randomRoast}` });
}); 
app.command("/sun-tzu-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});
app.command("/sun-tzu-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});
app.command("/sun-tzu-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/sun-tzu-ping - Check bot latency
/sun-tzu-catfact - Get a cat fact`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();