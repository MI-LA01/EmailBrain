const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function start() {
    
    rl.question('What is the name of the sender ? ', function (from) {
        rl.question('What is the name of the receiver ? ', function (to) {
            rl.question('What is your job as per your email signature ? ', function (position) {
                rl.question('What the tone of your email ? ', function (tone) {
                    rl.question('What is the short description of your email ? ', async function (text) {
                        
                        const txt = from + " is the " + position + " of MailMaestro.com and write an email with a length of 220 words, including the subject, using a " + tone + " tone to Mr " + to + " and using the following content as a base for this email : " + text;
                        
                        console.log("");
                        console.log("");
                        console.log("");
                        console.log(txt);
                        console.log("");
                        console.log("");
                        console.log("Requesting ....");
                        const completion = await openai.createCompletion(
                        {
                            model: "text-davinci-003",
                            prompt: txt,
                            temperature: 0.2,
                            max_tokens:206,
                            top_p:1,
                            frequency_penalty:0,
                            presence_penalty:0
                        });
                        console.log(completion.data.choices[0].text);
                        rl.close();
                    });
                });
            });
        }); 
    });
    rl.on('close', function () {
        console.log("")
        console.log("")
        console.log("<---Alexis Gruet--->")
    });
}
start()