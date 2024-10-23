<?php
/********************************************************************
Arquivo respons�vel pelo gerenciamento de conex�o com o banco de dados
-------------------- __construct
-------------------- conecta
-------------------- debugErroSQL
-------------------- traduzErro
********************************************************************/

class BancodeDados extends mysqli
{
   /*Endere�o do banco de dados*/
   private $hostbd;

   /*Endere�o do banco de dados*/
   private $port;

   /*Usu�rio para conex�o ao banco de dados*/
   private $usuariobd;

   /*Senha ao banco de dados*/
   private $senhabd;

   /*Nome do banco de dados desejado*/
   private $bancodedados;

   /*Vari�vel para controle de erro*/
   public $erro = false;

   /*Vari�vel para controle de conex�o*/
   public $conectado = false;

   /*Vari�vel com o motivo do erro*/
   public $mensagemerro = '';

   /*Vari�vel para retorno de lista de usu�rios utilizado em getAlteracao por exemplo*/
   public $listaUsuario='';

   /********************************************************************************************
   //Nome: __construct
   //Parametros:$bd, $user='', $password='', $host='localhost',$port='3306',$adicionarID=true
   //Fun��o: Realiza a constru��o da classe
   //Obs:
   ********************************************************************************************/
   public function __construct($bd, $user='', $password='', $host='localhost',$port='3306')
   {
      if ( is_array($bd) )
      {
  	      if ( isset($bd['nome']) && isset($bd['usuario']) && isset($bd['senha']) && isset($bd['endereco']) && isset($bd['porta']) )
  	      {
  	         $user = $bd['usuario'];
  	         $password = $bd['senha'];
  	         $host = $bd['endereco'];
  	         $port = $bd['porta'];
  	         $this->bancodedados = $bd['nome'];
  	      }
  	      else
  	      {
  	         $this->erro = true;
  	         $this->mensagemerro = '<span class="formok">Erro ao construir classe (BancodeDados), dados do banco de dados inv�lidos</span>';
  	      }
      }
      else $this->bancodedados = $bd;

      $this->hostbd = $host;
      $this->port = $port;
      $this->usuariobd = $user;
      $this->senhabd = $password;

      /*Se n�o houve erro, tentando conectar*/
      if ( !$this->erro )
      {
         try{
            mysqli_report(MYSQLI_REPORT_STRICT);
            parent::__construct($this->hostbd,$this->usuariobd, $this->senhabd, $this->bancodedados,$this->port);
         }
         catch (\Exception $e) {
            $this->erro = true;
            //$this->mensagemerro .= 'Exception:'.$e->getMessage();
         }
         if ( $this->connect_errno )
         {
            $this->erro = true;
            $this->conectado = false;
            /*Nome inv�lido*/
            if ( $this->connect_errno=='1049' ) $this->mensagemerro .= "1049 - Banco de Dados n�o existe";
            elseif ( $this->connect_errno=='1045' ) $this->mensagemerro .= "1045 - Usu�rio/Senha n�o autorizada";
            else $this->mensagemerro .= "Falha durante a conex�o";
            $this->debugErroSQL('Classes/BancodeDados.php->__construct',$this->connect_errno.'|'.$this->bancodedados.'|'.$this->usuariobd.'|'.$this->hostbd.'|'.$port);
         }
         else
         {
            $this->conectado = true;
         }
      }
   }
   /********************************************************************************************
   //Nome: conecta
   //Parametros:
   //Fun��o:Conecta com o banco de dados desejado
   //Obs:
   ********************************************************************************************/
   public function conecta()
   {
      parent::connect($this->hostbd,$this->usuariobd, $this->senhabd, $this->bancodedados);
      if ($this->connect_errno)
      {
         $this->erro = true;
         $this->mensagemerro = "Falha na conex�o:".$this->connect_error;
      }
      else
      {
         $this->conectado = true;
      }
   }
   /********************************************************************************************
   //Nome: debugErroSQL
   //Parametros:$arquivoexecucao, $sql
   //Fun��o: Realiza o controle de das execu��es SQL, salvando em arquivo para para posterior verifica��o
   //Obs:
   ********************************************************************************************/
   public function debugErroSQL($arquivoexecucao, $sql)
   {
      $arquivoSQL = './controleSQL.txt';
      $diretorio = './';

      if ( is_file($arquivoSQL) ) $fp = fopen($arquivoSQL, 'a');
      else
      {
         if ( is_dir($diretorio) ) $fp = fopen($arquivoSQL, 'x');
         else
         {
            /*se n�o encontrar o diret�rio pode ser por estar executando em um arquivo diferente da estrutura Modulo/Pedido/Pagina talvez
              com o arquivo Desktop no diret�rio /Sistema/Kernel (2 subdiret�rios somente)
              Tetando tirar 1 ../ para ver se resolve
            */
            $arquivoSQL = substr($arquivoSQL,3);
            if ( is_file($arquivoSQL) ) $fp = fopen($arquivoSQL, 'a');
            else
            {
               /*Salvando no arquivo de erro do Enter8*/
               $arquivoSQL = './/erroEnter8.txt';
               $fp = fopen($arquivoSQL, 'a');
               $escreve = fwrite($fp, "\r\n******Arquivo e diret�rio de erro n�o encontrado\r\n".$diretorio."\r\n".dirname(__FILE__));
            }
         }
      }

      /*Se o recebimento for string deixar em utf8 se n�o usar fun��o para converter em string*/
      if ( is_string($sql) ) $escreve = fwrite($fp, date('d/m/Y - H:i').'=>'.$this->bancodedados.'=>'.$arquivoexecucao.'=>'.iconv("UTF-8","UTF-8//IGNORE",utf8_encode($sql))."\r\n");
      else $escreve = fwrite($fp, date('d/m/Y - H:i').'=>'.$this->bancodedados.'=>'.$arquivoexecucao.'=>'.iconv("UTF-8","UTF-8//IGNORE",utf8_encode(print_r($sql,true)))."\r\n");

      /*Se essa classe estiver com erro (de conex�o) e tentar pegar algum desses atributos ocorrer� couldn't fetch*/
      if ( !$this->erro ) $escreve = fwrite($fp, 'Erro n�mero:'.$this->errno.' - Erro:'.$this->error."\r\n");

      fclose($fp);
      return true;
   }
   /********************************************************************************************
   //Nome: traduzErro
   //Parametros:
   //Fun��o: Traduz e retorna a tradua��o do erro do banco de dados
   //Obs:
   ********************************************************************************************/
   public function traduzErro()
   {
      if ( $this->errno!='' )
      {
         $emingles = array("in 'where clause'"
         ,"'"
         ,'Unknown column'
         ,"in field list"
         ,'You have an error in your SQL syntax; check the manual that corresponds to your'
         ,'server version for the right syntax to use near'
         ,'Column count doesn&#039;t match value count at row 1'
         ,'at line'
         ,'Column'
         ,'is ambiguous'
         ,'in where clause'
         ,'Table'
         ,"doesn&#039;t exist"
         ,'Duplicate entry'
         ,'for key');
         $emportugues = array('na busca'
         ,'&#039;'
         ,'Campo desconhecido'
         ,'nos dados selecionados'
         ,'Erro de SQL'
         ,' pr�ximo de'
         ,'Contagem de colunas/valores incorreta'
         ,'na linha'
         ,'Coluna'
         ,'� amb�guo'
         ,'na busca'
         ,'Tabela'
         ,'n�o existe'
         ,'Chave duplicada'
         ,'para coluna');
         return str_replace($emingles, $emportugues,$this->error);
      }
   }
   /********************************************************************************************
   //Nome: defineTipoCampo
   //Parametros:$Type
   //Fun��o: Recebe o Type do mysql e retorna o tipo e o tamanho
   //Obs:
   ********************************************************************************************/
   public static function defineTipoCampo($Type)
   {
      $retorno = array('tipo'=>'','tamanho'=>'');

      $tipo = substr($Type,0,7);
      if ( $tipo=='varchar' || substr($Type,0,4)=='char')
      {
         $retorno['tipo'] = 'texto';
         /*Pegando somente o que for n�mero*/
         preg_match('/[0-9]+/', $Type,$matches);
         $retorno['tamanho'] = $matches[0];
      }
      elseif ( $tipo=='text' || substr($Type,0,10)=='mediumtext' || substr($Type,0,8)=='longtext' )
      {
         $retorno['tipo'] = 'observacao';
         $retorno['tamanho'] = '65535';
         if ( $Type=='mediumtext' ) $retorno['tamanho'] = '16777215';
         elseif ( $Type=='longtext' ) $retorno['tamanho'] = '4294967295';
      }
      elseif ( $tipo=='decimal' )
      {
         $retorno['tipo'] = 'numero';
         /*Decimal = Tamanho, casas decimais*/
         preg_match('/[0-9]+\,/', $Type,$matches);
         $retorno['tamanho'] = substr($matches[0],0,-1);
         preg_match('/\,[0-9]+/', $Type,$decimal);
         if (substr($decimal[0],1)!='0') $retorno['decimal'] = substr($decimal[0],1);
         else $retorno['decimal'] = 0;

         if ( strpos($Type,'unsigned')!==false ) $retorno['tipo'] = 'numeropositivo';
      }
      elseif (substr($Type,0,3)=='int' )
      {
         $retorno['tipo'] = 'numero';
         preg_match('/[0-9]+/', $Type,$matches);
         $retorno['tamanho'] = $matches[0];
         $retorno['decimal'] = 0;
      }
      elseif ( $Type=='datetime' || $Type=='timestamp' )
      {
         /*Data completa*/
         $retorno['tipo'] = 'datahora';
         $retorno['tamanho'] = 19;
      }
      elseif ( $Type=='date')
      {
         /*Se n�o � datetime pode ser somente date*/
         $retorno['tipo'] = 'data';
         $retorno['tamanho'] = 10;
      }
      elseif ( $Type=='time' )
      {
         /*Se n�o � datetime e data pode ser somente time*/
         $retorno['tipo'] = 'hora';
         $retorno['tamanho'] = 8;
      }
      elseif ( $tipo=='tinyint' )
      {
         $retorno['tipo'] = 'status';
         $retorno['tamanho'] = 1;
      }
      elseif ( strpos($Type,'blob')!==false )
      {
         $retorno['tipo'] = 'blob';
         $retorno['tamanho'] = '65535';
         if ( $Type=='mediumblob' ) $retorno['tamanho'] = '2000000';
         elseif ( $Type=='longblob' ) $retorno['tamanho'] = '2147483648';
      }
      return $retorno;
   }
   /********************************************************************************************
   //Nome: recebeDado
   //Parametros: $tipo, $valor, $tamanho='0',$decimal='0'
   //Fun��o:  Corrige os valores de acordo com o tipo
   //Obs: � necess�rio chamar essa fun��o com o banco de dados conectado
   ********************************************************************************************/
   public function recebeDado($tipo, $valor, $tamanho='',$decimal='0')
   {
      if ( !$this->conectado )
      {
         $this->erro = true;
         $this->mensagemerro = 'Banco de dados n�o conectado para conferir dados';
         return false;
      }
      $validaDados = false;
      if ( is_array($tipo) )
      {
         if ( isset($tipo['tamanho']) ) $tamanho = $tipo['tamanho'];
         if ( isset($tipo['decimal']) ) $decimal = $tipo['decimal'];
         /*Se for para validar dados (lista de op��es) verificar se est� no formato correto*/
         if ( isset($tipo['validadado']) )
         {
            if ( strpos($tipo['validadado'],'[')!==false )
            {
               $listaValido = $this->converteComentario($tipo['validadado']);
               /*Se encontrou op��es v�lidas*/
               if ( $listaValido!==false ) $validaDados = true;
            }
         }
         $tiporecebe = $tipo['tipo'];
      }
      else $tiporecebe = $tipo;

      switch($tiporecebe)
      {
         case 'somentenumero': $novovalor = preg_replace('/[^0-9]/','',$valor);
            break;
         case 'numeropositivo':/*Removendo negativo se houver e recebendo como n�mero*/
                               $valor = str_replace('-','',$valor);
         case 'numero': $ponto = str_replace(',','.',$valor);
                        /*Se a string estiver vazia criar� um valor com 0*/
                        if ( $ponto!='' && is_numeric($ponto) )
                        {
                           if ( $tamanho!='' )
                           {
                              $parteinteira = $tamanho-$decimal;
                              $posicaodecimal = strrpos($ponto,'.');
                              if ( $posicaodecimal!==false)
                              {
                                 $novovalor = '.'.substr($ponto, $posicaodecimal+1,$decimal);
                                 $valorparteinteira = substr($ponto, 0,$posicaodecimal);
                                 $valorparteinteira = preg_replace('/[[^:alnum:]]/','',$valorparteinteira);
                                 /*Deixando -(negativo) para somente ficar com a parte menos significativa do inteiro*/
                                 $novovalor = substr($valorparteinteira, -$parteinteira).$novovalor;
                              }
                              else $novovalor = number_format(substr($ponto, -$parteinteira),$decimal ,'.','');
                           }
                           else $novovalor = $ponto;
                        }
                        else $novovalor = '0';
               break;
         case 'datahora': $novovalor = ($valor!='' ? Texto::converteData($valor,5):'');
               break;
         case 'data': $novovalor = ($valor!='' ? Texto::converteData($valor,3):'');
               break;
         case 'hora': if (strlen($valor)==5) $novovalor = Texto::converteData($valor.':00',8);
                      else $novovalor = ($valor!='' ? Texto::converteData($valor, 8):'');
               break;
         case 'status': if ( !is_numeric($valor) ) $novovalor = 0;
                        else $novovalor = $valor;
                        if ( $validaDados===true && !isset($listaValido[$novovalor]) ) { $this->erro=true;$this->mensagemerro .= '<span class="formok">Status ('.$novovalor.') n�o est� nas op��es v�lidas</span>'.$tipo['validadado'];return false;}
               break;
         default: $novovalor = $this->real_escape_string(is_null($valor)?'':$valor);
                  if ( $tamanho!='' && $tamanho>'0' && strlen($novovalor)>$tamanho ) $novovalor = substr($novovalor, 0, $tamanho);
                  if ( $validaDados===true && !isset($listaValido[$novovalor]) ) {$this->erro=true;$this->mensagemerro .= '<span class="formok">Valor ('.$novovalor.') n�o est� nas op��es v�lidas</span>'.$tipo['validadado'];return false;}
      }
      return trim($novovalor);
   }
   /********************************************************************************************
   //Nome: statusTabela
   //Parametros: $tabela
   //Fun��o: Retorna o status da determinada tabela
   //Obs:
   ********************************************************************************************/
   public function statusTabela($tabela)
   {
      if ( $this->conectado )
      {
         $retorno = array();

         if ( $tabela=='' ) $query = "SHOW TABLES";
         else
         {
            if ( is_array($tabela) ) $buscasql = "`Name` in ('".implode("','",$tabela)."')";
            else $buscasql = "`Name`='$tabela'";

            $query = "SHOW TABLE STATUS WHERE $buscasql";
         }

         $result = $this->query($query);
         /*Se encontrou erro provavelmente foi a escolha de alguma tabela n�o existente*/
         if ( $this->errno!=0 )
         {
            $this->erro = true;
            $this->mensagemerro .= 'Erro banco de dados: '.$this->traduzErro();
            $this->debugErroSQL('Classes/BancodeDados.php=>',$query);
            return false;
         }

         while($linha = $result->fetch_assoc())
         {
            if ( $tabela=='' ) $retorno[]= current($linha);
            else $retorno[$linha['Name']]= $linha;
         }

         if ( $tabela!='' && !is_array($tabela) ) return current($retorno);

         return $retorno;
      }
      else
      {
         $this->erro = true;
         $this->mensagemerro = 'Erro ao conectar ao banco de dados, logue no sistema novamente';
         return false;
      }
   }
   /********************************************************************************************
   //Nome: detalheTabela
   //Parametros: $tabela
   //Fun��o: Retorna os campos da tabela
   //Obs:
   ********************************************************************************************/
   public function detalheTabela($tabela)
   {
      if ( $this->conectado )
      {
         $retorno = array();
         if ( !is_array($tabela) ) $novaTabela = array($tabela);
         else $novaTabela = $tabela;

         foreach($novaTabela as $nomeTabela)
         {
            $result = $this->query("SHOW FULL COLUMNS from $nomeTabela");
            /*Se encontrou erro provavelmente foi a escolha de alguma tabela n�o existente*/
            if ( $this->errno!=0 )
            {
               $this->erro = true;
               $this->mensagemerro .= 'Erro banco de dados: '.$this->traduzErro();
               $this->debugErroSQL('Classes/BancodeDados.php=>',"SHOW FULL COLUMNS from $nomeTabela");
               return false;
            }

            while($linha = $result->fetch_assoc())
            {
               $retorno[$nomeTabela][$linha['Field']] = $linha;
               $retorno[$nomeTabela][$linha['Field']]['tabela'] = $nomeTabela;
            }
         }

         if ( !is_array($tabela) ) return $retorno[$tabela];

         return $retorno;
      }
      else
      {
         $this->erro = true;
         $this->mensagemerro = 'Erro ao conectar ao banco de dados, logue no sistema novamente';
         return false;
      }
   }
}
