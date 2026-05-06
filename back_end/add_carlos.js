const { Usuario, Cuenta } = require("./models");
const bcrypt = require("bcryptjs");

async function createCarlos() {
  try {
    // 1. Verificar si ya existe
    let carlos = await Usuario.findOne({ where: { email: 'carlos.sainz@correo.com' } });
    
    if (!carlos) {
      // 2. Crear el usuario si no existe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456", salt);

      carlos = await Usuario.create({
        nombre: 'Carlos',
        apellido: 'Sainz',
        email: 'carlos.sainz@correo.com',
        password: hashedPassword,
        telefono: '7000-5555',
        dui: '00005555-5',
        rol_id: 2, // 2 = cliente
        estado: 'activo'
      });
      console.log(`Usuario Carlos Sainz creado con ID: ${carlos.id}`);
    } else {
      console.log(`El usuario Carlos Sainz ya existe con ID: ${carlos.id}`);
    }

    // 3. Crear una cuenta para Carlos
    const cuentaExistente = await Cuenta.findOne({ where: { usuario_id: carlos.id } });
    
    if (!cuentaExistente) {
      const nuevaCuenta = await Cuenta.create({
        usuario_id: carlos.id,
        tipo_cuenta_id: 1, // 1 = ahorros
        numero_cuenta: `SV-0001-0001-${carlos.id.toString().padStart(4, '0')}`,
        saldo: 1500.00, // Saldo inicial
        estado: 'activa'
      });
      console.log(`Cuenta habilitada para Carlos con ID de Cuenta: ${nuevaCuenta.id} y Saldo: $1500.00`);
    } else {
      console.log(`Carlos ya tiene una cuenta habilitada (ID de Cuenta: ${cuentaExistente.id}).`);
    }

  } catch (error) {
    console.error("Error al crear a Carlos:", error);
  } finally {
    process.exit();
  }
}

createCarlos();
