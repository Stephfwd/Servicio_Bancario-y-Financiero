require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", routes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API del Sistema Bancario funcionando correctamente.");
});

// Sincronizar Base de Datos y Arrancar Servidor
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
