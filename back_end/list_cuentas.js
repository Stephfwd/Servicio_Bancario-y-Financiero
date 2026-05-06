const { Cuenta, Usuario } = require("./models");

async function listCuentas() {
  try {
    const cuentas = await Cuenta.findAll({
      include: [{ model: Usuario, as: "usuario", attributes: ["nombre", "email"] }]
    });
    
    console.log("Cuentas disponibles en la DB:");
    cuentas.forEach(c => {
      console.log(`- ID Cuenta: ${c.id} | Propietario: ${c.usuario.nombre} (${c.usuario.email}) | Saldo: $${c.saldo}`);
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

listCuentas();
