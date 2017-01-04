var Boot = {

	preload: function() {
		// Cargamos una imagen de barra de progreso
		me = this
		me.load.image('preloaderBg', 'imgs/loading-bg.png')
		me.load.image('preloaderBar', 'imgs/loading-bar.png')
	},

	create: function() {
		// Gestion de escalamiento de pantalla
		me = this
		me.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
		me.game.scale.pageAlignHorizontally = true
		me.game.scale.pageAlignVertically = true
		me.game.state.start('Preloader')//empieza el estado de preloader
	}
}