const path = require('path');
const express = require('express');

// module.exports = app => {
    
//     app.get('/projects', controller.allProjects);
//     app.get('/projects/:id', controller.oneProject);
//     app.get('/tickets/:id', controller.oneTicket);
//     app.post('/projects', controller.createProject);
//     app.post('/tickets', controller.createTicket);
//     // app.put('/authors/:id', controller.updateCake);
//     // app.put('/authors/quotes/:id', controller.addQuotes);
//     // app.put('/authors/quotes/voteup/:id', controller.voteUp);
//     // app.put('/authors/quotes/votedown/:id', controller.voteDown);
//     // app.post('/authors', controller.createCake);
//     // app.delete('/authors/:id', controller.deleteCake);
//     // app.put('/authors/quotes/:id/:quote', controller.deleteQuote);
//     app.all("*", (req,res,next) => {
//         res.sendFile(path.resolve("./public/dist/public/index.html"));
//     });
// }



function createRouter(db) {
    const router = express.Router();
  
    router.post('/users', (req, res, next) => {
      db.query(
        `INSERT INTO bugtrackerdb.users (firstName, lastName, email, password) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.email}','${req.body.password}')`,
      //   [req.body.owner, req.body.name, req.body.description],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
            // return res.json()
          }
        }
      );
    });
    router.get('/users/:id', function (req, res, next) {
        db.query(
            `SELECT id, CONCAT(firstName,' ',lastName) AS fullName, email, password FROM bugtrackerdb.users WHERE id=${req.params.id}`,
            // [owner, 10*(req.params.page || 0)],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else {
                    return res.status(200).json(results);
    
                }
            }
            );
        });
        router.get('/users', function (req, res, next) {
            db.query(
                `SELECT * FROM bugtrackerdb.users`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                    }
                }
                );
            });
        
        router.get('/projects', function (req, res, next) {
            db.query(
                `SELECT * FROM bugtrackerdb.projects;`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                        // return res.json(results)
                    }
                }
                );
            });
        router.get('/projects/:id', function (req, res, next) {
            db.query(
                `SELECT users.email, CONCAT(firstName,' ',lastName) AS fullName,projects.projectName,projects.projectDescription,projects.projectPriority,projects.projectDueDate,developers.roleType,developers.isCreator 
                FROM bugtrackerdb.users INNER JOIN bugtrackerdb.developers on users.id=developers.Users_id INNER JOIN bugtrackerdb.projects ON developers.Projects_id=projects.id WHERE projects.id=${req.params.id}`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                        // return res.json(results)
                    }
                }
                );
            });
            router.post('/projects', (req, res, next) => {
                var id;
                db.query(
                    `INSERT INTO bugtrackerdb.projects (projectName, projectDescription, projectDueDate, projectPriority, creatorId) VALUES ('${req.body.projectName}','${req.body.projectDescription}','${req.body.projectDueDate}','${req.body.projectPriority}',${req.body.creatorId})`,
                //   [req.body.owner, req.body.name, req.body.description],
                    (error,results2) => {
                        if (error) {
                            console.error(error);
                            res.status(500).json({status: 'error'});
                        }
                        else {
                            res.status(200).json({status: 'ok'});
                            id=results2.insertId
                            db.query(
                                `INSERT INTO bugtrackerdb.developers (Projects_id,Users_id,roleType,isCreator) VALUES (${id},${req.body.userId},'${req.body.roleType}',1)`,
                                (error) => {
                                    if (error) {
                                    console.error(error);
                                    res.status(500).json({status: 'error'});
                                    } else {
                                    res.status(200).json({status: 'ok'});
                                    }
                                }
                            )

                        }
                    }
                );
            });
        router.get('/developers', function (req, res, next) {
            db.query(
                `SELECT * FROM bugtrackerdb.developers`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                    }
                }
            );
        });
        router.post('/developers', function (req, res, next) {
            db.query(
                `INSERT INTO bugtrackerdb.developers (Projects_id,Users_id,roleType,isCreator) VALUES (${req.body.projectId},${req.body.userId},'${req.body.roleType}',0)`,
                (error) => {
                    if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                    } else {
                    res.status(200).json({status: 'ok'});
                    }
                }
            )
        });
        router.post('/tickets', function (req, res, next) {
            db.query(
                `INSERT INTO bugtrackerdb.tickets (ticketName,ticketType,ticketDescription,ticketPriority,ticketDueDate,ticketStatus,Projects_id,Projects_creatorId,ticketCreatorId,assignedUserId) VALUES ('${req.body.ticketName}','${req.body.ticketType}',
                '${req.body.ticketDescription}','${req.body.ticketPriority}','${req.body.ticketDueDate}','${req.body.ticketStatus}',${req.body.projectId},${req.body.projectCreatorId},${req.body.ticketCreatorId},${req.body.assignedUserId})`,
                (error) => {
                    if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error'});
                    } else {
                    res.status(200).json({status: 'ok'});
                    }
                }
            )
        });
        router.get('/tickets', function(req,res,next){
            db.query(
                `SELECT * FROM bugtrackerdb.tickets`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                    }
                }
            )
        });
        router.get('/tickets/creator/:id', function(req,res,next){
            db.query(
                `SELECT CONCAT(firstName,' ',lastName) AS fullName, ticketName,ticketType,ticketDescription,ticketPriority,ticketDueDate,ticketStatus,tickets.createdAt,tickets.updatedAt,projects.projectName
                from bugtrackerdb.users inner join bugtrackerdb.tickets on tickets.ticketCreatorId=users.id inner join bugtrackerdb.projects on tickets.Projects_id=projects.id where tickets.id=${req.params.id}`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                    }
                }
            )
        });
        router.get('/tickets/:id', function(req,res,next){
            db.query(
                `SELECT users.id AS UserId,assignedUserId,ticketCreatorId,CONCAT(firstName,' ',lastName) AS fullName, ticketName,ticketType,ticketDescription,ticketPriority,ticketDueDate,ticketStatus,tickets.createdAt,tickets.updatedAt,projects.projectName
                from bugtrackerdb.users inner join bugtrackerdb.tickets on tickets.assignedUserId=users.id or tickets.ticketCreatorid inner join bugtrackerdb.projects on tickets.Projects_id=projects.id where tickets.id=${req.params.id};`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                    }
                }
            )
        });
        router.get('/tickets/assingedUserId/:id', function(req,res,next){
            db.query(
                `SELECT CONCAT(firstName,' ',lastName) AS fullName, ticketName,ticketType,ticketDescription,ticketPriority,ticketDueDate,ticketStatus,tickets.createdAt,tickets.updatedAt,projects.projectName
                from bugtrackerdb.users inner join bugtrackerdb.tickets on tickets.assignedUserId=users.id inner join bugtrackerdb.projects on tickets.Projects_id=projects.id where tickets.id=${req.params.id}`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        return res.status(200).json(results);
                    }
                }
            )
        });
    





    //         router.put('/event/:id', function (req, res, next) {
    //             db.query(
    //     'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
    //     [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
    //     (error) => {
    //       if (error) {
    //         res.status(500).json({status: 'error'});
    //       } else {
    //         res.status(200).json({status: 'ok'});
    //       }
    //     }
    //   );
    // });
    // router.delete('/event/:id', function (req, res, next) {
    //   db.query(
    //     'DELETE FROM events WHERE id=? AND owner=?',
    //     [req.params.id, owner],
    //     (error) => {
    //       if (error) {
    //         res.status(500).json({status: 'error'});
    //       } else {
    //         res.status(200).json({status: 'ok'});
    //       }
    //     }
    //   );
    // });
    return router;
  }
  
  module.exports = createRouter;