<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<title>Skoma</title>
		<link rel="stylesheet" type="text/css" href="/styles/calque.css">
		<link rel="stylesheet" type="text/css" href="/p_Acceuil/acceuil.css">
		<script src="/scripts/utils.js"></script>
		<script src="/p_Acceuil/acceuil.js"></script>
		<!--<link rel="icon" type="image/png" href="/images/favicon.png" />-->
	</head>
	<body class="body_clean">
		<div class="scroll_snap">
			<div class="page_scroll_snap">
				<?php include("../header.html"); ?>
				<div class="page_scroll_snap_main">
					<p id="description">Développeur Web, Logiciel, FullStack</p>
					<button id="button_consulter" onclick="onclick_button_consulter()">Consulter</button>
				</div>
				<?php include("../footer.html"); ?>
			</div>
			<div class="page_scroll_snap">
				<div class="page_scroll_snap_main">
					<div id="presentation_conteneur">
						<div id="presentation_header">Bonjour !</div>
						<div id="presentation">Je m'appelle Lucas, j'ai 22 ans, dernièrement j'ai développé une bibliothèque permettant d'éditer dynamiquement différents objets, en y incluant notamment un gestionnaire de concurence inter-utilisateurs. Par la suite, j'ai utilisé cette bibliothèque dans sa première version pour le développement d'une application mobile.</div>
					</div>
					<div id="conteneur_boutons_menu">
						<button onclick="onclick_button_acceuil()">Acceuil</button>
						<a class="nav_item" href="/projets"><button>Projets</button></a>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
