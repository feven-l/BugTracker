const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');


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
    // var hashed_password = '';
    // bcrypt.hash(req.body.password, 10)
    // .then(hashed_password => {
    //     console.log(hashed_password);
    //     req.body.hashed_password = hashed_password;
    // })
    // .catch(error => {
    //     console.log('could not hash password', error);
    // })
    db.query(
        `INSERT INTO bugtrackerdb.users (firstName, lastName, email, password) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.email}', '${req.body.password}')`,
        //   [req.body.owner, req.body.name, req.body.description],
        (error,results) => {
            if (error) {
                console.error(error);
                res.status(500).json({message: 'error'});
            } else {
                console.log("after db is created", req.body)
                console.log(results)
                return res.status(200).json({data: results});
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
        router.get('/userLogin/:email', function (req, res, next) {
            console.log(req.body);
            db.query(
                `SELECT * FROM bugtrackerdb.users WHERE email = '${req.params.email}' limit 1`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        console.log(results[0]);
                        // if(results[0].password == req.body.password){
                            return res.status(200).json(results[0]);
                        // }else{
                        //     return res.status(200).json("error");
                        // }
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
                `SELECT users.id AS UserID,users.email, CONCAT(firstName,' ',lastName) AS fullName,projects.projectName,projects.projectDescription,projects.projectPriority,projects.projectDueDate,developers.roleType,developers.isCreator 
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
                            return res.status(200).json({status: 'ok'});
                            // id=results2.insertId
                            // db.query(
                            //     `INSERT INTO bugtrackerdb.developers (Projects_id,Users_id,roleType,isCreator) VALUES (${id},${req.body.userId},'${req.body.roleType}',1)`,
                            //     (error) => {
                            //         if (error) {
                            //         console.error(error);
                            //         res.status(500).json({status: 'error'});
                            //         } else {
                            //         res.status(200).json({status: 'ok'});
                            //         }
                            //     }
                            // )
                        }
                    }
                );
            });
        router.put('/projects/:id',(req,res,next) =>{
            db.query(`UPDATE bugtrackerdb.projects set projectName='${req.body.projectName}', projectDescription='${req.body.projectDescription}',projectDueDate='${req.body.projectDueDate}',projectPriority='${req.body.projectPriority}' where id=${req.params.id}`,
            // UPDATE `bugtrackerdb`.`projects` SET `projectName` = 'dsaf', `projectDescription` = 'dsafdsaf', `projectPriority` = 'fdsadsfdsa' WHERE (`id` = '1') and (`creatorId` = '1');
            (error) => {
                if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
                } else {
                res.status(200).json({status: 'ok'});
                }
            })
        })
        router.delete('/projects/delete/:id',(req,res,next) =>{
            db.query(//`DELETE FROM bugtrackerdb.projects WHERE projects.id=${req.params.id} and creatorId=${req.body.creatorId}`,
            `DELETE FROM bugtrackerdb.developers WHERE (Projects_id = ${req.params.id});`,
             
            (error) => {
                if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
                } else {
                    
                res.status(200).json({status: 'ok'});
                db.query(`DELETE FROM bugtrackerdb.projects WHERE projects.id =${req.params.id};`,
                (error) => {
                    if (error) { 
                    console.error(error);
                    res.status(500).json({status: 'error'});
                    } else {
                        
                    res.status(200).json({status: 'ok'});
                    }
                })
            }
            })
        })
        router.delete('/tickets/delete/:id',(req,res,next) =>{
            db.query(
            `DELETE FROM bugtrackerdb.comments WHERE (Tickets_id = ${req.params.id});`,
             
            (error) => {
                if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
                } else {
                    
                res.status(200).json({status: 'ok'});
                db.query(`DELETE FROM bugtrackerdb.tickets WHERE tickets.id =${req.params.id};`,
                (error) => {
                    if (error) { 
                    console.error(error);
                    res.status(500).json({status: 'error'});
                    } else {
                        
                    res.status(200).json({status: 'ok'});
                    }
                })
            }
            })
        })
        router.delete('/comments/delete/:id',(req,res,next) =>{
            db.query(
            `DELETE FROM bugtrackerdb.comments WHERE (comments.id = ${req.params.id});`,
             
            (error) => {
                if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
                } 
                else {
                res.status(200).json({status: 'ok'});
                }
            })
        })
        router.delete('/comments/delete/:projId/:userId',(req,res,next) =>{
            db.query(
            `DELETE FROM bugtrackerdb.developers WHERE (Projects_id = ${req.params.projId}) and (Users_id=${req.params.userId});`,
             
            (error) => {
                if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
                } 
                else {
                res.status(200).json({status: 'ok'});
                }
            })
        })
                
        router.put('/tickets/:id',(req,res,next) =>{
            db.query(`UPDATE bugtrackerdb.tickets SET ticketName='${req.body.ticketName}', ticketType='${req.body.ticketType}',ticketDescription='${req.body.ticketDescription}',ticketPriority='${req.body.ticketPriority}',ticketDueDate='${req.body.ticketDueDate}',
            ticketStatus='${req.body.ticketStatus}',assignedUserId='${req.body.assignedUserId}' where tickets.id=${req.params.id}`,
            (error) => {
                if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
                } else {
                res.status(200).json({status: 'ok'});
                }
            })
        })
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
            console.log(req.body);
            db.query(
                `INSERT INTO bugtrackerdb.tickets (ticketName,ticketType,ticketDescription,ticketPriority,ticketDueDate,ticketStatus,Projects_id,Projects_creatorId,ticketCreatorId,assignedUserId) VALUES ('${req.body.ticketName}','${req.body.ticketType}',
                '${req.body.ticketDescription}','${req.body.ticketPriority}','${req.body.ticketDueDate}','${req.body.ticketStatus}','${req.body.Projects_id}','${req.body.Projects_creatorId}','${req.body.ticketCreatorId}','${req.body.assignedUserId}')`,
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
                        console.log(results);
                        return res.status(200).json(results);
                    }
                }
            )
        });
        router.get('/tickets/:id', function(req,res,next){
            db.query(
                `SELECT users.id AS UserId,assignedUserId,ticketCreatorId,CONCAT(firstName,' ',lastName) AS fullName, ticketName,ticketType,ticketDescription,ticketPriority,ticketDueDate,ticketStatus,tickets.createdAt,tickets.updatedAt,projects.projectName
                from bugtrackerdb.users inner join bugtrackerdb.tickets on tickets.assignedUserId=users.id or tickets.ticketCreatorid = users.id inner join bugtrackerdb.projects on tickets.Projects_id=projects.id where tickets.id=${req.params.id};`,
                (error, results) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({status: 'error'});
                    } else {
                        console.log(results);
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
        router.post('/comments', function (req, res, next) {
            console.log(req.body)
            db.query(
                `INSERT INTO bugtrackerdb.comments (comment,Tickets_id,commentCreatorId) VALUES (
                '${req.body.comment}','${req.body.Tickets_id}','${req.body.commentCreatorId}')`,
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
        router.get('/comments/:ticketId', function (req, res, next) {
            db.query(
                `SELECT * From bugtrackerdb.comments where Tickets_id=${req.params.ticketId}`,
                (error, results) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({status: 'error'});
                    } else {
                    console.log(results);
                    res.status(200).json({status: 'ok', data: results});
                    }
                }
            )
        });
    
    return router;
  }
  
  module.exports = createRouter,app => {
    
        app.all("*", (req,res,next) => {
            res.sendFile(path.resolve("./public/dist/public/index.html"));
        });
    }
    ;