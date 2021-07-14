'use strict'

var Companies = require('../models/companies.model');
 var xlxs = require('mongo-xlsx');


function saveCompany(req, res){
    var company = new Companies();
    var params = req.body;

    if(params.name && params.location && params.username && params.email && params.password && params.phone){
       
        Companies.findOne({$or: [{phone : params.phone}, 
                    {username: params.username},
                    {email: params.email}]}, (err, check)=>{
                        if(err){
                            res.status(500).send({message: 'Error general', err});
                        }else if(check){
                            res.send({message: 'Usuario, correo o telefono ya en uso'});
                        }else{
                            company.name = params.name;
                            company.location = params.location;
                            company.phone = params.phone;
                            company.username = params.username;
                            company.email = params.email;
                            company.password = params.password;

                            company.save((err, companySaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general (GUARDAR)', err});
                                }else if(companySaved){
                                    res.send({message:'Empresa guardada correctamente', company: companySaved});
                                }else{
                                    res.status(418).send({message:'Error al guardar la empresa', err});
                                }
                            })

                        }

                    })
       
    }else{
        res.status(418).send({message: 'Ingrese todos los datos'});
    }
}

function login(req, res){
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            User.findOne({$or:[{username: params.username}, 
                {email: params.email}]}, (err, check)=>{
                    if(err){
                        res.status(500).send({message: 'Error general'});
                    }else if(check){
                        bcrypt.compare(params.password, check.password, (err, passworOk)=>{
                            if(err){
                                res.status(500).send({message: 'Error al comparar'});
                            }else if(passworOk){
                                if(params.gettoken = true){
                                    res.send({token: jwt.createToken(check)});
                                }else{
                                    res.send({message: 'Bienvenido',company:check});
                                }
                            }else{
                                res.send({message: 'Contraseña incorrecta'});
                            }
                        });
                    }else{
                        res.send({message: 'Datos de compania incorrectos'});
                    }
                });
        }else{
           res.send({message: 'Ingresa tu contraseña'}); 
        }
    }else{
        res.send({message: 'Ingresa tu correo o tu username'});
    }
}

function deleteCompany(req, res){
    let companyId =req.params.id;

    Companies.findByIdAndDelete(companyId, (err, companyDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error general (ELIMINAR)'});
        }else if(companyDeleted){
            res.send({message: 'Empresa eliminada correctamente'});
        }else{
            res.status(418).send({message: 'Error al eliminar'});
        }
    })


}

function updateCompany(req,res){
    var companyId = req.params.id;
    var update = req.body;

    Companies.findByIdAndUpdate(companyId, update, {new: true}, (err, companyUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general (ACTUALIZAR)', err});
        }else if(companyUpdated){
            res.send({message: 'Empresa actualizada:', company: companyUpdated});
        }else{
            res.status(418).send({message: 'Error al actualizar', err});
        }

    })
}

function listCompanies(req, res){

        Companies.find({}, (err, companies)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(companies){
                res.send({companies: companies});
            }else{
                res.send({message: 'Sin registros'});
                }
            })

    
}   


function generateExcel(req, res){
     Companies.find({}, (err, excel)=>{
         if(err){
             res.status(500).send({message: 'Error', err});
         }else if(excel){
             var model = xlxs.buildDynamicModel(excel);

            xlxs.mongoData2Xlsx(excel,model,{fileName:'Companias.xlsx', path: './EXCELS/', defaultSheetName: 'Companias-worksheet' },(err, excelCreated)=>{
                if(err){
                     res.status(500).send({message: 'Error', err});
                 }else if(excelCreated){
                     res.send({message: 'Excel creado en la carpeta', excelCreated});
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
    saveCompany,
    login,
    deleteCompany,
    updateCompany,
    generateExcel,
    listCompanies

}


