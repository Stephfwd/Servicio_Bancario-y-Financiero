const { Usuario, Cuenta } = require("./models");

async function checkCarlos() {
  try {
    const carlos = await Usuario.findOne({ 
      where: { email: 'CarlosS@gmail.com' },
      include: [{ model: Cuenta, as: "cuentas" }]
    });
    
    if (carlos) {
      console.log(`Usuario encontrado: ${carlos.nombre} ${carlos.apellido}`);
      console.log(`ID de Usuario: ${carlos.id}`);
      
      if (carlos.cuentas && carlos.cuentas.length > 0) {
        carlos.cuentas.forEach(c => {
          console.log(`- ID de Cuenta Bancaria: ${c.id} | Saldo: $${c.saldo}`);
        });
      } else {
        console.log("Este usuario no tiene ninguna cuenta bancaria asociada.");
        
        // Crearle una cuenta si no tiene
        const nuevaCuenta = await Cuenta.create({
          usuario_id: carlos.id,
          tipo_cuenta_id: 1, // ahorros
          numero_cuenta: `SV-0001-0001-${carlos.id.toString().padStart(4, '0')}`,
          saldo: 1500.00,
          estado: 'activa'
        });
        console.log(`¡Cuenta habilitada! ID de Cuenta: ${nuevaCuenta.id} | Saldo: $1500.00`);
      }
    } else {
      console.log("No existe nadie con ese correo.");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
}

checkCarlos();
