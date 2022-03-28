const PetController = require('../controllers/pets.controllers');

module.exports = app => {
    app.get('/api/pets', PetController.findAllPets);
    app.get('/api/pets/:id', PetController.findOneSinglePet);
    app.post('/api/pets/new', PetController.createNewPet);
    app.delete('/api/pets/delete/:id', PetController.deleteAnExistingPet);
    app.put('/api/pets/:id/edit', PetController.updateExistingPet);
}
