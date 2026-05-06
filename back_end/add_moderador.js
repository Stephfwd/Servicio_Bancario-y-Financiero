const { Rol } = require("./models");

async function addModeratorRole() {
  try {
    // Verificar si ya existe
    const existingRole = await Rol.findOne({ where: { nombre: 'moderador' } });
    
    if (existingRole) {
      console.log("El rol 'moderador' ya existe.");
    } else {
      await Rol.create({
        nombre: 'moderador',
        descripcion: 'Usuario con permisos de moderación intermedios'
      });
      console.log("Rol 'moderador' creado exitosamente.");
    }
    
    // Listar todos los roles actuales
    const roles = await Rol.findAll();
    console.log("Roles actuales en la DB:");
    roles.forEach(r => console.log(`- ${r.nombre} (ID: ${r.id})`));

  } catch (error) {
    console.error("Error al crear el rol:", error);
  } finally {
    process.exit();
  }
}

addModeratorRole();
