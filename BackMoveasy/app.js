const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const projetRoutes = require('./routes/projetRoutes');
const itemRoutes = require('./routes/itemRoutes');
const etapeRoutes = require('./routes/etapeRoutes');
const collaborateurRoutes = require('./routes/collaborateurRoutes');
const roleRoutes = require('./routes/roleRoutes');
const categorieRoutes=require('./routes/categorieRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/projet', projetRoutes);
app.use('/item', itemRoutes);
app.use('/etape', etapeRoutes);
app.use('/collaborateur', collaborateurRoutes);
app.use('/role', roleRoutes);
app.use('/categorie',categorieRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
