const { Usuario, Rol } = require("./models");

async function checkAdmin() {
  try {
    const admin = await Usuario.findOne({ 
      where: { email: "admin@banco.com" },
      include: [{ model: Rol, as: "rol" }]
    });

    if (!admin) {
      console.log("No se encontró el usuario admin@banco.com");
    } else {
      console.log("Admin encontrado:");
      console.log("Email:", admin.email);
      console.log("Rol:", admin.rol?.nombre);
      console.log("Hash en DB:", admin.password);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

checkAdmin();
