let promptPuter =
  "Olhe a foto deste comprovante e responda em UMA linha, sem escrever mais nada, com 2 pedaços separados por |. Primeiro pedaço: o emoji da categoria, o nome do estabelecimento dentro de <strong>, e depois cada item comprado com seu valor, um por linha usando <br>. Segundo pedaço: o total pago, só o número, com ponto e sempre com duas casas decimais. As categorias são: 🛒 Mercado, 🚗 Transporte, 🍔 Comida, 💊 Saúde, 🎉 Lazer, 🏠 Casa, 💸 Outros. Exemplo de resposta: 🍔 <strong>Padaria Pão Quente</strong><br>Pão — R$ 5,00<br>Leite — R$ 4,50|9.50";
let total = 0;
let TotalcomprovantesLidos = 0;

function mostrarLoading(mostrar) {
  document.getElementById("loading").classList.toggle("hidden", !mostrar);
}

async function lerComprovante() {
  let comprovante = document.getElementById("foto-comprovante").files[0];

  if (!comprovante) return;

  mostrarLoading(true);

  try {
    let resposta = await puter.ai.chat(promptPuter, comprovante);
    let respostaFiltrada = resposta.message.content;
    let partes = respostaFiltrada.split("|");
    console.log(respostaFiltrada);
    console.log(`total: ${partes[1]}`);

    total += Number(partes[1]);
    TotalcomprovantesLidos += 1;
    document.querySelector(".montante").textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById("c-lidos").textContent =
      `${TotalcomprovantesLidos} comprovantes lidos`;
  } catch (erro) {
    console.error("Erro ao processar comprovante:", erro);
  } finally {
    mostrarLoading(false);
  }
}
