require('dotenv').config();
const express = require('express');
const OpenAIApi = require("openai");
const router = express.Router();
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});
const Character = require('../models/Character');
const Stat = require('../models/Stat');

router.post('/', async (req, res) => {
  const { name, race, charClass, backstory, stat } = req.body;
  console.log(stat, "stats should be here")
  const prompt = `A Dungeons and Dragons themed character named ${name}, who has a race of ${race}, a class of ${charClass}, and their backstory/description is: ${backstory}.`;

  try {
    // Generate image using OpenAI API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt
    });
    console.log(req.body)
    console.log(response)

    const imageUrl = response.data[0].url;

    // Save character data to MongoDB
    const newCharacter = new Character({
      name,
      race,
      charClass,
      backstory,
      image: imageUrl,
      stat: {
        strength: stat.strength,
        dexterity: stat.dexterity,
        constitution: stat.constitution,
        intelligence: stat.intelligence,
        wisdom: stat.wisdom,
        charisma: stat.charisma
      }
    });
    
    // Save stats data to MongoDB
    // const newStat = new Stat({
    //   strength: Stats.strength,
    //   dexterity: Stats.dexterity,
    //   constitution: Stats.constitution,
    //   intelligence: Stats.intelligence,
    //   wisdom: Stats.wisdom,
    //   charisma: Stats.charisma
    // })

    await newCharacter.save();
    //await newStat.save();

    res.json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Failed to process request', error: error.message });
  }
});

module.exports = router;