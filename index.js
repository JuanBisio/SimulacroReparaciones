
const express = require('express');

const app = express();
const port = 3000; 
// const cors = require('cors');

const { sequelize,Reparacion } = require('./models/Reparacion');

// Middlewares
const cors = require('cors');
const rutasReparacion = require('./routes/reparacionRoutes');

app.use(cors());
app.use(express.json());
app.use('/', rutasReparacion);

async function seedDatabase() {
    const count = await Reparacion.count();
    try {
        if (count === 0) {
            console.log('Base de datos de pacientes vacía. Insertando datos iniciales...');
            const reparacionInicial = [
                    {
                      fechaReparacion: new Date('2025-05-10'),
                      nombreCliente: 'Ana Gómez',
                      tipoEquipo: 'Laptop',
                      descripcionProblema: 'No enciende',
                      estado: 'Recibido',
                      costoEstimado: 5000,
                      Pagado: false
                    },
                    {
                      fechaReparacion: new Date('2025-05-11'),
                      nombreCliente: 'Luis Fernandez',
                      tipoEquipo: 'Desktop',
                      descripcionProblema: 'Lento rendimiento',
                      estado: 'En Diagnóstico',
                      costoEstimado: 5000,
                      Pagado: false
                    }
                  ];
            // Insertar datos iniciales
            Reparacion.bulkCreate(reparacionInicial);
            console.log('Datos iniciales de pacientes insertados correctamente.');
        }

        else { console.log('La base de datos ya contiene datos de pacientes. Saltando inserción inicial.');}
   
    } catch (error) { console.error('Error al insertar datos iniciales:', error); }
}


app.get('/', (req, res) => {
    res.send('¡Backend Funcionando!');
});


sequelize.sync({ force: true }) // Usar { force: true } en desarrollo para recrear tablas
    .then(() => {
        console.log('Base de datos sincronizada.');
        return seedDatabase(); // Cargar datos después de sincronizar
    })
    .then(() => {
        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor de Backend escuchando en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos o sembrar datos:', err);
    });