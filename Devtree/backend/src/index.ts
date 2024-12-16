import app from './server'; // Importamos el servidor de express
import colors from 'colors';

const port = process.env.PORT || 3000; // Port 3000 o el que asigne Host

app.listen(port, () => {
    console.log(colors.magenta.bold('Server is running on port'), port);
});

// node --watch [Archivo] para que se actualice automaticamente
