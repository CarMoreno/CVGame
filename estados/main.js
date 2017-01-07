var juego = new Phaser.Game(774, 559, Phaser.AUTO, "div_juego")
var modal = new gameModal(juego)// Objeto para la gestion de mensjaes (modales) en el juego
juego.state.add('Boot', Boot)
juego.state.add('Preloader', Preloader)
juego.state.add('Menu', Menu)
juego.state.add('Juego', Juego)

juego.state.start('Boot')