const { Configuration, OpenAIApi } = require("openai");
const { v4: uuidv4 } = require('uuid')
const gTTS = require('gtts');

const configuration = new Configuration({
    organization: "org-LSVSvDvfyZCE10d0rGKIR678",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

module.exports = {
    async gptRes(req, res) {

        const errResponse = (err) => {
            res.json({ success: false, error: err });
        }

        try {
            const { queryData } = req.body;

            if (!queryData) return errResponse("Invalid Query");

            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: queryData,
                max_tokens: 7,
                temperature: 0,
            });

            // console.log(JSON.stringify(completion, null, 5));
            console.log(completion.data);

            const { data = null } = completion;
            if (!completion || !data) return errResponse("Invalid GPT Request")

            const { choices = [] } = data;

            if (!choices.length || !choices[0].text) return errResponse("Invalid Text Request")

            const newId = uuidv4()

            const gtts = new gTTS(choices[0].text, 'en');
            const filePath = `audio/${newId}.mp3`;

            gtts.save(filePath, (err, result) => {
                if (err) errResponse("Something Went Wrong");
                console.log('Success! Open file /tmp/hello.mp3 to hear result.');
                res.json({ success: true, answer: choices[0].text, filePath: `${newId}.mp3` })
            });

        } catch (err) {
            console.log(err);
            errResponse("Something Went Wrong");
        }

    }
}