const MAX_TOTAL_POINTS = 30; // Maximum total points that can be allocated

// Function to create a new Character with allocated stats
function createCharacterWithAllocatedStats(name, charClass, race, backstory, image, allocatedStats) {
  const totalAllocatedPoints = Object.values(allocatedStats).reduce((acc, curr) => acc + curr, 0);

  if (totalAllocatedPoints > MAX_TOTAL_POINTS) {
    throw new Error('Total allocated points exceed the maximum limit.');
  }

  // Create the Character document
  const newCharacter = new Character({ name, charClass, race, backstory, image });

  // Assign allocated stats to the Character
  newCharacter.stats = {
    strength: allocatedStats.strength || 0,
    dexterity: allocatedStats.dexterity || 0,
    constitution: allocatedStats.constitution || 0,
    intelligence: allocatedStats.intelligence || 0,
    wisdom: allocatedStats.wisdom || 0,
    charisma: allocatedStats.charisma || 0
  };

  // Save the Character to the database
  // This logic will depend on how you handle database operations in your application
}