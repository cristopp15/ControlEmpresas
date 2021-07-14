'use strict'

var Branch = require('../models/branch.model');

function addBranch(req, res){
    var params = req.body;
    var branch = new Branch();

    if(params.name && params.location && params.company){
        branch.name = params.name;
        branch.location = params.location;
        branch.company = params.company;

        branch.save((err, branchSaved)=>{
            if(err){
                res.status(500).send({message: 'Error general al servidor', err});
            }else if(branchSaved){
                res.send({message:'Sucursal guardada correctamente', branchSaved});
            }else{
                res.status(418).send({message :'Error al guardar', err})
            }
        })

    }else{
        res.status(418).send({message: 'Ingrese todos los datos requeridos', err});
        
    }


}

function deleteBranch(req,res){
    var branchId = req.params.id;

    Branch.findByIdAndRemove(branchId, (err, branchDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor', err});
        }else if(branchDeleted){
            res.send({message: 'Sucursal eliminada correctamente'});
        }else{
            res.status(418).send({message: 'Error al eliminar'});
        }
    })



}

function updateBranch(req, res){
    var branchId = req.params.id;
    var update = req.body;

    Branch.findByIdAndUpdate(branchId, update, {new:true}, (err, branchUpdated)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor', err});
        }else if(branchUpdated){
            res.send({message: 'Sucursal actualizada:', branchUpdated});
        }else{
            res.status(418).send({message: 'Error al actualizar', err});
        }
    }).populate();

}


function listBranches(req, res){
    Branch.find({}, (err, companies)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor', err})
        }else if(companies){
            res.send({companies});
        }else{
            res.status(418).send({message: 'No hay registros', err});
        }

    })

}

module.exports = {
    addBranch,
    deleteBranch,
    updateBranch,
    listBranches
}