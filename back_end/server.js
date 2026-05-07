require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const errorHandler = require("./middlewares/errorMiddleware");

// Rutas
app.use("/api", routes);

// Manejo centralizado de errores (Debe ir después de las rutas)
app.use(errorHandler);

// Exportar app para pruebas
module.exports = app;

// Solo arrancar el servidor si este archivo se ejecuta directamente
if (require.main === module) {
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
}
