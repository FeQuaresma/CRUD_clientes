<?php

require "./BancodeDados.php";

$bd = new BancodeDados('plotag_roundcube','usuarioroundcube','roundcubesenha','mulford.iad1-mysql-e2-10a.dreamhost.com');
if (!$bd->conectado) echo "erro ao conectar";

$result = $bd->query("SELECT * FROM `tabela` WHERE 1=1");

