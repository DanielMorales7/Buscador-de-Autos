//variables

const marca        = document.querySelector('#marca');
const year         = document.querySelector('#year');
const minimo       = document.querySelector('#minimo');
const maximo       = document.querySelector('#maximo');
const puertas      = document.querySelector('#puertas');
const transmision  = document.querySelector('#transmision');
const color        = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear(); // trae el año actual
const min = max - 10;

// generar objeto con la busqueda

const datosBusqueda = {
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''
}

//Eventos

document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); // muestra los automoviles al cargar

    // llena las opciones de años
    llenarSelect();
})

// Event Listener para los select de busqueda

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();

    console.log(datosBusqueda);
})

// Funciones
function mostrarAutos(autos){

    limpiarHTML();
    // console.log(datosBusqueda);

    // const existe = Object.keys(datosBusqueda.marca).length !== 0;

    // console.log(existe);

    // if(existe){
        
        autos.forEach(auto => {
    
            const autoHTML = document.createElement('p');
            const {marca, modelo,year,puertas, transmision, precio, color} = auto;
            autoHTML.textContent = `
             ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio ${precio} - Color ${color}
            `;
        // insertamos resultado
        resultado.appendChild(autoHTML);
        
        });
    // }
}

// limpiar HTML

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//genera los años del select
function llenarSelect(){

    for (let i = max; i >= min; i--) {
        
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las opciones de año
        
    }

}

// función que filtra en base a la busqueda

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor )

    // console.log(resultado);
    

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados intenta otros terminos';

    resultado.appendChild(noResultado);
}



function filtrarMarca(auto){ // se pasa como variable el iterador de arrow f
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){ // se pasa como variable el iterador de arrow f
    const {year} = datosBusqueda;

    if(year){
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){ // se pasa como variable el iterador de arrow f
    const {minimo} = datosBusqueda;

    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){ // se pasa como variable el iterador de arrow f
    const {maximo} = datosBusqueda;

    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){ // se pasa como variable el iterador de arrow f
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){ // se pasa como variable el iterador de arrow f
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){ // se pasa como variable el iterador de arrow f
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}