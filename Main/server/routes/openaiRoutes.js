const express = require('express');
const  OpenAIApi  = require("openai")
require('dotenv').config();
console.log('API Key:', process.env.OPENAI_API_KEY);

const router = express.Router();
const openai = new OpenAIApi({
    apiKey: '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'
    ,
});

router.post('/', async (req, res) => {
  const { name, race, charClass, backstory } = req.body;
  const prompt = `A Dungeons and Dragons character named ${name}, who has a race of ${race}, a class of ${charClass}, and their backstory is: ${backstory}.`;
  console.log(req.body)
  try {
    const response = await openai.images.generate({ 
        model: "dall-e-3", //The OpenAi model we are using to construct images
        prompt: prompt //The prompt above will be given to dall-e with the answered questions filled in. Note: Dall-e will re-engineer the prompt 
      })

    // Send the image URL or binary data back to the client
    console.log(response.data)
    const imageUrl = response.data[0].url;
    res.json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Failed to generate image:', error);
    res.status(500).json({ message: 'Failed to generate image', error: error.message });
  }
});

module.exports = router;