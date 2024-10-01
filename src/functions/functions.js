var cotacaoFim,cotacaoPagina,cotacaoCont,permissaoselecionada = '',OrdemRelatorio = '',OrdemDescRelatorio = '',gravarMicrofone=0,dadosrota;
function buscarLista2(campo,tecla,opt){if((tecla<37 || tecla>40) && tecla!=0 && tecla!=17 && tecla!=18 && tecla!=20){setPagina(0);buscarLista();}}
function buscarLista()
{
   if (!NovaPagina[formAtual]) return false;
   if (Pagina[formAtual]==-1) Pagina[formAtual] = 0;
   if (formAtual=='cotacao') xajax_listaCotacao(xajax.getFormValues("formlistacotacao"),formAtual,Pagina[formAtual],Ordem[formAtual]);
   if (formAtual=='listadecliente') xajax_buscaCliente(xajax.getFormValues('formbuscacliente'),formAtual,Pagina[formAtual]);
   NovaPagina[formAtual] = false;
}
function listarContato(){xajax_listaContato(xajax.getFormValues("formrelatoriocontato"));}
function verContato(sid,numerocliente)
{
   exibeFormulario('adicionarContato');
   if (document.getElementById('adicionarContato').innerHTML=='')
   {
      if (numerocliente) setTimeout('verContato(\'\','+numerocliente+')',300);
      else setTimeout('verContato(\''+sid+'\',\'\')',300);
   }
   else
   {
      if (numerocliente) xajax_verContato('',numerocliente);
      else xajax_verContato(sid);
   }
}
function efetivaSolicitacao(numero)
{
   var divconfirm = document.getElementById('confimarSolicitacao');
   divconfirm.style.display = 'table';
   divconfirm.innerHTML = "<input type=\"button\" class=\"botao\" value=\"Aceitar SolicitaÃ§Ã£o\" onclick=\"xajax_efetivaSolicitacao('"+numero+"');\"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   divconfirm.innerHTML +="<input type=\"button\" class=\"botao\" value=\"Editar SolicitaÃ§Ã£o\" onclick=\"exibeFormulario('adicionarCliente');editarSolicitacao('"+numero+"',1);\"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   divconfirm.innerHTML +="<input type=\"button\" class=\"botao\" value=\"Cancelar SolicitaÃ§Ã£o\" onclick=\"cancelaSolicitacao('"+numero+"');\"/>";
}
function cancelaSolicitacao(numero){pconfirm('Confirma remoÃ§Ã£o de solicitaÃ§Ã£o?','cancelarSolicitacao('+numero);}
function cancelarSolicitacao(numero, verdade){if (verdade) { xajax_efetivaSolicitacao(numero,0); }}
function editarSolicitacao(numero,temporario)
{
   var divcidade = document.getElementById('divcidade');
   if(divcidade==null||divcidade.innerHTML=='Carregando...') setTimeout("editarSolicitacao('"+numero+"')",500);
   else
   {
      document.getElementById('alteracao').innerHTML = '';
      if (!temporario) xajax_editaCliente(numero);
      else xajax_editaCliente(numero,1);
   }
}
function limpaLigacao()
{
   document.getElementById('divligacao').innerHTML = '<button class="botaop" onclick="this.disabled=true;realizarLigacao();this.innerHTML=\'Aguarde...\';">Ligar</button>';
   document.getElementById('divformligacao').innerHTML = '';
   document.getElementById('divfimligacao').innerHTML = '';
}
function realizarLigacao(dados)
{
   if (document.getElementById('id_precliente').value!='0')
   {
      if (gravarMicrofone===1)
      {
         if (!document.getElementById('analyser')) document.getElementById('divligacao').parentNode.lastChild.innerHTML = '<canvas id="analyser" style="display:none;background:#202020;height:32px;width:480px;"></canvas>';
         var i,a,arquivo = ['audiorecorder/js/audiodisplay.js','audiorecorder/js/recorderjs/recorder.js','audiorecorder/js/main.js'];
         for(i in arquivo)
         {
            if (!dados) dados = 0;
            a = carregarArquivo(arquivo[i]);
            if (a==false) {if(dados>=20){alertTempo('Arquivo necessÃ¡rio nÃ£o carregado',3000);return false;}setTimeout(function(qtd){realizarLigacao(qtd+1);},600,dados);return false;}
         }

         initAudio();
         setTimeout(function(){
            if(!audioRecorder)
            {
               gravarMicrofone = 0;
               document.getElementById('divligacao').parentNode.lastChild.innerHTML = '<span class="formok">Erro ao iniciar gravaÃ§Ã£o, verifique a permissÃ£o</span>';
               window.parent.setbloqueioJanela('OutrTelemarketing',0);
            }
            else toggleRecording(0);
         },1000);

         /*Bloquear fechamento de mÃ³dulo para nÃ£o perder gravaÃ§Ã£o*/
         window.parent.setbloqueioJanela('OutrTelemarketing',1);
      }
      xajax_realizaLigacao(document.getElementById('id_precliente').value);
      defineFormLigacao();
   }
}
function defineFormLigacao()
{
   document.getElementById('divformligacao').innerHTML = '<input type="radio" value="1" name="statusligacao"/>NÃ£o atendido<input type="radio" value="2" name="statusligacao"/>Atendido<input type="radio" value="3" name="statusligacao"/>Atendido completamente';
   document.getElementById('divfimligacao').innerHTML = '<button class="botaop" onclick="this.innerHTML=\'Aguarde...\';salvarLigacao();">Finalizar</button>';
}
function salvarLigacao(gravacao)
{
   var dados = new Array(document.getElementById('id_precliente').value);
   var statusligacao = document.getElementsByName('statusligacao');
   for(var i=0;i<statusligacao.length;i++)
   {
      if(statusligacao[i].checked)
      {
         dados[1] = statusligacao[i].value;
         break;
      }
   }
   if (!dados[1]){alertTempo('Selecione um status',4930);return false;}
   if (gravarMicrofone===1 && !gravacao && lastRecord===false)
   {
      funcaofimgravacao = function(gravacao){salvarLigacao(gravacao);};
      toggleRecording(1);
      document.getElementById('divligacao').parentNode.lastChild.innerHTML = 'Exportando gravaÃ§Ã£o aguarde...';
      window.parent.setbloqueioJanela('OutrTelemarketing',0);
      return false;
   }

   if (gravarMicrofone===1)
   {
      lastRecord = false;
      document.getElementById('divligacao').parentNode.lastChild.innerHTML = '';
   }
   if(gravacao)
   {
      dados['gravacao'] = gravacao;
      console.log('aqui');
      setTimeout(function(cliente){console.log('aqui2'+cliente);xajax_exibirHistorico(cliente,'',true);},300,dados[0]);
   }
   xajax_realizaLigacao(dados);
}
function acaoIntegracao(acao,dados)
{
   if (acao=='ligar')
   {
      if (!document.forms['form'+formAtual]['id_precliente'] || document.forms['form'+formAtual]['id_precliente'].value==0) {alertTempo('Escolha um cliente',3000);return false;}
      if ( document.getElementById('temtelefone').innerHTML=='') {alertTempo('NÃºmero nÃ£o encontrado',3000);return false;}
      xajax_acaoIntegracao(formAtual,'ligar',{cliente:document.forms['form'+formAtual]['id_precliente'].value,telefone:document.getElementById('temtelefone').innerHTML});
   }
}
function exibirListaTotalContato()
{
   var lista = document.getElementById('totaldelistacontato').innerHTML;
   var listadecode = JSON.parse(lista),i,div='';
   for(i in listadecode)
   {
      div += '<div class="flinha"><div class="w100 ftac">'+i+'</div><div class="w200 ftac">'+listadecode[i]+'</div><div class="fespaco">&nbsp;</div></div>';
   }
   var altura = parseInt(getJanela('altura'))-100;
   var html = '<div class="listacb" id="htmlnovovalor"><div class="flinha" style="width:450px;"><div class="w100 cb ftac">Contato</div><div class="w200 cbtbr ftac">Quantidade</div><div class="fespaco ftac"><button class="botaop" onclick="fecharsolicitaDado()">Fechar</button></div></div><div style="width:450px;height:'+altura+'px;">'+div+'</div></div>';
   solicitaDado(html);
   setLista('htmlnovovalor','htmlnovovalor',-1);
}
function relatorioLigacao(){xajax_relatorioLigacao(xajax.getFormValues("formrelatorioligacao"));}
function exibirDetalheRelatorio(imagem,ramal)
{
   if (imagem.src.indexOf('olhofechado')!=-1)
   {
      var opt = 1;
      imagem.src = imagem.src.replace('olhofechado','olhoaberto');
   }
   else
   {
      var opt = 0;
      imagem.src = imagem.src.replace('olhoaberto','olhofechado');
   }

   if (opt==0)
   {
      document.getElementById('relatoriorramal'+ramal+'detalhe0').style.display = 'none';
      document.getElementById('relatoriorramal'+ramal+'detalhe1').style.display = 'none';
   }
   else
   {
      document.getElementById('relatoriorramal'+ramal+'detalhe0').style.display = 'block';
      document.getElementById('relatoriorramal'+ramal+'detalhe1').style.display = 'block';
   }
}
function mudarOrdemRelatorio(opcao,ramal,campo)
{
   if (OrdemRelatorio==campo)
   {
      if (OrdemDescRelatorio=='desc') OrdemDescRelatorio = 'asc';
      else OrdemDescRelatorio = 'desc';
   }
   else OrdemRelatorio = campo;
   var dadosopcao = {};
   dadosopcao['opcao'] = opcao+'ramal';
   dadosopcao['usuario'] = ramal;
   dadosopcao['ordem'] = OrdemRelatorio;
   dadosopcao['ordemdesc'] = OrdemDescRelatorio;
   xajax_relatorioLigacao(xajax.getFormValues("formrelatorioligacao"),dadosopcao);
}
function exibirLigacao(opcao,ramal)
{
   var divrelatorio = document.getElementById(opcao+'ramal'+ramal);
   if (!divrelatorio)
   {
      if (OrdemRelatorio=='')
      {
         OrdemRelatorio = 'quantidade';
         OrdemDescRelatorio = 'desc';
      }
      var dadosopcao = {};
      dadosopcao['opcao'] = opcao;
      dadosopcao['usuario'] = ramal;
      dadosopcao['ordem'] = OrdemRelatorio;
      dadosopcao['ordemdesc'] = OrdemDescRelatorio;

      var divrelatorio = document.getElementById('listaRelatoriolig');
      var i,lista = divrelatorio.children;
      var j = lista.length;
      for (i=0;i<j;i++)
      {
         if (lista[i].getAttribute('data-ramal')==ramal) break;
      }

      var novalinha = document.createElement("div");
      novalinha.setAttribute("id",opcao+'ramal'+ramal);
      novalinha.className = 'estrutura';
      novalinha.style.display = 'block';
      divrelatorio.insertBefore(novalinha,lista[i+1]);
      xajax_relatorioLigacao(xajax.getFormValues("formrelatorioligacao"),dadosopcao);
   }
   else exibirOpcao(opcao+'ramal'+ramal);
}
function imprimirDetalheLigacao(ramal,dados)
{
   var htmllista = '';
   for (var ligacao in dados)
   {
      if (dados[ligacao]['arquivo']!='')
      {
         tocaLigacao = '<div class="espaco"><img src="../../../Imagem/play.png" onclick="this.parentNode.id=\'lig'+dados[ligacao]['sid']+'\';xajax_realizaLigacao(\''+dados[ligacao]['sid']+'\',\''+dados[ligacao]['arquivo']+'\');" alt="Tocar" class="iconep"/></div>';
      }
      else tocaLigacao = '<div class="espaco">&nbsp;</div>';
      htmllista += '<div class="linha linhalista"><div class="datahora">'+dados[ligacao]['datahora']+'</div><div class="datahora">'+dados[ligacao]['origem']+'</div><div class="datahora">'+dados[ligacao]['destino']+'</div><div class="datahora">'+dados[ligacao]['duracao']+'</div>'+tocaLigacao+'</div>';
   }

   var divrelatorio = document.getElementById('detalheramal'+ramal);
   divrelatorio.innerHTML = htmllista;
}
function exibirlistaChamada()
{
   var listaChamada = document.getElementById('listaChamadaCli');
   var listaContato = document.getElementById('listaContatoCli');
   if (listaChamada.className.indexOf(' dnone')!==-1)
   {
      listaChamada.className = listaChamada.className.replace(' dnone','');
      listaContato.className += ' dnone';
   }
   else
   {
      listaContato.className = listaContato.className.replace(' dnone','');
      listaChamada.className += ' dnone';
   }
}
function abrirMensageiro(dados)
{
   if(formAtual=='adicionarContato')
   {
      var telefone = document.getElementById('temtelefone');
      if (telefone.innerHTML.length<10) return false;
      if (document.forms['formadicionarContato']['id_precliente'].value=='' || document.forms['formadicionarContato']['id_precliente'].value==0) return false;
      var crm = document.forms['formadicionarContato']['id_precliente'].value;
   }
   else
   {
      if(!dados.cliente) return false;
      var cliente = dados.cliente;
   }
   if (!window.parent.getJanelaAberta('OutrMensageiro'))
   {
      window.parent.abrirJanelaOpt('OutrMensageiro','Outro/Pagina/Mensageiro.php',"acao=abrircontato");
      setTimeout(function (dados){abrirMensageiro(dados);},300,dados);
   }

   var dadosmensagem = {modulo:'mensageiro',retornopara:'telemarketing',acao:'abrircontato',telefone:[],crm:0,cliente:0,ehresposta:0};

   if (telefone)
   {
      if (telefone.getAttribute('data-telefone') && telefone.getAttribute('data-telefone')!='') dadosmensagem.telefone.push(telefone.getAttribute('data-telefone'));
      if (telefone.getAttribute('data-celular') && telefone.getAttribute('data-celular')!='') dadosmensagem.telefone.push(telefone.getAttribute('data-celular'));
      dadosmensagem.crm = crm;
   }
   else
   {
      dadosmensagem.cliente = cliente;
      dadosmensagem.ehresposta = 1;
   }

   console.log('adicionando listener telemarketing');
   window.parent.dados4modulo.addListener('telemarketing',function(valores) {
      console.log('voltou para o telemarketing');
      console.log(valores);
      let body = valores.body;
      window.parent.dados4modulo.removeListener('telemarketing');
      if (body.erro || (body.mensagem && body.mensagem.length>0))
      {
         console.log(body.mensagem);var msg = '';for (var i in body.mensagem) msg += '<span class="formok">'+body.mensagem[i]+'</span>';alert(msg);
         var url = new String(location.href);
         var divisao = url.split("?");
         var aux = new String(divisao[1]);
         var aux3 = aux.split("&");
         var aux4 = new String(aux3[0]);
         var aux2 = aux4.split("=");
         var iframe = aux2[1];
         window.parent.focodiv(iframe);
         return false;
      }
      if (!body.erro && formAtual=='cotacao')
      {
         setTimeout(function(){
            window.parent.dados4modulo.dado = {modulo:'mensageiro',retornopara:'telemarketing',acao:'preenchermensagem',textomensagem:'teste de preenchimento'};
         },1000);
      }
   });
   console.log('alterando dado');
   //telefone:telefoneativo,empresa:linha.getAttribute('data-empresa'),limite:20,ordem:'temporal DESC',marcarlida:configuracao['marcarlida']
   window.parent.dados4modulo.dado = dadosmensagem;

   //window.parent.dados4modulo.dado = {modulo:'mensageiro',acao:'busca',busca:{portelefone:buscatelefone}};
   //window.parent.dados4modulo['mensageiro'] = {acao:'busca',busca:{portelefone:buscatelefone}};
   console.log('exibindo atividide');
   window.parent.exibirAtividade('mensageiro');
   /*
   var arquivo = window.location.pathname.replace('/Sistema/Modulos/','').replace('RH.php','')+'Pessoa.php';
   var nome = arquivo.substr(0,4)+'Pessoa';
   var opt = "candidato="+img.parentNode.parentNode.getAttribute('data-candidato')+"&acao=exibir";
   if (!window.parent.getJanelaAberta(nome)) window.parent.abrirJanelaOpt(nome,arquivo,opt);
   else window.parent.callFuncaoJanela(nome,arquivo,'buscaDadosURL','https://enter8.com.br?'+opt);*/
}
function adicionarTermo(linha)
{
   linha.style.display = 'none';
   var novalinha = document.createElement("div");
   novalinha.innerHTML = linha.innerHTML;
   novalinha.onclick = function (event) { var e = event; var target = e.target || e.srcElement;removerTermo(target);}
   document.getElementById('listapadraoatrocar').appendChild(novalinha);
}
function removerTermo(linha)
{
   var listalinha = document.getElementById('listapadraocampo').children;
   for (var i=0,j=listalinha.length;i<j;i++)
   {
      if (listalinha[i].innerHTML==linha.innerHTML) listalinha[i].style.display = 'block';
   }
   linha.parentNode.removeChild(linha);
}
function gravarTermo()
{
   var novoDado = '<div class="titulo">Confirme a alteraÃ§Ã£o</div><div class="titulo">A operaÃ§Ã£o nÃ£o poderÃ¡ ser desfeita.</div><div class="titulo">Novo Termo:'+document.getElementById('novotermopadrao').value+'</div><div class="linhacentro"></div><form id="formconfirmapadrao" onsubmit="return false;"><div class="linhacentro"><input name="senhaEnter8" type="password" autofocus="autofocus" spellcheck="false" value="" placeholder="Senha" onkeydown="if(event.keyCode==13) return confirmarGravarTermpo();"/></div></form><div class="linhacentro"></div><div class="linhacentro"><div class="espaco"><input type="button"  value="Cancelar" class="botaoN" onclick="fechaAlert();"/></div><div class="espaco"><input type="button"  value="Gravar" class="botaoN" data-key="adiciona" onclick="confirmarGravarTermpo();"/></div></div>';
      solicitaDado(novoDado);
      document.forms['formconfirmapadrao']['senhaEnter8'].select();
}
function confirmarGravarTermpo()
{
   if(document.forms['formconfirmapadrao']['senhaEnter8'].value=='') {alertTempo('Senha vazia',2000);return false;}
   var valores = {};
   if(!document.forms['formpadronizacao']['p']){var p = document.createElement("input");document.forms['formpadronizacao'].appendChild(p);p.name = "p";p.type = "hidden";}
   else var p = document.forms['formpadronizacao']['p'];
   p.value = parent.hex_sha512(document.forms['formconfirmapadrao']['senhaEnter8'].value);
   document.forms['formconfirmapadrao']['senhaEnter8'].value = "";

   valores['novotermo'] = document.getElementById('novotermopadrao').value;
   valores['lista'] = {};
   document.forms['formconfirmapadrao']['senhaEnter8'].value = "";

   var listalinha = document.getElementById('listapadraoatrocar').children;
   for (var i=0,j=listalinha.length;i<j;i++)
   {
      valores['lista'][i] = listalinha[i].innerHTML;
   }
   xajax_padronizaTermo('novo',xajax.getFormValues('formpadronizacao'),valores);
   fechaAlert();
}
function filtrarCliente(campo,tecla)
{
   if((tecla<37 || tecla>40) && tecla!=0 && tecla!=17 && tecla!=18 && tecla!=20){exibirClienteLista('','');};
}
function exibirClienteLista(itemordem,ordem){xajax_exibeListaCliente(itemordem,ordem,document.getElementById('optlistaprecliente').value,document.getElementById('dadolistaprecliente').value);}
function exibirProximoCliente(proximo)
{
   var cliente = document.getElementById('id_precliente').value;
   if (cliente!='' && cliente!='0')
   {
      xajax_proximoCliente(proximo, cliente,document.getElementById('optlistaprecliente').value,document.getElementById('dadolistaprecliente').value);
      if(document.getElementById('divformvotopesquisa').style.display!='none') buscarPesquisa();
   }
}
function defineClientesSelecionados(selecionado)
{
   if(selecionado) xajax_defineClientesSelecionados(1);
   else xajax_defineClientesSelecionados(0);
}
function editarCliente()
{
   var divcidade = document.getElementById('adicionarCliente');
   if(divcidade.innerHTML=='') setTimeout('editarCliente()',500);
   else if(document.getElementById('id_precliente').value!='0') xajax_editaCliente(document.getElementById('id_precliente').value);
}
function buscaCliente(campo, tecla){xajax_editaCliente(campo.value);}
function buscaListaConf(campo, tecla)
{
   if((tecla<37 || tecla>40) && tecla!=0 && tecla!=17 && tecla!=18 && tecla!=20)
   {
      var valor = campo.value;
      if(valor.length>0)
      {
         var tipo = campo.id.substr(5);
         var elementos = document.getElementById('divconf'+tipo).childNodes;
         var nomediv, valorbusca;
         var numero = 0;
         var encontrado = 0;
         valorbusca = valor.toLowerCase();
         for (var i=0;i<elementos.length-1 && numero<valorbusca.length;i++)
         {
            if (elementos[i].type=='hidden') continue;
            nomediv = elementos[i].id.substr(4+tipo.length).toLowerCase();
            while(numero<valorbusca.length)
            {
               encontrado = nomediv.charAt(numero).localeCompare(valorbusca.charAt(numero));
               if (encontrado>=0)
               {
                  document.getElementById('divconf'+tipo).scrollTop = elementos[i].offsetTop-document.getElementById('divconf'+tipo).offsetTop;
                  numero++;
               }
               else break;
            }
            if(numero>valorbusca.length) break;
         }
      }
   }
}
function selecionarLocal(tipo, valor, valorb)
{
   if (typeof tipo == 'object')
   {
         valor = tipo.id.substr(5);
         tipo = tipo.id.substr(4,1);
         if(tipo=='B') valorb = document.getElementById('selecionadoA').value;
   }
   var selecionado = document.getElementById('selecionado'+tipo);
   if (selecionado!=null)
   {
      if (selecionado.value.indexOf('|'+valor+'|')!=-1 || selecionado.value.substr(0,valor.length)==valor)
      {
         document.getElementById('conf'+tipo+valor).style.backgroundColor = "";
         selecionado.value = selecionado.value.replace(valor+"|","");
      }
      else
      {
         if(document.getElementById('conf'+tipo+valor))
         {
            document.getElementById('conf'+tipo+valor).style.backgroundColor = "#ffcd6b";
            selecionado.value = selecionado.value + valor+"|";
         }
         else parent.debug('Erro:'+tipo+valor);
      }
      if (tipo=='A' || tipo=='B')
      {
         /*Se somente um estiver selecionado, buscando detalhes, se nÃ£o limpando valores*/
         var count = selecionado.value.match(/\|/g);
         if (count!=null && count.length==1)
         {
            if(tipo=='A')
            {
               document.getElementById('divconfC').innerHTML = '';
               xajax_exibeLocal('B',selecionado.value,valorb);
            }
            else xajax_exibeLocal('C',selecionado.value,valorb);
         }
         else
         {
            if(tipo=='A') document.getElementById('divconfB').innerHTML = '';
            document.getElementById('divconfC').innerHTML = '';
         }
      }
   }
   else setTimeout("selecionarLocal('"+tipo+"', '"+valor+"','"+valorb+"')",500);
}
function selecionarItem(tipo, valor)
{
   if (typeof tipo == 'object')
   {
      valor = tipo.id.substr(5);
      tipo = tipo.id.substr(4,1);
   }
   var selecionado = document.getElementById('selecionado'+tipo);
   if (selecionado!=null)
   {
      if (selecionado.value.indexOf('|'+valor+'|')!=-1 || selecionado.value.substr(0,valor.length)==valor)
      {
         document.getElementById('conf'+tipo+valor).style.backgroundColor = "";
         selecionado.value = selecionado.value.replace(valor+"|","");
      }
      else
      {
         if (document.getElementById('conf'+tipo+valor))
         {
            document.getElementById('conf'+tipo+valor).style.backgroundColor = "#ffcd6b";
            selecionado.value = selecionado.value + valor+"|";
         }
      }
   }
   else setTimeout("selecionarItem('"+tipo+"', '"+valor+"')",500);
}
function selecionarTodosGrupo(letra)
{
   var i,j,lista = document.getElementById('divconf'+letra).children;
   for (i=1,j=lista.length;i<j;i++)
   {
      if(lista[i].style.backgroundColor=="") selecionarItem(lista[i]);
   }
}
function exibeTipoGrupo(valor){xajax_exibeTipoGrupo(valor);}
function verDetalhesCli()
{
   var cliente = document.getElementById('id_precliente').value;
   if(cliente!=0 && cliente!='') xajax_verDetalhesCli(cliente);
}
function contatoCliente(sid,nome)
{
   document.getElementById('precliente').value = nome;
   document.getElementById('id_precliente').value = sid;
   xajax_exibirHistorico(sid,'');
   limpaLigacao();
   document.getElementById('barraCliContato').style.display = 'none';
   if(document.getElementById('divformvotopesquisa').style.display=='block') buscarPesquisa();
}
function agendarLigacao(){xajax_agendaLigacao(xajax.getFormValues("formaddAgendamento"),document.getElementById('id_precliente').value);}
function salvarContato(){xajax_salvaContato(xajax.getFormValues("formadicionarContato"));}
function alterarContato(texto,id)
{
   var altura = parseInt(getJanela('altura'))-100,largura = parseInt(getJanela('largura'))-100;
   var html = `<div class="estrutura" style="width:`+largura+`px;height:`+altura+`px;" id="htmlnovovalor"><form id="formhtmlnovovalor" onsubmit="return false;"><textarea style="width:`+(largura-50)+`px;height:`+(altura-60)+`px;" name="novovalor">`+texto+`</textarea><div class="linhacentro"><div class="espaco"><button class="botaop" onclick="xajax_salvaContato(xajax.getFormValues(this.form.id),`+id+`);">Gravar</button></div><div class="espaco"><button class="botaop" onclick="fecharsolicitaDado();">Cancelar</button></div></div></form></div>`;
   solicitaDado(html);
}
function listarPreCliente(campo,tecla,opt)
{
   if((tecla<37 || tecla>40) && tecla!=0 && tecla!=17 && tecla!=18 && tecla!=20)
   {
      var posicaocampo = campo.getBoundingClientRect()
      document.getElementById('spanlista').style.top = (posicaocampo['top']+posicaocampo['height']+3)+'px';
      document.getElementById('spanlista').style.left = (posicaocampo['left'])+'px';
      document.getElementById('spanlista').style.width = (posicaocampo['width']-3)+'px';
      document.getElementById('spanlista').style.display = 'block';
      xajax_listaPreCliente(campo.name,campo.value,opt);
   }
}
function listarRamoAtividade(campo,tecla,opt){if(tecla>40 || tecla<37) xajax_listaRamoAtividade(campo.name,campo.value);}
function editarPermissao(permissao)
{
   if (permissaoselecionada!='') document.getElementById('perm'+permissaoselecionada).style.backgroundColor='';
   permissaoselecionada = permissao;
   xajax_listadeUsuario(permissao);
   document.getElementById('perm'+permissao).style.backgroundColor='#fffc9e';
}
function limparCotacao(verdade){if (verdade) { xajax_limpaCotacao(); }}
function exibirCotacao(numero,pagina,cont,opcao)
{
   exibeSubForm('diveditarCotacao');
   if(document.getElementById('diveditarCotacao').innerHTML=='') setTimeout('exibirCotacao('+numero+','+pagina+','+cont+')',500);
   else
   {
      if(!opcao)
      {
         cotacaoPagina = pagina;
         cotacaoCont = cont;
         cotacaoFim = 0;
         xajax_exibeCotacao(numero);
      }
      else if (cotacaoFim!=opcao)
      {
         cotacaoFim = opcao;
         xajax_listaCotacao(xajax.getFormValues('formlistacotacao'),formAtual,[opcao,document.forms['formalteracotacao']['numerocotacao'].value,cotacaoPagina,cotacaoCont],Ordem[formAtual]);
      }
   }
}
function observacaoCotacao(idobservacao)
{
   if (document.getElementById(idobservacao).style.visibility=='hidden') document.getElementById(idobservacao).style.visibility = 'visible';
   else document.getElementById(idobservacao).style.visibility = 'hidden';
}
function buscarPesquisa(opcao)
{
   if (formAtual=='listaPesquisa')
   {
      if(subFormAtual()=='divpesquisa') xajax_buscaPesquisa(xajax.getFormValues('form'+formAtual), formAtual);
      else xajax_buscaPesquisa(xajax.getFormValues('form'+formAtual), formAtual,document.forms['formnovapesquisa']["numeropesquisa"].value,opcao);
   }
   else xajax_buscaPesquisa('',formAtual,document.forms['formvotopesquisa']["numeropesquisa"].value,opcao);
}
function buscarPesquisa2(campo, tecla,Vnome){if ((tecla<37 || tecla>40) && tecla!=0 && tecla!=17 && tecla!=18 && tecla!=20){buscarPesquisa();}}
function salvarPesquisa(){xajax_salvaPesquisa(document.forms['formnovapesquisa']["numeropesquisa"].value,xajax.getFormValues('formnovapesquisa'),formAtual);}
function exibirPesquisa(numero)
{
   if (formAtual=='listaPesquisa')
   {
      if(document.getElementById('divadicionarPesquisa').innerHTML=='')
      {
         exibeSubForm('divadicionarPesquisa');
         setTimeout('exibirPesquisa('+numero+')',500);
      }
      else
      {
         exibeSubForm('divadicionarPesquisa');
         var numeropesquisa = document.forms['formnovapesquisa']["numeropesquisa"];
         if(numeropesquisa.value!=numero)
         {
            limparPesquisa();
         }

         if(numero!='0' && numero!='')
         {
            xajax_exibePesquisa(numero,formAtual);
            numeropesquisa.value = numero;
         }
      }
   }
   else if (formAtual=='adicionarContato')
   {
      xajax_exibePesquisa(numero,formAtual,document.getElementById('id_precliente').value);
   }
}
function selecionarVoto(linha)
{
   var divs = linha.children;
   var input = divs[0].children;
   if (input[0].type=='checkbox' || input[0].type=='radio')
   {
      if (input[0].checked) input[0].checked = false;
      else input[0].checked = true;
   }
}
function salvarVoto(){xajax_salvaPesquisa(document.getElementById('id_precliente').value,xajax.getFormValues('formvotopesquisa'),formAtual);}
function salvarResposta()
{
   if (formAtual=='adicionarContato')
   {
      xajax_salvaPesquisa(document.forms['formvotopesquisa']["numeropesquisa"].value,'',formAtual,xajax.getFormValues('formvotopesquisa'));
   }
   else if (formAtual=='listaPesquisa')
   {
      xajax_salvaPesquisa(document.forms['formnovapesquisa']["numeropesquisa"].value,xajax.getFormValues('formnovapesquisa'),formAtual,xajax.getFormValues('formnovaresposta'));
   }
}
function editarResposta(linha)
{
   var divs = linha.children;
   document.forms['formnovaresposta']["resposta"].value = divs[0].innerHTML;
   document.forms['formnovaresposta']["posicao"].value = divs[1].innerHTML;
   document.forms['formnovaresposta']["valor"].value = divs[2].innerHTML;
}
function limparPesquisa()
{
   limpaForm('formnovaresposta');
   limpaForm('formnovapesquisa');
   document.getElementById('listadeResposta').innerHTML='';
   document.forms['formnovapesquisa']["multiplaescolha"].value = '0';
   document.forms['formnovapesquisa']["novaresposta"].value = '0';
   document.forms['formnovapesquisa']["status"].value = '0';
}
function adicionarDataFiltro()
{
   if (formAtual=='cotacao') var form = 'listacotacao';
   else return false;

   var opcao = document.forms['form'+form]['opcaobusca'].value;
   var datainicio = document.forms['form'+form]['datainicio'].value;
   var datafinal = document.forms['form'+form]['datafinal'].value,novocampo='';
   if (!document.forms['form'+form]['datafiltro'+opcao]) novocampo = '<input type="hidden" name="datafiltro'+opcao+'" value="'+datainicio+'[ENTER8]'+datafinal+'" />';
   else document.forms['form'+form]['datafiltro'+opcao].value = datainicio+'[ENTER8]'+datafinal;
   var spanadicionado = document.getElementById('filtroadicionado'+form);
   if (spanadicionado.innerHTML.indexOf(opcao)==-1) spanadicionado.innerHTML = '<span class="formok" onclick="this.parentNode.removeChild(this);setPagina(0);buscarLista();">'+opcao+':'+datainicio+'-'+datafinal+novocampo+'</span>'+spanadicionado.innerHTML.replace('&nbsp;','');
   else
   {
      var exp = new RegExp(opcao+':[0-9\/]+-[0-9\/]+<','gi');
      spanadicionado.innerHTML = spanadicionado.innerHTML.replace(exp,opcao+':'+datainicio+'-'+datafinal+'<');
   }
}
function atualizarLista()
{
   if (formAtual=='cotacao')
   {
      exibeOpcao('clientecotacao','Cliente');
      var databusca = window.parent.getData('data');
      document.forms['formlistacotacao']['datainicio'].value = databusca;
      document.forms['formlistacotacao']['datafinal'].value = databusca;
      document.forms['formlistacotacao']['clientecotacao'].value = '';
      document.forms['formlistacotacao']['id_clientecotacao'].value = '';
      document.forms['formlistacotacao']['usuariocotacao'].value = '';
      document.forms['formlistacotacao']['id_usuariocotacao'].value = '';
      document.forms['formlistacotacao']['dadobusca'].value = '';
      setPagina(0);
      buscarLista();
   }
   if (formAtual=='listaPesquisa')
   {
      exibeOpcao('outrabuscapesquisa','Nome');
      var databusca = window.parent.getData('data');
      document.forms['form'+formAtual]['datainicio'].value = databusca;
      document.forms['form'+formAtual]['datafinal'].value = databusca;
      document.getElementById('outrabuscapesquisa').value = '';
      xajax_buscaPesquisa(xajax.getFormValues('form'+formAtual),formAtual);
   }
   if (formAtual=='relatorio')
   {
      exibeOpcao('usuario','UsuÃ¡rio');
      var databusca = window.parent.getData('data');
      document.forms['formrelatoriocontato']['datainicio'].value = databusca;
      document.forms['formrelatoriocontato']['datafinal'].value = databusca;
      document.getElementById('clienteb').value = '';
      listarContato();
   }
   if (formAtual=='listadecliente')
   {
      exibeOpcao('dadobuscacliente','Fantasia');
      setPagina(0);
      buscarLista();
   }
   if (formAtual=='relatorioligacao')
   {
      var databusca = window.parent.getData('data');
      document.forms['formrelatorioligacao']['datainicio'].value = databusca;
      document.forms['formrelatorioligacao']['datafinal'].value = databusca;
      document.forms['formrelatorioligacao']["modo"].value = '';
      document.getElementById('usuariol').value = '';
      document.getElementById('id_usuariol').value = '';
      relatorioLigacao();
   }
   if (formAtual=='divpadronizacao')
   {
      document.getElementById('novotermopadrao').value = '';
      document.forms['formpadronizacao']['campodesejado'].value = '0';
      xajax_padronizaTermo('lista',xajax.getFormValues('formpadronizacao'));
   }
}
function acaoCotacao(acao,dados)
{
   if (acao=='historico')
   {
      if(isNaN(document.forms['formcotacao']['id_pcliente'].value) || document.forms['formcotacao']['id_pcliente'].value=='' || document.forms['formcotacao']['id_pcliente'].value==0) {alertTempo('Escolha um cliente',3000);return false;}
      xajax_exibeCotacao(document.forms['formcotacao']['id_pcliente'].value,'historico',subFormAtual());
      return true;
   }
   else if (acao=='copiar') xajax_limpaCotacao(document.forms['formalteracotacao']['numerocotacao'].value);
   else if (acao=='fomtransportador')
   {
      var altura = parseInt(parseInt(getJanela('altura'))/3),largura = parseInt(getJanela('largura'))-180;
      var html = `<div class="estrutura" style="width:`+largura+`px;height:`+altura+`px;" id="htmlnovovalor"><form id="formcotacao" onsubmit="return false;"><div class="linha"><div class="cell1">Transportador<input type="hidden" name="numerocotacao" value="`+document.forms['formalteracotacao']['numerocotacao'].value+`" /></div><div class="blista"><input type="text" name="nome_transportador" placeholder="Digite o nome do transportador" onfocus="limparLista(this);if (this.onkeyup==null) onKeyUpHandler(this,\'listar\',400,\'listaTransportador\');" /><input type="hidden" name="transportador" value="" /></div></div><div class="linhacentro"><div class="espaco"><button class="botaop" onclick="xajax_salvaCotacao(xajax.getFormValues(this.form.id));">Gravar</button></div><div class="espaco"><button class="botaop" onclick="fecharsolicitaDado();">Cancelar</button></div></div></form></div>`;
      solicitaDado(html);
   }
   else if (acao=='exibiralteracao')
   {
      var altura = parseInt(getJanela('altura'))-110,largura = parseInt(getJanela('largura'))-40;
      var html = '<div class="estrutura" style="width:'+largura+'px;height:'+altura+'px;"><form id="formhtmlnovovalor" onsubmit="return false;"><div class="listacb"  id="htmlnovovalor"><div class="flinha"></div><div></div></div><form></div><div class="flinhacentro" id="acaohtmlnovovalor" ><button class="botaop" onclick="fecharsolicitaDado();">Fechar</button></div>';
      solicitaDado(html);
      setLista('htmlnovovalor','htmlnovovalor');
      definirAlturaLista('htmlnovovalor',[-1,147]);
      xajax_exibeCotacao(document.forms['formalteracotacao']['numerocotacao'].value,'exibiralteracao',0);
   }
}
function exibirDespesas()
{
   var divdespesa = document.getElementById('divopcoesdespesa');
   var setadespesa = document.getElementById('setadespesa');
   if (divdespesa.style.display=='block')
   {
      divdespesa.style.display = 'none';
      setadespesa.className = 'iconep right';
   }
   else
   {
      divdespesa.style.display = 'block';
      setadespesa.className = 'iconep left';
   }
}
function acaoMapa(acao,dados)
{
   if(acao=='carregar')
   {
      if (document.forms['formadicionarContato']['id_precliente'].value==0 || document.forms['formadicionarContato']['id_precliente'].value=='') {alertTempo('Escolha um cliente',3000);return false;}

      if ( !document.getElementById('modulomapa') )
      {
         construtorModulo({mapa:'Mapa'});
         setTimeout("acaoMapa('carregar');",500);
         return true;
      }


      let promessa = new Promise((resolve, reject) => {
         let resultado = carregarArquivo('GoogleMaps.js');
         if (resultado) resolve();
         else setTimeout("acaoMapa('carregar');",500);
      });

      promessa.then(() => {
            var divmapa = document.getElementById('divmapa');
            exibeFormulario('modulomapa');
            if (!divmapa) xajax_acaoMapa('carregarmapa');
            else acaoMapa('carregarpin',{cliente:document.forms['formadicionarContato']['id_precliente'].value});
         })
         .catch((excecao) => {
            console.log('Falha ao carregar o arquivo do mapa');
            console.log('ExceÃ§Ã£o lanÃ§ada:', excecao);
         });

   }
   else if(acao=='buscarproximo')
   {
      xajax_acaoMapa('buscarproximo',dados);
   }
   else if(acao=='calcularrota')
   {
      if ( !document.getElementById('rotacliente'+dados) ){alertTempo('EndereÃ§o do destino nÃ£o encontrado',3000);return false;}

      //Object { cep: "03055000", tiporua: "Rua", endereco: "SAO LEOPOLDO", cidade: "SÃ£o Paulo", endereconumero: "757", estado: "SP", bairro: "BELENZINHO", nomepais: "Brasil" }
      let origem = replaceAll('"','',dadosrota['tiporua']+' '+dadosrota['endereco']+' '+dadosrota['endereconumero']+', '+dadosrota['bairro']+', '+dadosrota['cidade']+', '+dadosrota['estado']+', '+dadosrota['cep'].substr(0,5)+'-'+dadosrota['cep'].substr(5));
      let divdestino = document.getElementById('rotacliente'+dados);
      let destino = divdestino.getAttribute('data-endereco');
      calculateAndDisplayRoute(origem,destino,[],[dadosrota['fantasia'],divdestino.getAttribute('data-fantasia')],[divdestino.getAttribute('data-sid'),0]);
   }
   else if(acao=='adicionarpin')
   {
      var endereco = replaceAll('"','',dados['tiporua']+' '+dados['endereco']+' '+dados['endereconumero']+', '+dados['bairro']+', '+dados['cidade']+', '+dados['estado']+', '+dados['cep'].substr(0,5)+'-'+dados['cep'].substr(5));

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: endereco }, function(results, status) {
         if (status === "OK") {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            var coordenadas = new google.maps.LatLng(latitude, longitude);
            var marcador = new google.maps.Marker({
               position: coordenadas,
               map: GMMapa,
               title: endereco
            });
         } else  alert("O endereÃ§o nÃ£o pÃ´de ser encontrado devido a: " + status);
      });
      if ( !document.getElementById('rotacliente'+dados['sid']) )
      {
         var novodiv = document.createElement("div");
         novodiv.setAttribute("id",'rotacliente'+dados['sid']);
         novodiv.className = 'linha linhalista';
         novodiv.setAttribute('data-endereco',endereco);
         novodiv.setAttribute('data-sid',dados['sid']);
         novodiv.setAttribute('data-fantasia',replaceAll('"','',dados['fantasia']));
         novodiv.innerHTML = dados['fantasia']+'<span class="formok f10">'+endereco+`</span><span class="formok" id="rotaclientestatus`+dados['sid']+`"><button class="botaop" onclick="acaoMapa('calcularrota',`+dados['sid']+`);">Calcular Rota</button></span><span class="formok mtop5""><button class="botaop" onclick="acaoMapa('buscarproximo',[`+dados['sid']+`,0]);">PrÃ³ximos</button></span>`;
         document.getElementById('divmapadetalhe').appendChild(novodiv);
      }
   }
   else if(acao=='carregarpin') xajax_acaoMapa('carregarpin',dados);
   else if(acao=='dadosrota') dadosrota = dados;
   else if(acao=='carregarmapa')
   {
      if (typeof initMap==='function')
      {
         opcaodeRota['divresumo'] = '';
         opcaodeRota['divkeydistancia'] = 'rotaclientestatus';
         var novodiv = document.createElement("div");
         novodiv.setAttribute("id",'divmapa');
         novodiv.className = 'w900 h520 cb corl';
         novodiv.setAttribute("style",'position:absolute;left:0px;top:0px;overflow:hidden;');
         var html = '<div class="flinhacentro" id="funcaomapa"><button class="botaop" onclick="exibeFormulario(formUltimo);">Voltar</button></div><div id="map" style="height:495px;float:left;width:100%;">Aguarde, carregando...</div><div id="dadosmapa" style="display:none;"></div>';
         novodiv.innerHTML = html;
         document.getElementById('modulomapa').appendChild(novodiv);
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = "https://maps.googleapis.com/maps/api/js?key="+dados['keyGoogleMaps']+"&callback=initMap&language=pt-BR";
         document.getElementById('funcaomapa').appendChild(script);
         novodiv = document.createElement("div");
         novodiv.setAttribute("id",'divmapadetalhe');
         novodiv.className = 'w300 cb corl';
         novodiv.setAttribute("style",'position:absolute;height:510px;left:900px;overflow:auto;z-index:5;');
         html = '';
         novodiv.innerHTML = html;
         document.getElementById('modulomapa').appendChild(novodiv);
         divmapa = document.getElementById('divmapa');
         setTimeout(function(){acaoMapa('carregarpin',{cliente:document.forms['formadicionarContato']['id_precliente'].value})},1000);
      }
      else setTimeout(function(novaacao,novodado){acaoMapa(novaacao,novodado);},500,acao,dados);
   }
}
function imprimir(select)
{
   if (typeof select=='object')
   {
      var opcao = select.value;
      select.value = '';
   }
   else opcao = select;

   if(formAtual=='cotacao' && opcao=='listaproduto')
   {
      if (Pagina[formAtual]!=-1)
      {
         buscarLista();
         if (fechaTempo==0) alertTempo('Carregando lista, aguarde...',10000);
         setTimeout('imprimir(\''+opcao+'\')',200);
         return true;
      }
      else
      {
         alertTempo('Gerando arquivo, aguarde...',50000);
         setTimeout(function (){
            var lista = document.getElementById('listaCotacao').children,i,j,listacotacao=[];
            for(i=0,j=lista.length;i<j;i++)
            {
               if (lista[i].getAttribute('data-numero'))
               {
                  listacotacao.push(lista[i].getAttribute('data-numero'));
               }
            }
            xajax_imprimeHTML('listaproduto',listacotacao);
         },100);
      }
   }
}
function executaFuncoes(select,Vid,Vnome)
{
   if (typeof select=='object')
   {
      var campo = select.parentNode.id.substr(6);
      var Vid = select.value;
      var Vnome =  select.innerHTML;
      var formid = select.parentNode.parentNode.getAttribute('data-formulario');
   }
   else
   {
      var campo = select;
      var formid = document.getElementById('spanlista').getAttribute('data-formulario');
   }


   if(document.forms[formid][campo].nextSibling && document.forms[formid][campo].nextSibling.tagName.toUpperCase()=='INPUT' && document.forms[formid][campo].nextSibling.type.toUpperCase()=='HIDDEN' ) document.forms[formid][campo].nextSibling.value = Vid;
   if (typeof Vnome=='object') document.forms[formid][campo].value = Vnome[Object.keys(Vnome)[1]];
   else document.forms[formid][campo].value = Vnome;
   console.log(campo);

   if(campo=='precliente')
   {
      document.getElementById('divformvotopesquisa').style.display = 'none';
      limpaLigacao();
      xajax_exibirHistorico(Vid,'');
   }
   else if(campo=='clienteb')
   {
      stringdeBusca = " AND C.`cliente`='"+Vid+"'";
      listarContato();
   }
   else if(campo=='usuario')
   {
      stringdeBusca = "  AND `usuario`='"+Vid+"'";
      listarContato();
   }
   else if(campo=='usuariol')
   {
      relatorioLigacao();
   }
   else if(campo=='ramodeatividade'){/*Nenhuma atividade*/}
   else if(campo=='usuarioteleconf')
   {
      if (permissaoselecionada!='') xajax_salvaPermissao(permissaoselecionada, Vid);
   }
   else if(campo=='usuarioconfgrupo') adicionarNome(Vid, Vnome,'userconfgrupoadded','nomeUserConfadded');
   else if(campo.substr(0,15)=='usuariovendedor')
   {
      if(formAtual!='listadecliente') adicionarNome(Vid, Vnome,'vendedor', 'userAdded');
      else {preencheForm('formbuscacliente',{usuariovendedor:Vnome,id_usuariovendedor:Vid});setPagina(0);buscarLista();}
   }
   else if(campo=='pproduto') xajax_preencheProduto(Vid,'formpedido');
   else if(campo=='pcliente') xajax_sessionCliente(Vid,'cotacao');
   else if(campo=='pprodutonovo') xajax_preencheProduto(Vid,'novoproduto',document.getElementById('novocliente').value,'novo');
   else if(campo=='clientecotacao' || campo=='usuariocotacao' || campo.indexOf('transportadorcotacao')!=-1) buscarLista2('',13,'');
   else if (campo=='uservendcot') xajax_salvaCotacao(xajax.getFormValues('formalteracotacao'),'');
   apagaListas();
}