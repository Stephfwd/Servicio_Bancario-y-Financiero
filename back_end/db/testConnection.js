const sequelize = require("./connection");

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL establecida correctamente.");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:");
    console.error(error.message);
  } finally {
    await sequelize.close();
  }
};

testConnection();
