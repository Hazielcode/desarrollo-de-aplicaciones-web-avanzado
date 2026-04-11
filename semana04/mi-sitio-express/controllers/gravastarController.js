const inventario = [
    { modelo: "Mars Pro", tipo: "Altavoz Bluetooth", acabado: "Amarillo Dañado (Battle-Damaged)", luces: "Verde Neón", energia: "100%" },
    { modelo: "Sirius P5", tipo: "Auriculares TWS", acabado: "Armadura Blanca", luces: "Azul Cian", energia: "80%" }
];

const list = (req, res) => {
    res.render("gravastar", { title: "Hangar GravaStar", inventario });
};

const create = (req, res) => {
    const { modelo, tipo, acabado, luces, energia } = req.body;
    inventario.push({ modelo, tipo, acabado, luces, energia });
    res.redirect("/gravastar");
};

module.exports = {
    list,
    create
};
