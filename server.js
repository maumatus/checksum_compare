const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const arch_entrada = './md5sums.txt';
const arch_salida = './md5sums_2.txt';

app.get('/',(req, res)=> {
    
    const arch_video_a = [];

    const arch_video_b = [];
    
    try {
        let files = fs.readFileSync(arch_entrada,'utf8');
        let lineas = files.split(/\r?\n/)
        for (let i = 0; i < lineas.length - 1; i++) {
            let el = lineas[i];
            arch_video_a.push(el);
        }
    } catch (error) {
        console.log(error);
    }
    //console.log(arch_video)
    //En este scope secuencia ya tenemos un array de string con los checksum dentro variable
    //nos falta comparar con otra secuencia
    
    try {
        let files = fs.readFileSync(arch_salida,'utf8');
        let lineas = files.split(/\r?\n/)
        for (let i = 0; i < lineas.length - 1; i++) {
            let el = lineas[i];
            arch_video_b.push(el);
        }
        let used = process.memoryUsage().heapUsed / 1000000;
        console.log(`el script uso aproximadamente ${Math.round(used)}MB`)
    } catch (error) {
        console.log(error);
    }

    //Comparamos arrays
    function compareArrays(arr1, arr2) {
        const result = JSON.stringify(arr1) == JSON.stringify(arr2)
        if (result) {
            console.log("ambos grupos tienen los mismos archivos validados");
        } else {
            console.log("los grupos de archivos no coinciden y los siguientes archivos no se validaron");
            const el_distintos = arr1.filter(
                function (i) {
                    return this.indexOf(i) < 0;
                },
                arr2
            );
            console.log(el_distintos)
        }
    }
    compareArrays(arch_video_a, arch_video_b);
});

app.listen(PORT,()=> {
    console.log(`ejecutando servidor en puerto http://localhost/${PORT}`)
});
