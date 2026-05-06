const { Usuario } = require("./models");

async function updateCarlosEmail() {
  try {
    const carlos = await Usuario.findOne({ where: { nombre: 'Carlos', apellido: 'Sainz' } });
    
    if (carlos) {
      carlos.email = 'CarlosS@gmail.com';
      await carlos.save();
      console.log("El correo de Carlos Sainz ha sido actualizado a CarlosS@gmail.com");
    } else {
      console.log("No se encontró a Carlos Sainz en la base de datos.");
    }

  } catch (error) {
    console.error("Error al actualizar el correo:", error);
  } finally {
    process.exit();
  }
}

updateCarlosEmail();
