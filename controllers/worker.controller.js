'use strict'

var Workers = require('../models/workers.model');
var xlxs = require('mongo-xlsx')


function saveWorker(req, res){
    var worker = new Workers();
    var params = req.body;

    if(params.name && params.lastname && params.phone && params.age && params.company){
        worker.name = params.name;
        worker.lastname = params.lastname;
        worker.phone = params.phone;
        worker.age = params.age;
        worker.company = params.company;
        worker.role = params.role;
        worker.department = params.department;

        worker.save((err, workerSaved)=>{
            if(err){
                res.status(500).send({message: 'Error general en el servidor (GUARDAR)', err})
            }else if(workerSaved){
                res.send({message:'Trabajador guardado', worker: workerSaved});
            }else{
                res.status(418).send({message: 'Error al guardar el trabajador', err});
            }

        })


    }else{
        res.status(403).send({message: 'Ingrese todos los datos requeridos'});
    }
}


function deleteWorker(req, res){
    let workerId =req.params.id;

    Workers.findByIdAndDelete(workerId, (err, workerDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error general (ELIMINAR)'});
        }else if(workerDeleted){
            res.send({message: 'Trabajador eliminado correctamente'});
        }else{
            res.status(418).send({message: 'Error al eliminar'});
        }
    })


}

function updateWorker(req,res){
    var workerId = req.params.id;
    var update = req.body;

    Workers.findByIdAndUpdate(workerId, update, {new: true}, (err, workerUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general (ACTUALIZAR)', err});
        }else if(workerUpdated){
            res.send({message: 'Trabajador actualizado:', worker: workerUpdated});
        }else{
            res.status(418).send({message: 'Error al actualizar', err});
        }

    }).populate('companies');
}


function workersNumber(req, res){
    var companyId = req.params.id;

        Workers.find({$or:[{company: companyId}]}, (err, workers)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(workers){
                res.send({workers: workers.length});
            }else{
                res.send({message: 'Sin registros'});
                }
            })

    
}   

function listWorkers(req, res){

    Workers.find({}, (err, workers)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(workers){
            res.send({workers: workers});
        }else{
            res.send({message: 'Sin registros'});
            }
        })


}   

function searchWorker(req, res){
    var params = req.body;
    if(params.search != ''){
        Workers.find({$or: [{name : {$regex : params.search, $options: 'i'}},
                            {role: {$regex: params.search, $options: 'i'}},
                            {department: {$regex: params.search, $options: 'i'}},
                            {lastname: {$regex: params.search, $options: 'i'}}]}, (err, findW)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general 1', err});
                                }else if(findW){
                                  if(findW.length == 0){
                                    res.send({message: 'No hay coincidencias'});
                                  }else{
                                        res.send({message:'Trabajador:',findW});
                                  }
                                   
                                }else{
                                    res.status(418).send({message: 'Sin datos'});
                                }

                            })
    }else if(params.search == ''){
        Workers.find((err, workers)=>{
            if(err){
                res.status(500).send({message: 'Error general', err});
            }else if(workers){
                res.send({message:'Trabajadores:',workers});
            }else{
                res.status(418).send({message: 'Sin datos'});
            }
        })

    
    }else{
        res.status(418).send({message: 'Ingrese datos'});
    }

}

function generateExcel(req, res){
    Workers.find({}, (err, excel)=>{
        if(err){
             res.status(500).send({message: 'Error', err});
        }else if(excel){
             var model = xlxs.buildDynamicModel(excel);

             xlxs.mongoData2Xlsx(excel,model,{fileName:'Trabajadores.xlsx', path: './EXCELS/', defaultSheetName: 'Trabajadores-worksheet' },(err, exce1Ok)=>{
                 if(err){
                     res.status(500).send({message: 'Error', err});
                 }else if(exce1Ok){
                    res.send({message: 'Excel creado en la carpeta', exce1Ok});
                }else{
                     res.status(418).send({message: 'Error al crear excel', err});
                } 
            })
         }else{
            res.status(404).send({message: 'No hay datos', err});
        }
     })
 }



module.exports = {
    saveWorker,
    deleteWorker,
    updateWorker, 
    workersNumber,
    searchWorker,
    generateExcel,
    listWorkers
    
}