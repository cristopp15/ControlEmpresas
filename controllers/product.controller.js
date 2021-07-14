'use strict'

var pdf = require('html-pdf');
var Product = require('../models/product.model');

function addProduct(req, res){
    var params = req.body;
    var product = new Product();

    if(params.name && params.expiration &&  params.stock && params.price && params.branch){
        product.name = params.name;
        product.expiration = params.expiration;
        product.quality = params.quality;
        product.stock = params.stock;
        product.price = params.price;
        product.branch = params.branch; 

        
    product.save((err, productSaved)=>{
        if(err){
            res.status(500).send({message: 'Error general en el servidor', err});
        }else if(productSaved){
            res.send({message: 'Producto guardado correctamente',productSaved});
        }else{
            res.status(418).send({message: 'No se guardo correctamente', err});
        }

    })


    }else{
        res.status(418).send({message: 'Ingrese todos los datos requeridos'});
    }
}


function deleteProduct(req, res){
    var productId = req.params.id;

    Product.findByIdAndRemove(productId,(err, productDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error general', err});
        }else if(productDeleted){
            res.send({message: 'Producto eliminado'});
        }else{
            res.status(418).send({message: 'No se elimino correctamente'});
        }

    })


}


function updateProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general', err});
        }else if(productUpdated){
            res.send({message: 'Producto actualizado', productUpdated});
        }else{
            res.status(418).send({message: 'Error al actualizar'});
        }
    }).populate();


}


function listProducts(req, res){

    Product.find({}, (err, products)=>{
        if(err){
            res.status(500).send({message: 'Error general en el servidor', err});
        }else if(products){
            res.send({products});
        }else{
            res.status(418).send({message:'No hay registros', err});
        }

    })



}

function generatePDF(req,res){

    var contenido = 'PDF DE PRODUCTOS';

pdf.create(contenido).toFile('./Productos.pdf', (err, pdfCreated)=> {
    if (err){
        res.status(500).send({message:'Error general'});
    } else if (pdfCreated){
        console.log(pdfCreated);
        res.send({message: 'PDF creado correctamente', pdfCreated});
    }
});

}

module.exports = {
    addProduct,
    generatePDF,
    deleteProduct,
    updateProduct,
    listProducts
}