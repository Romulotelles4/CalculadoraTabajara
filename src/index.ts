import { Calculadora } from "./calculadora.js";
import { Calculo } from "./calculo.type.js";
import { RepositorioLocalStorage } from "./repositorios/repositorioLocalStorage.js";

const txtPrimeiroNumero = document.getElementById("primeiroNumero") as HTMLInputElement;
const selectOperador = document.getElementById("operador") as HTMLSelectElement;
const txtsegundoNumero = document.getElementById("segundoNumero") as HTMLInputElement;

const btnCalcular = document.getElementById("btnCalcular") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const txtResultado = document.getElementById("txtResultado") as HTMLParagraphElement;
const divHistorico = document.getElementById("historico") as HTMLDivElement;

const calculadora = new Calculadora()
const repositorioLocalStorage = new RepositorioLocalStorage();

exibirHistorico();

function calcular(): void {

        const calculo: Calculo = {
                primeiroNumero: Number(txtPrimeiroNumero.value),
                segundoNumero: Number(txtsegundoNumero.value),
                operador: selectOperador.options[selectOperador.selectedIndex].value
        }
        const resultado = calculadora.calcular(calculo);
        repositorioLocalStorage.inserir(calculadora.historicoOperacoes);

        if (calculadora.historicoOperacoes.length === 0) {
                divHistorico.style.display = "none";
        } else {
                limparOperacoes();
                exibirHistorico();
        }
        txtResultado.innerText = "O resultado é " + resultado;
}
function exibirHistorico() {
        calculadora.historicoOperacoes = repositorioLocalStorage.selecionarTodos();
        if (calculadora.historicoOperacoes.length > 0) {
                divHistorico.classList.remove("d-none");
        }
        calculadora.historicoOperacoes.forEach((operacao: string) => {
                const txtoperacao = document.createElement("h3") as HTMLHeadingElement;
                txtoperacao.className = "alert alert-primary";
                txtoperacao.innerText = operacao;
                divHistorico.appendChild(txtoperacao);
        })
}
function limparOperacoes() {
        while (divHistorico.firstChild) {
                divHistorico.removeChild(divHistorico.firstChild);
        }

}
btnCalcular.addEventListener("click", calcular);
btnLimpar.addEventListener("click", () => {
        repositorioLocalStorage.excluir();
        divHistorico.classList.add("d-none");
        exibirHistorico();
});

