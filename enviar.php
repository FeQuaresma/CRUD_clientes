<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 100');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Empresa, Usuario, Empresaenter8, Codigo, cache, mode, Ispost');
header('Cache-Control: no-cache');
header('Content-Type: application/json');
//header('Content-Type: application/json,application/x-www-form-urlencoded');

require_once './BancodeDados.php';
require_once './Contato.php';
require_once './geral.php';

$retorno = array('erro'=>0,'mensagem'=>array());
$header = getallheaders();

$bancodedados = new BancodeDados($dadosBD);
$validaUsuario = validaUsuario($bancodedados,$header);

if ( (int)$validaUsuario['erro']===0 )
{
   $numeroEmpresa = $validaUsuario['empresa'];
   $numeroUsuario = $validaUsuario['usuario'];
   $numerempresaenter8 = $validaUsuario['empresaenter8'];

   if ( !isset($header['Ispost']) || (int)$header['Ispost']===0 )
   {
      $data = file_get_contents("php://input");
      $event = json_decode($data, true);
   }
   else
   {
      $data = 'REQUEST';
      $event = $_REQUEST;
   }
   if ( !isset($event['to']) )
   {
      $retorno['erro'] = 1;
      $retorno['mensagem'][] = 'Destinatário não encontrado';
      arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
      $retorno['headernoenvio'] = $header;
   }
   elseif ( !isset($event['mensagem']) )
   {
      $retorno['erro'] = 1;
      $retorno['mensagem'][] = 'Dados da mensagem não encontrados';
      arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
   }
   elseif ( !isset($event['empresa']) || !is_numeric($event['empresa']) )
   {
      $retorno['erro'] = 1;
      $retorno['mensagem'][] = 'Número da empresa remetente não encontrado';
      $retorno['header'] = $event;
      arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
   }
   else
   {
      /*Número da empresa que está enviando a mensagem */
      $numeroBuscaEmpresa = $event['empresa'];
   }
   /*Se o evento for para carregar o arquivo*/
   if ( $event['mensagem']=='[ENTER8]ARQUIVO[ENTER8]' && isset($event['nomearquivo']) )
   {
      $dirEmpresa = './Empresa'.$numeroBuscaEmpresa.'/';
      if ( !is_dir($dirEmpresa) )
      {
         if ( !mkdir($dirEmpresa,0775 ) )
         {
            $retorno['erro'] = 1;
            $retorno['mensagem'][] ='Erro ao criar diretório da empresa';
            echo json_encode($retorno);
            exit;
         }
         chmod($dirEmpresa,0775);
      }
      if ( !is_dir($dirEmpresa.'Temp/') )
      {
         if ( !mkdir($dirEmpresa.'Temp/',0775 ) )
         {
            $retorno['erro'] = 1;
            $retorno['mensagem'][] ='Erro ao criar diretório temporário da empresa';
            echo json_encode($retorno);
            exit;
         }
         chmod($dirEmpresa.'Temp/',0775);
      }

      $retorno['arquivo'] = array();

      foreach($_FILES as $arquivo)
      {
         $novoNome = geraString(65);

         $retorno['info'] = $arquivo;
         $aux = explode('.',$arquivo["name"]);
         $extensao = array_pop($aux);
         if ( !move_uploaded_file($arquivo["tmp_name"],$dirEmpresa.'Temp/'.$novoNome.'.'.$extensao) )
         {
            $retorno['erro'] = 1;
            $retorno['mensagem'][] ='Erro ao mover arquivo temporário da empresa';
            echo json_encode($retorno);
            exit;
         }
         chmod ($dirEmpresa.'Temp/'.$novoNome.'.'.$extensao, 0775);
         $retorno['arquivo'][$arquivo['name']] = array('nometemporario'=>$novoNome.'.'.$extensao,'type'=>$arquivo['type']);
      }

      echo json_encode($retorno);
      exit;
   }

   if ( $retorno['erro']===0 )
   {
      /*Definindo as permissões do usuário Leitura + resposta + iniciar*/
      $lerTodasMensagens = $validaUsuario['lerTodasMensagens'];
      $responderTodasMensagens = $validaUsuario['responderTodasMensagens'];
      $iniciarMensagens = $validaUsuario['iniciarMensagens'];

      $resultBusca = $bancodedados->query("SELECT * FROM `empresaapi` WHERE `numero`='".$numeroBuscaEmpresa."' LIMIT 1");
      if ( $bancodedados->errno!=0 || $bancodedados->affected_rows==0 )
      {
         $retorno['erro'] = 1;
         $retorno['mensagem'][] ='Erro ao buscar empresa';
         $bancodedados->debugErroSQL('index.php',"SELECT * FROM `empresaapi` WHERE `numero`='".$numeroBuscaEmpresa."' LIMIT 1");
         arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
      }
      else
      {
         $dadosEmpresa = $resultBusca->fetch_assoc();

         /*Envio de mensagem
            positus => Chave de API = Valor Hook
         */
         if ( $dadosEmpresa['tipoapi']=='zenvia' ) $url = 'https://api.zenvia.com/v2/channels/whatsapp/messages';
         elseif ( $dadosEmpresa['tipoapi']=='positus' ) $url = 'https://api.positus.global/v2/whatsapp/numbers/'.$dadosEmpresa['valorhook'].'/messages';
         elseif ( $dadosEmpresa['tipoapi']=='sandboxpositus' ) $url = 'https://api.positus.global/v2/sandbox/whatsapp/numbers/'.$dadosEmpresa['valorhook'].'/messages';
         else
         {
            $retorno['erro'] = 1;
            $retorno['mensagem'][] = 'Tipo de API não encontrado';
         }
         if ( !isset($event['mensagem']['type'])   )
         {
            $retorno['erro'] = 1;
            $retorno['mensagem'][] = 'Tipo de envio ausente';
            $retorno['header'] = $event;
            arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
         }

         if ( (int)$retorno['erro']===0 )
         {

            $handle = curl_init($url);

            /*Erro de envio com + na frente */
            //$data = array('from'=>$dadosEmpresa['telefone'],'to'=>'+'.$event['to']);
            $data = array('from'=>$dadosEmpresa['telefone'],'to'=>$event['to']);
            /*Retonar os dados de remetente, destinario e empresa para saber de quem é o retorno */
            $retorno['dadosenvio'] = array('remetente'=>$dadosEmpresa['telefone'],'destinatario'=>$event['to'],'empresa'=>$dadosEmpresa['numero']);

            /*Dados que serão gravados no banco de dados*/
            $novodados = array('empresa'=>$dadosEmpresa['numero'],'usuario'=>$numeroUsuario,'empresaenter8'=>$numerempresaenter8,'remetente'=>$dadosEmpresa['telefone'],'destinatario'=>$event['to'],'tipo'=>$event['mensagem']['type']);
            $contatoParaGravar = array('empresa'=>$dadosEmpresa['numero'],'telefone'=>$event['to'],'datamovimento'=>gmdate('Y-m-d h:i:s'));
            if ( isset($event['nome']) && $event['nome']!='' ) $contatoParaGravar['nome'] = trim($event['nome']);
            if ( isset($event['cliente']) && (int)$event['cliente']!==0 && is_numeric($event['cliente']) ) $contatoParaGravar['cliente'] = $event['cliente'];
            if ( isset($event['crm']) && (int)$event['crm']!==0 && is_numeric($event['crm']) ) $contatoParaGravar['crm'] = $event['crm'];

            $contents = array('type'=>$event['mensagem']['type']);
            if ( $event['mensagem']['type']=='text' )
            {
               if ( !isset($event['mensagem']['text']) )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Texto da mensagem não encontrado';
                  arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
               }
               else
               {
                  $novodados['texto'] = $event['mensagem']['text'];
                  if ( $dadosEmpresa['tipoapi']=='zenvia') $contents['text'] = $novodados['texto'];
                  elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' ) $contents['text'] = array('body'=>$novodados['texto']);
               }
            }
            elseif ( $event['mensagem']['type']=='file' )
            {
               if ( !isset($event['mensagem']['nomereal']) )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Nome do arquivo inválido para envio';
                  arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
               }
               elseif ( !isset($event['mensagem']['nometemporario']) || !is_file('./Empresa'.$numeroBuscaEmpresa.'/Temp/'.$event['mensagem']['nometemporario']) )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Arquivo temporário não encontrado';
                  arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
               }
               elseif ( !isset($event['mensagem']['tipoarquivo']) )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Tipo do Arquivo não encontrado';
                  arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
               }
               else
               {
                  $dirEmpresa = './Empresa'.$numeroBuscaEmpresa.'/';
                  if ( !is_dir($dirEmpresa.$event['to']) )
                  {
                     if ( !mkdir($dirEmpresa.$event['to'],0775 ) )
                     {
                        $retorno['erro'] = 1;
                        $retorno['mensagem'][] ='Erro ao criar diretório do contato';
                        echo json_encode($retorno);
                        exit;
                     }
                     chmod($dirEmpresa.$event['to'],0775);
                  }

                  /*Mudando da pasta temporaria para a pasta do determinado número*/
                  if ( !copy($dirEmpresa.'Temp/'.$event['mensagem']['nometemporario'],$dirEmpresa.$event['to'].'/'.$event['mensagem']['nometemporario']) )
                  {
                     $retorno['erro'] = 1;
                     $retorno['mensagem'][] ='Erro ao mover arquivo temporário da empresa';
                     $retorno['mensagem'][] = $dirEmpresa.'Temp/'.$event['mensagem']['nometemporario'];
                     $retorno['mensagem'][] = $dirEmpresa.$event['to'].'/'.$event['mensagem']['nometemporario'];

                     echo json_encode($retorno);
                     exit;
                  }
                  else unlink($dirEmpresa.'Temp/'.$event['mensagem']['nometemporario']);

                  if ( strpos(getcwd(),'testwhatsapp')!==false ) $dirtestewhatsapp = 'testwhatsapp';
                  else $dirtestewhatsapp = 'whatsapp';

                  $novodados['fileUrl'] = 'https://www.papeis.net.br/'.$dirtestewhatsapp.'/Empresa'.$numeroBuscaEmpresa.'/'.$event['to'].'/'.$event['mensagem']['nometemporario'];

                  $novodados['fileMimeType'] = $event['mensagem']['tipoarquivo'];
                  $novodados['fileName'] = $event['mensagem']['nomereal'];
                  if ( isset($event['mensagem']['legenda']) ) $novodados['fileCaption'] = $event['mensagem']['legenda'];

                  if ( $dadosEmpresa['tipoapi']=='zenvia')
                  {
                     $contents['fileUrl'] = $novodados['fileUrl'];
                     $contents['fileMimeType'] = $novodados['fileMimeType'];
                     $contents['fileName'] = $novodados['fileName'];
                     if ( isset($novodados['fileCaption']) ) $contents['fileCaption'] = $novodados['fileCaption'];
                  }
                  elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' )
                  {
                     switch($novodados['fileMimeType'])
                     {
                        case 'image/png':
                        case 'image/jpeg':$contents['type'] = 'image';
                                       $contents['image'] = array('link'=>$novodados['fileUrl']);
                                       if ( isset($novodados['fileCaption']) ) $contents['image']['caption'] = $novodados['fileCaption'];
                           break;
                        case 'audio/acc':
                        case 'audio/mp4':
                        case 'audio/amr':
                        case 'audio/mpeg':
                        case 'audio/ogg; codecs=opus':$contents['type'] = 'audio';
                                    $contents['audio'] = array('link'=>$novodados['fileUrl']);
                           break;
                        case 'video/3gpp':
                        case 'video/mp4':$contents['type'] = 'video';
                                    $contents['video'] = array('link'=>$novodados['fileUrl']);
                                    if ( isset($novodados['fileCaption']) ) $contents['video']['caption'] = $novodados['fileCaption'];
                           break;
                        case 'application/vnd.openxml':
                        case 'application/msword':
                        case 'application/pdf':$contents['type'] = 'document';
                                       $contents['document'] = array('link'=>$novodados['fileUrl']);
                                       if ( isset($novodados['fileCaption']) ) $contents['document']['caption'] = $novodados['fileCaption'];
                                       $contents[$contents['type']]['filename'] = $novodados['fileName'];
                           break;
                     }
                  }
               }
            }
            elseif ( $event['mensagem']['type']=='template' )
            {
               $novodados['texto'] = array();

               if ( $iniciarMensagens===false )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Usuário sem permissão para iniciar conversa (template)';
                  $retorno['event'] = $event;
               }
               if ( $dadosEmpresa['tipoapi']=='zenvia')
               {
                  if ( !isset($event['mensagem']['template']) )
                  {
                     $retorno['erro'] = 1;
                     $retorno['mensagem'][] = 'ID do template não encontrado';
                     $retorno['event'] = $event;
                  }
                  else
                  {
                     $novodados['texto']['templateId'] = $event['mensagem']['template'];
                     $contents['templateId'] = $novodados['texto']['templateId'];
                  }
               }
               elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' )
               {
                  if ( !isset($event['mensagem']['name']) )
                  {
                     $retorno['erro'] = 1;
                     $retorno['mensagem'][] = 'Name do template não encontrado';
                     $retorno['event'] = $event;
                  }
                  else
                  {
                     $novodados['texto']['namespace'] = $dadosEmpresa['namespace'];
                     $novodados['texto']['name'] = $event['mensagem']['name'];
                     $contents['template'] = array('namespace'=>$dadosEmpresa['namespace'],'name'=>$event['mensagem']['name'],'language'=>array('policy'=>'deterministic','code'=>'pt_BR'));
                  }
               }
               if ( !isset($event['mensagem']['mensagem']) )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Texto da mensagem do template não encontrado';
                  $retorno['event'] = $event;
               }
               else $novodados['texto']['mensagem'] = $event['mensagem']['mensagem'];
               if ( (int)$retorno['erro']===0  )
               {
                  if ( isset($event['mensagem']['campo']) && is_array($event['mensagem']['campo']) && count($event['mensagem']['campo'])>0 )
                  {
                     if ( $dadosEmpresa['tipoapi']=='zenvia') $contents['fields'] = array();
                     elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' ) $contents['template']['components'] = array(array('type'=>'body','parameters'=>array()));

                     $novodados['texto']['campo'] = array();
                     foreach($event['mensagem']['campo'] as $nomecampo=>$valor)
                     {
                        if ( $dadosEmpresa['tipoapi']=='zenvia') $contents['fields'][$nomecampo] = $valor;
                        elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' ) $contents['template']['components'][0]['parameters'][] = array('type'=>'text','text'=>$valor);

                        $novodados['texto']['campo'][$nomecampo] = $valor;
                     }
                  }
                  $novodados['texto'] = serialize($novodados['texto']);
               }
            }
            elseif ( $event['mensagem']['type']=='contacts' )
            {
               if ( !isset($event['mensagem']['contacts']) )
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'Lista de contato não encontrada';
                  $retorno['event'] = $event;
               }
               else
               {
                  $novodados['texto'] = json_encode($event['mensagem']);

                  //$contents['contacts'] = array(array('name'));
                  if ( $dadosEmpresa['tipoapi']=='zenvia') $contents['contacts'] = $event['mensagem']['contacts'];
                  elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' )
                  {
                     $contents['contacts'] = array();
                     foreach($event['mensagem']['contacts'] as $itemcontato)
                     {
                        $novoContato = array();
                        $novoContato['phones'] = array();
                        foreach($itemcontato['phones'] AS $itemphones)
                        {
                           if ( isset($itemphones['waId']) )
                           {
                              $itemphones['wa_id'] = $itemphones['waId'];
                              /*Positus teve que retirar o waID pois diz que não recenhece parametro */
                              unset($itemphones['waId']);
                           }
                           $novoContato['phones'][] = $itemphones;
                        }
                        $novoContato['emails'] = $itemcontato['emails'];
                        $novoContato['name'] = array('first_name'=>$itemcontato['name']['firstName'],'formatted_name'=>$itemcontato['name']['formattedName']);
                        $contents['contacts'][] = $novoContato;
                     }
                  }
               }
            }
            else
            {
               $retorno['erro'] = 1;
               $retorno['mensagem'][] = 'Tipo da mensagem não instalado';
            }
         }
         if ( (int)$retorno['erro']===0 )
         {
            if ( $dadosEmpresa['tipoapi']=='zenvia') $data['contents'] = array($contents);
            elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' ) $data = $data + $contents;
            $encodedData = json_encode($data);

            $arrayDados =  array(
               CURLOPT_URL => $url,
               CURLOPT_RETURNTRANSFER => true,
               CURLOPT_ENCODING => "",
               CURLOPT_MAXREDIRS => 10,
               CURLOPT_TIMEOUT => 0,
               CURLOPT_FOLLOWLOCATION => true,
               CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
               CURLOPT_CUSTOMREQUEST => "POST",
            );
            if ( $dadosEmpresa['tipoapi']=='zenvia') $arrayDados[CURLOPT_HTTPHEADER] = array("X-API-TOKEN: ".$dadosEmpresa['apitoken'],'Content-Type: application/json');
            else $arrayDados[CURLOPT_HTTPHEADER] = array("Authorization: Bearer ".$dadosEmpresa['apitoken'],'Content-Type: application/json');

            curl_setopt_array($handle,$arrayDados);
            curl_setopt($handle, CURLOPT_POSTFIELDS, $encodedData);

            $resultcurl = curl_exec($handle);

            if ( $resultcurl=='' )
            {
               $retorno['erro'] = 1;
               $retorno['mensagem'][] = 'Retorno da API inválido';
               $retorno['retorno'] = $resultcurl;
               arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
            }
            else
            {
               if ( $dadosEmpresa['tipoapi']=='zenvia') $decode = json_decode($resultcurl);
               elseif ( $dadosEmpresa['tipoapi']=='positus' || $dadosEmpresa['tipoapi']=='sandboxpositus' )
               {
                  $decoderetorno = json_decode($resultcurl);
                  $decode = $decoderetorno->messages[0];
               }
               curl_close($handle);

               if ( isset($decode->id) )
               {
                  $novodados['messageid'] = $decode->id;
                  if ( isset($decode->direction) ) $novodados['direcao'] = $decode->direction;
                  else $novodados['direcao'] = 'OUT';
                  $novodados['numero'] = 0;
                  $novodados['situacao'] = 0;
                  $novodados['temporal'] = gmdate('Y-m-d H:i:s');

                  $Contato = new Contato($dadosBD,'utf8');
                  $testeok = $Contato->gravaMensagem($novodados);
                  if ( $Contato->erro || $testeok===false )
                  {
                     $retorno['erro'] = 1;
                     $retorno['mensagem'][] = 'Erro ao gravar mensagem no banco de dados';
                     $retorno['mensagem'][] = $Contato->mensagem;
                     $retorno['novodados'] = $novodados;
                     $retorno['retorno'] = $resultcurl;
                     arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
                  }

                  /*Atualizando movimento*/
                  $testeok = $Contato->gravaTabela('contato_detalhe',$contatoParaGravar);
                  if ( $Contato->erro || $testeok===false )
                  {
                     $retorno['erro'] = 1;
                     $retorno['mensagem'][] = $Contato->mensagem;
                     $retorno['hook'] = $event;
                     arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
                     echo json_encode($retorno);
                     exit;
                  }

                  $retorno['mensagem'][] = 'Mensagem enviada com sucesso ID:'.$decode->id;
                  $retorno['retorno'] = $resultcurl;
               }
               else
               {
                  $retorno['erro'] = 1;
                  $retorno['mensagem'][] = 'ID da mensagem não encontrado';
                  if ( isset($decode->code) && isset($decode->message) ) $retorno['mensagem'][] = $decode->code.'-'.$decode->message;
                  elseif ( isset($decoderetorno) && isset($decoderetorno->errors) )
                  {
                     foreach($decoderetorno->errors as $item)
                     {
                        if ( isset($item->title) ) $retorno['mensagem'][] = $item->code.'-'.$item->title.(isset($item->details)?'<br />'.$item->details:'');
                     }
                  }
                  elseif ( isset($decoderetorno) && isset($decoderetorno->message) ) $retorno['mensagem'][] = str_replace('This WhatsApp number does not exist','Número do telefone não tem Whastapp',$decoderetorno->message);

                  $retorno['retorno'] = $resultcurl;
                  $retorno['event'] = $event;
                  $retorno['data'] = $data;
                  arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". print_r($data,true));
                  arquivoErro($arquivoErro,'Arquivo:'.__FILE__.' Linha:'.__LINE__."\r\n". $resultcurl);
               }
            }
         }
      }
   }
}
else $retorno = $validaUsuario;

$retorno['resquest'] = $_REQUEST;
$retorno['horario'] = gmdate('Y-m-d H:i:s');
echo json_encode($retorno);
