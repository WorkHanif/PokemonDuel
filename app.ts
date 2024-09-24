import express from "express";

// Function to fetch Pokémon data
const fetchPokemon = async () => {
  // Generate two random Pokémon IDs
  const randomPokemon1: number = Math.floor(Math.random() * 100) + 1;
  const randomPokemon2: number = Math.floor(Math.random() * 100) + 1;

  // Fetch data for the first Pokémon
  const res1 = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemon1}`
  );
  const pokemon1 = await res1.json();

  // Fetch data for the second Pokémon
  let pokemon2 = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemon2}`
  ).then((res) => res.json());

  // Check if the two Pokémon are the same
  if (randomPokemon1 === randomPokemon2) {
    console.log(
      "Random Pokémon 1 and 2 are the same, generating new random Pokémon 2"
    );
    const anotherPokemon2 = Math.floor(Math.random() * 100) + 1;
    pokemon2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${anotherPokemon2}`
    ).then((res) => res.json());
  }

  // Display Pokémon 1 details
  console.log("--------------------");
  console.log("-----POKEMON 1------");
  console.log("--------------------");
  console.log(`ID:    ${pokemon1.id}`);
  console.log(`Name:  ${pokemon1.name}`);
  console.log("Stats ");
  console.log(`      HP: ${pokemon1.stats[0].base_stat}`);
  console.log(`  Attack: ${pokemon1.stats[1].base_stat}`);

  // Display Pokémon 2 details
  console.log("--------------------");
  console.log("-----POKEMON 2------");
  console.log("--------------------");
  console.log(`ID:    ${pokemon2.id}`);
  console.log(`Name:  ${pokemon2.name}`);
  console.log("Stats ");
  console.log(`     HP: ${pokemon2.stats[0].base_stat}`);
  console.log(` Attack: ${pokemon2.stats[1].base_stat}`);

  // Calculate battle results
  const pokemon1Attack =
    pokemon1.stats[1].base_stat - pokemon2.stats[0].base_stat;
  const pokemon2Attack =
    pokemon2.stats[1].base_stat - pokemon1.stats[0].base_stat;

  console.log("                     ");
  console.log("*********************");
  console.log("****BATTLE RESULT****");
  console.log("*********************");

  if (pokemon1Attack <= 0 && pokemon2Attack <= 0) {
    console.log("         DRAW!       ");
  } else if (pokemon1Attack > pokemon2Attack) {
    console.log(`     ${pokemon1.name} WINS!     `);
  } else {
    console.log(`     ${pokemon2.name} WINS!     `);
  }
  console.log("---------------------");
};

// Call the fetch function
fetchPokemon();

// Set up the Express app
const app = express();
const port = 3000;

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to the Pokémon Battle App!"); // Send a response to the root URL
});

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
