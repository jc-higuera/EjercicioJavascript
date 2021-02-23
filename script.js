function secret(mensaje, fn, numero){
    if(fn=="encrypt"){
        result = [];
        mensaje.forEach(element => {
            result.push(element+numero);
        }); 
        return result;
    }
    else if(fn=="decrypt"){
        result = [];
        mensaje.forEach(element => {
            result.push(element-numero);
        }); 
        return result;
    }
}

console.log(secret([1,2,4,7], "encrypt", 1));
console.log(secret([2,3,5,8], "decrypt", 1));

let fibonacci = (n) => {return n>=2 ?  fibonacci(n-1)+fibonacci(n-2) : (n===1 ?  1 :  0); }

console.log(fibonacci(8));


const urlProductos = "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";
const urlPedidos = "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";

async function getProductoMasVendido(){
    let productos;

    await fetch(urlProductos)
    .then(res => res.json())
    .then(data => productos = data)
    .then(() => console.log(productos));

    let  pedidos;

    await fetch(urlPedidos)
    .then(res => res.json())
    .then(data => pedidos = data)
    .then(() => console.log(pedidos));


    let pedidosTotales = [];
    productos.forEach(element => {
        pedidosTotales[(element.idproducto-1)] = 0;
    });
    pedidos.forEach(element => {
        pedidosTotales[(element.idproducto-1)] += parseInt(element.cantidad);
    });
    let maxIndex = 0;
    let max = 0;
    for (let index = 0; index < pedidosTotales.length; index++) {
        const element = pedidosTotales[index];
        if(element>max){
            max = element;
            maxIndex = index;
        }
    }
    let nombreMax = productos[maxIndex].nombreProducto;
    console.log(nombreMax + " "+ max + " unidades");
}

getProductoMasVendido();