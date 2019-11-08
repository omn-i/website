<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<title>Skoma</title>
		<link rel="stylesheet" type="text/css" href="/styles/calque.css">
		<link rel="stylesheet" type="text/css" href="/styles/ProgressBar.css">
		<link rel="stylesheet" type="text/css" href="/styles/LightBox.css">
		<link rel="stylesheet" type="text/css" href="/p_Projets/projets.css">
		<script src="/scripts/ResizeSensor.js"></script>
		<script src="/scripts/utils.js"></script>
		<script src="/scripts/ProgressBar.js"></script>
		<script src="/scripts/LightBox.js"></script>
		<script src="/p_Projets/projets.js"></script>
		<!--<link rel="icon" type="image/png" href="/images/favicon.png" />-->
	</head>
	<body>
		<div>
			<?php include("../header.html"); ?>
			<div id="main">
				<div id="main_marge_left"></div>
				<div id="contenu">
					<p class="nom_projet">Skoma</p>
					<p class="description_projet">
						Skoma est actuellement un ensemble de bibliothèque permettant d'éditer dynamiquement différents objets, en y incluant notamment un gestionnaire de concurence.<br/><br/> À l'avenir cette ensemble de bibliothèque sera transformé en un framework complet, présent sur la partie serveur comme sur la partie client. Les prochaines versions visent à minimiser au maximum le code nécessaire ainsi que les tâches redondantes. En gardant l'ensemble suffisamment modulable afin de pouvoir remplacer à tout moment, selon nos besoins, une partie par une autre.
					</p>
					<div>
						<p id="description_schema">Ensemble des plateformes supportées : <i>(les parties opaques n'existant pas actuellement)</i></p>
						<img id="img_schema" class="default_drop_shadow unselectable" src="/images/schema.png" />
					</div>
					<p id="titre_premiereVersion" class="version_number">Première version</p>
					<div class="sous_groupe">
						<div id="ProgressBar_premiereVersion" class="version_ProgressBar ProgressBar ProgressBar_warning"></div>
						<p class="extra_info_ProgressBar">terminé</p>
						<p class="problemes_titre">Principaux problèmes de cette première version</p>
						<ul class="problemes_tab">
							<li>Durée comprise entre ~0 et 2s pour que l'UI prenne en compte les actions en relation avec le serveur.</li>
							<li>Réaction indésirable avec les objets imbriqués dans d'autres lors de leur modification ou de leur suppresion.</li>
							<li>Quantité de code nécessaire non négligeable. <i>(avoir une seule déclaration de classe pour toutes plateformes et langages confondues possible ? en troisième version ?)</i></li>
						</ul>
					</div>
					<p class="demo_titre">Démonstration</p>
					<div class="sous_groupe">
						<p class="demo_description">Première utilisation : pour l'application AxeThrower <i>(disponible sur le PlayStore)</i></p>
						<div id="demonstration" class="unselectable">
							<div id="conteneur_img_demo">
								<img id="img_demo_pc" class="default_box_shadow" src="/images/demo_pc.png" />
								<img id="img_demo_mobile" class="default_box_shadow" src="/images/demo_mobile.png" />
							</div>
							<img id="img_go_into_demonstration" class="default_drop_shadow" />
						</div>
					</div>
					<p class="version_number">Seconde version</p>
					<div class="sous_groupe">
						<div id="ProgressBar_secondeVersion" class="version_ProgressBar ProgressBar ProgressBar_warning_animated ProgressBar_info_hidden"></div>
						<p class="extra_info_ProgressBar">en développement</p>
					</div>
				</div>
				<div id="main_marge_right"></div>
			</div>
			<?php include("../footer.html"); ?>
		</div>
		<div class="LightBox"></div>
	</body>
</html>
