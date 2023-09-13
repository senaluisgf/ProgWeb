class Empregado {
  constructor(nome, salario){
    this.nome = nome;
    this.salario = salario;
  }

  getSalario(){
    return this.salario;
  }

  setSalario(salario){
    if (salario < 0) {
      console.log('Não é possível aceitar salário com valor negativo')
      return
    }

    this.salario = salario
    return
  }

  static somaSalarios(empregados){
    return empregados.reduce((acc, empregado) => acc + empregado.getSalario(), 0)
  }
}

(function () {
  empregado1 = new Empregado('Luis', 1500);
  empregado2 = new Empregado('David', 3000);

  console.log({empregado1})
  console.log({empregado2})
  
  empregado1.setSalario(1650);
  empregado2.setSalario(3300);

  console.log({empregado1})
  console.log({empregado2})

  soma = Empregado.somaSalarios([empregado1, empregado2])

  console.log({somaDosSalarios: soma})
})()