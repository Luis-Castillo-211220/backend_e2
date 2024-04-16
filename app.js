import { api } from './config/config.js';
import swaggerDocs from './config/swagger.js';
import middleware from './middlewares/validateToken.js'

import express from 'express';

import user from './routes/user.routes.js';
import dispositivo from './routes/dispositivo.routes.js';
import sensor from './routes/sensor.routes.js'
import alerta from './routes/alerta.routes.js'
import confAlerta from './routes/confAlerta.routes.js'

const app = express();

app.use(express.json())
// ROUTERS
app.use('/api/user', user);
app.use('/api/dispositivos', dispositivo)
app.use('/api/sensor', sensor)
app.use('/api/alertas', alerta)
app.use('/api/confAlertas', confAlerta)
// app.use('/api/profile', middleware, profile);



// SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});

