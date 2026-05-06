const { Usuario } = require("./models");
const bcrypt = require("bcryptjs");

async function fixPassword() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    
    const [updated] = await Usuario.update(
      { password: hashedPassword },
      { where: { email: "maria@correo.com" } }
    );
    
    if (updated) {
      console.log("Contraseña de María restablecida a '123456'.");
    } else {
      console.log("No se encontró a maria@correo.com en la base de datos.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

fixPassword();
