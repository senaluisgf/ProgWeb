for(let i = 1; i < 11; i++){
    document.write(`<table border=\"1\" class=\"a c\" ${i}>`);

    document.write(`<thead><tr><th colspan=\"2\"> Produtos de ${i} </th></tr></thead>`);
    for(let j = 1; j < 11; j++){
        document.write(`<tr><td>${i}X${j}</td><td>${i*j}</td></tr>`);
    }
}