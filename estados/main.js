var juego = new Phaser.Game(774, 581, Phaser.AUTO, "div_juego")
var modal = new gameModal(juego)
juego.state.add('Boot', Boot)
juego.state.add('Preloader', Preloader)
juego.state.add('Menu', Menu)
juego.state.add('Juego', Juego)
//juego.state.add('GameOver', GameOver)

juego.state.start('Boot')