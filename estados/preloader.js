var Preloader = {

	preload: function() {
		me = this
		// Mostramos en pantalla la barra de progreso previamente cargada en el estado de Boot
		me.preloadBg = me.add.sprite(juego.width / 2, juego.height/ 2, 'preloaderBg')
		me.preloadBg.anchor.setTo(0.5, 0.5)
		me.preloadBar = me.add.sprite(juego.width / 2, juego.height/ 2, 'preloaderBar')
		me.preloadBar.anchor.setTo(0.5, 0.5)
		me.load.setPreloadSprite(me.preloadBar)

		// Cargamos todos los recursos que usará el juego
		juego.load.image('fondo', 'imgs/bg.png')
		juego.load.image('piso', 'imgs/piso.png')
		juego.load.image('tubo1', 'imgs/aviso1.png')
		juego.load.image('tubo2', 'imgs/aviso3.png')
		juego.load.image('tubo3', 'imgs/aviso2.png')
		juego.load.image('tubo4', 'imgs/aviso3.png')
		juego.load.image('tuboMeta', 'imgs/bandera.png')
		juego.load.image('modalSobremi', 'imgs/bgModalAbout.png')
		juego.load.image('modalProyectos', 'imgs/bgModalProject.png')
		juego.load.image('modalHabilidades', 'imgs/bgModalHabilidades.png')
		juego.load.image('modalContacto', 'imgs/bgModalContacto.png')
		juego.load.image('modalBandera', 'imgs/bgModalBandera.png')
		juego.load.image('bgMenu', 'imgs/bgMenu.png')
		juego.load.image('SI', 'imgs/SI.png')
		juego.load.image('NO', 'imgs/NO.png')
		juego.load.image('botonGit', 'imgs/botonGit.png')
		juego.load.image('botonIN', 'imgs/botonIN.png')
		juego.load.image('botonGP', 'imgs/botonGP.png')
		juego.load.image('botonCP', 'imgs/botonCP.png')
		juego.load.image('botonST', 'imgs/botonST.png')
		juego.load.image('btnDownload', 'imgs/botonDescargar.png')
		juego.load.image('btnProyectos', 'imgs/btnProyectos.png')
		juego.load.spritesheet('boxPregunta', 'imgs/secreto.png', 20, 18)
		juego.load.spritesheet('botones', 'imgs/btns.png', 100, 67.8)
		juego.load.spritesheet('btnBandera', 'imgs/btnBandera.png', 100.5, 68)
		juego.load.spritesheet('btnPlay', 'imgs/btnPlay.png', 192, 128)
		// juego.load.spritesheet('btnSN', 'imgs/btnSiNo.png', 192.5, 128.5)
		juego.load.spritesheet('moneda', 'imgs/moneda.png', 32, 32)
		juego.load.spritesheet('player', 'imgs/player.png', 64, 64)
		juego.load.audio('audioMoneda', 'audios/moneda.wav')
		juego.load.audio('audioTubo', 'audios/tubo.wav')
		juego.load.audio('audioBg', 'audios/background.mp3', true)
	},
	create: function() {
		me = this
		juego.state.start('Menu')
	},
}