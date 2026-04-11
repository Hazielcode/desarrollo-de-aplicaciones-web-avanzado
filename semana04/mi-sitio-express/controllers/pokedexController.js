const pokemons = [
    { numero: "001", nombre: "Bulbasaur", tipo: "Planta/Veneno", region: "Kanto", peso: "6.9 kg" },
    { numero: "004", nombre: "Charmander", tipo: "Fuego", region: "Kanto", peso: "8.5 kg" },
    { numero: "007", nombre: "Squirtle", tipo: "Agua", region: "Kanto", peso: "9.0 kg" }
];

const list = (req, res) => {
    res.render("pokedex", { title: "Pokédex", pokemons });
};

const create = (req, res) => {
    const { numero, nombre, tipo, region, peso } = req.body;
    pokemons.push({ numero, nombre, tipo, region, peso });
    res.redirect("/pokedex");
};

module.exports = {
    list,
    create
};
