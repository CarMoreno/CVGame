var Menu = {
	create: function() {
		me = this
		//mostramos en pantalla
		me.add.tileSprite(0, 0, 774, 581, 'bgMenu')
		var boton = me.add.button(juego.width - 145, juego.height - 90, 'btnPlay', me.iniciarJuego, me, 1, 0)//coordX, coordY, id, callback, menu
		boton.scale.setTo(0.6, 0.5)	
	},

	/** [iniciarJuego Empieza el estado de Juego, se ejecuta cuando hay evento de click sobre el boton Play] */
	iniciarJuego: function() {
		juego.state.start('Juego')
	}
}