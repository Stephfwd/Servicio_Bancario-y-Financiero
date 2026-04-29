const { Usuario, Cuenta, Rol, TipoCuenta, sequelize } = require("./models");

async function testModels() {
  try {
    console.log("--- 🔍 Iniciando prueba de Modelos y Asociaciones ---\n");

    // 1. Buscar a María y traer su Rol y sus Cuentas en una sola consulta
    const maria = await Usuario.findOne({
      where: { nombre: "María" },
      include: [
        { model: Rol, as: "rol" },
        { 
          model: Cuenta, 
          as: "cuentas",
          include: [{ model: TipoCuenta, as: "tipo_cuenta" }]
        }
      ]
    });

    if (!maria) {
      console.log("❌ No se encontró a María. ¿Corriste los seeders?");
      return;
    }

    console.log(`✅ Usuario encontrado: ${maria.nombre} ${maria.apellido}`);
    console.log(`🎭 Rol: ${maria.rol.nombre} (${maria.rol.descripcion})`);
    console.log(`💰 Cuentas asociadas (${maria.cuentas.length}):`);

    maria.cuentas.forEach(cuenta => {
      console.log(`   - Nº: ${cuenta.numero_cuenta} | Tipo: ${cuenta.tipo_cuenta.nombre} | Saldo: $${cuenta.saldo}`);
    });

    console.log("\n--- ✨ Prueba finalizada con éxito ---");

  } catch (error) {
    console.error("❌ Error durante la prueba:", error.message);
  } finally {
    await sequelize.close();
  }
}

testModels();
