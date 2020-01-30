const controller = require('../Controllers/controller');
const path = require('path');

module.exports = app => {
    
    // app.post('/users', controller.);
    // router.post('/users', contr
    // app.get('/projects/:id', controller.oneProject);
    // app.get('/tickets/:id', controller.oneTicket);
    // app.post('/projects', controller.createProject);
    // app.post('/tickets', controller.createTicket);
    // app.put('/authors/:id', controller.updateCake);
    // app.put('/authors/quotes/:id', controller.addQuotes);
    // app.put('/authors/quotes/voteup/:id', controller.voteUp);
    // app.put('/authors/quotes/votedown/:id', controller.voteDown);
    // app.post('/authors', controller.createCake);
    // app.delete('/authors/:id', controller.deleteCake);
    // app.put('/authors/quotes/:id/:quote', controller.deleteQuote);
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
}