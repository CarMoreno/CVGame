var PUNTOS = 0
var Juego = {
	preload: function() { juego.forceSingleUpdate = true},

	create: function() {
		me = this
		me.physics.startSystem(Phaser.Physics.Arcade)
		me.add.tileSprite(0, 0, 774, 581, 'fondo')//cordX, cordY, ancho, alto, id

		/*------Audio------*/
		me.audioMoneda = me.add.audio('audioMoneda')
		me.audioTubo = me.add.audio('audioTubo')
		me.audioBg = me.add.audio('audioBg')
		me.audioBg.loopFull(0.8) // el sonido se reproduce con loop, es decir, cuando se acaba el tema vuelve a iniciar, con un volumen establecido en 0.8
		/*------Texto------*/
	    	me.texto = "Puntos: "+PUNTOS
	    	me.style = {font: "40px Lucida Console", fill: "#fff", }
	    	me.textoMostrar = me.add.text(10, 10, me.texto, me.style)
	    /*------Botones----*/
	    	me.botones = []
	    	me.botonMeta = me.add.button(juego.width - 65, 320, 'btnBandera', me.configBtnBandera, me, 1, 0)//los ultimos numeros son el frame del spritesheet que será usado cuando haya hover, o no.
	    	me.botonMeta.visible = false
	    	me.botonMeta.scale.setTo(0.6, 0.7)
	    	for (var i = 0; i < 4; i++) {
	    		me.botones.push(me.add.button(juego.width - 65, i*80, 'botones', me.configBotones, me, i*2+1, i*2).scale.setTo(0.6, 0.7))
	    	}
	    	/*-----BoxPregunta----*/
	    	me.boxPregunta = me.add.sprite(juego.width / 2 + 15, juego.height/2 + 4, 'boxPregunta')
	    	me.boxPregunta.inputEnabled = true
	    	me.boxPregunta.input.useHandCursor = true
	    	me.boxPregunta.scale.setTo(1.6, 1.6)
	    	me.boxPregunta.animations.add('box', [0, 1, 2, 3], 2, true)
	    	me.boxPregunta.events.onInputDown.add(me.mostrarBox, me)

		/*------Tubos------*/
		me.tubo = me.add.sprite(juego.width - 600 , juego.height - 170, 'tubo1')
		me.tubo2 = me.add.sprite(juego.width - 300 , juego.height - 170, 'tubo2')
		me.tubo3 = me.add.sprite(juego.width - 100 , juego.height - 170, 'tubo3')
		me.tubo4 = me.add.sprite(juego.width - 300 , juego.height - 70, 'tubo4')
		me.tuboMeta = me.add.sprite(juego.width - 600 , juego.height - 70, 'tuboMeta')
		me.tubos = [me.tubo, me.tubo2, me.tubo3, me.tubo4, me.tuboMeta]
		me.configTubo(me.tubos)

		/*-----Monedas-----*/
		me.monedas = me.add.group() 
		me.monedas.enableBody = true
		me.monedas.physicsBodyType = Phaser.Physics.ARCADE
		me.monedas.createMultiple(28, 'moneda', [3], true)
		me.monedas.align(14, -1, 60, 110)
		me.monedas.y = juego.height - 140
		me.monedas.x = juego.width - 700  
		me.monedas.callAll('animations.add', 'animations', 'animacionMoneda', [0, 1, 2 ,3, 4, 5, 6, 7], 10, true)
		me.monedas.callAll('play', null, 'animacionMoneda')

		/* -------Piso------*/
		me.piso = me.add.tileSprite(0, juego.height - 100, 774, 15, 'piso')
		me.piso2 = me.add.tileSprite(0, juego.height - 1, 774, 15, 'piso')// este sprite ayuda a que el player se detenga cuando camina haca abajo.
		me.physics.arcade.enable(me.piso) // activamos la fisica en el piso
		me.physics.arcade.enable(me.piso2) // activamos la fisica en el piso2
		me.piso.body.immovable = true //el piso se queda fijo, de lo contrario al colisionar con el personaje se cae
		me.piso2.body.immovable = true

		/* -------Player by http://sunspots.konstantino.me/2012/11/22/in-game-animation/------*/
		me.player = me.add.sprite(0, juego.height - 300, 'player')
		me.physics.arcade.enable(me.player)// activamos la fisica en el player
		me.player.scale.setTo(1.2, 1.2)//escalamos el personaje
		me.player.body.gravity.y = 400
		me.player.body.collideWorldBounds = true
		me.player.frame = 143

		/*----Animacion player-----*/
		me.player.animations.add('izquierda', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true)
		me.player.animations.add('derecha', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true) //nombre, frames, frames/seg , bandera
		me.player.animations.add('abajo', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true)
		me.player.animations.add('bailar', [26, 27, 28, 29, 30, 31, 32], 5, true)
		me.player.body.velocity.x = 0
	},

	/**
	 * [configTubo Configura las propiedades de todos los tubos (avisos), presentes en el juego.
	 * Además, asocia eventos de click a cada tubo dependiendo de su key. La propiedad key de cada tubo
	 * será usada como un identificador unico, esto servirá para futuras funciones.]
	 * @param  {[type]} tubos [Array que contiene todos los avisos del juego]
	 * @return {[type]}       [void]
	 */
	configTubo: function(tubos) {
		me = this
		for (var i in tubos) {
			me.physics.arcade.enable(me.tubos[i])
			me.tubos[i].inputEnabled = true
			me.tubos[i].body.immovable = true
			me.tubos[i].input.useHandCursor = true

			if(me.tubos[i].key == "tubo4" || me.tubos[i].key == "tuboMeta") {
				me.tubos[i].events.onInputDown.add(me.moverIzquierda, me)
			}
			else {
				me.tubos[i].events.onInputDown.add(me.moverDerecha, me)
			}

		}	
	},

	/**
	 * [moverIzquierda Mueve el personaje a la izquierda, para esto se establece la velocidad en
	 * el eje x negativa, posteriormente se activa la animacion 'izquierda'. La animación a la izquerda
	 * solo se puede realizar cuando los primeros 3 tubos no están vivos]
	 * @return {[type]} [void]
	 */
	moverIzquierda: function() {
		if(!me.tubo.alive && !me.tubo2.alive && !me.tubo3.alive) {
			me = this
			me.player.body.velocity.x = -150
			me.player.animations.play('izquierda')
		}
		else {
			alert("Antes debes leer todos los demás avisos :-)")
		}
	},

	/**
	 * [moverDerecha Mueve el personaje a la derecha, para esto se establece la velocidad en
	 * el eje x positiva, posteriormente se activa la animacion 'derecha']
	 * @return {[type]} [void]
	 */
	moverDerecha: function() {		
		me = this
		me.player.body.velocity.x = 150
		me.player.animations.play('derecha')
	},

	/**
	 * [moverAbajo Mueve el personaje hacia abajo, para esto se incrementa la posicion en Y,
	 * posteriormente se activa la animacion 'abajo']
	 * @return {[type]} [void]
	 */
	moverAbajo: function() {
		me = this
		me.player.position.y += 6
		me.player.animations.play('abajo')
	},

	/**
	 * [moverPersonaje Funcion que mueve el personaje en el juego. Para cada tubo (aviso) presente
	 * en el juego, se debe detectar si hay colision con el personaje. Si hay una colision entonces
	 * se ejecutarán una serie de acciones comunes para todos los tubos:
	 * - La aimación del player se detendrá
	 * - se reproduce el audio de colision.
	 * - se destruye el tubo con el que se colisionó
	 * - se muestra un modal con un mensaje
	 * - Y el personaje queda establecido con el frame 130 (queda de frente)
	 *
	 * Además, hay acciones que se ejecutan dependiendo del tipo de tubo con el que se colisione
	 * - Si se colisiona con el tubo 3, entonces el personaje se va a mover hacia abajo.
	 * - Si se colisiona con el tubo de meta, entonces se hará visible un botón en la parte derecha. 
	 * ]
	 * @return {[type]} [void]
	 */
	moverPersonaje: function () {
		me = this
		for (var i in me.tubos) {
			if(me.physics.arcade.collide(me.player, me.tubos[i])) {// Si hay colisión entre el player y un tubo, entonces...
				me.player.animations.stop()
				me.audioTubo.play()
				me.tubos[i].destroy()
				me.configModal(me.tubos[i].key)
				me.player.frame = 130
				if(me.tubos[i].key == "tubo3") {
					me.moverAbajo()
				}
				else if(me.tubos[i].key == "tuboMeta"){
					me.botonMeta.visible = true
				}
			}
		}
	},

	/**
	 * [gameOver Esta función ejecuta una animaciónsobre el personaje cuando se ha llegado a los 90 puntos]
	 * @return {[type]} [void]
	 */
	gameOver: function() {
		me = this
		if(PUNTOS == 90) {
			me.player.animations.play('bailar')
		}
	},

	/**
	 * [resetear Esta función establece las acciones que se siguen para comenzar un nuevo juego,
	 * esta función se ejecuta solo cuando el usuario desea jugar de nuevo.]
	 * @return {[type]} [void]
	 */
	resetear: function() {
		PUNTOS = 0
		me.audioMoneda.stop()
		me.audioTubo.stop()
		me.audioBg.stop()
		me.game.state.start("Menu")
	},

	/**
	 * [ganarPuntos Se encarga de asignar cinco puntos cada vez que el player colisiona con una moneda.
	 * Para esto, se recorre el grupo de monedas y para cada moneda se valida si hay una sobreposicion
	 * (overlap), entre la moneda en cuestion y el player. Si esto es así, esa moneda será destruida, 
	 * se repoduce el audio de moneda, los puntos se actualizan en 5 unidades más y el texto en pantalla
	 * (que notifica la cantidad de puntos) se actualiza.]
	 * @return {[type]} [void]
	 */
	ganarPuntos: function () {
		me = this
		me.monedas.forEach(function(moneda){
			if(me.physics.arcade.overlap(me.player, moneda)) {
				moneda.destroy()
				me.audioMoneda.play()
				PUNTOS += 5
				me.textoMostrar.setText("Puntos: "+PUNTOS)
			}
		})
		
	},

	/**
	 * [crearModal Se encarga de crear todos los mensajes que se muestran en el juego, dependiendo
	 * de un fondo. Este fondo es una imagen con un mensaje. Esta función usa el pluguin phaser_modals.
	 * Puedes ver como funciona en: https://github.com/netgfx/phaser_modals]
	 * @param  {[type]} fondo [String que refernecia al fondo]
	 * @return {[type]}       [description]
	 */
	crearModal: function(fondo) {
		me = this
		if (fondo == "box") {
			modal.createModal({
            type:"modal",
            includeBackground: true,
            modalCloseOnInput: true,
            itemsArr: [
                {
                    type: "text",
                    content: "También puedes descargar mi curriculum\n en formato PDF :-).",
                    fontFamily: "Lucida Console",
                    fontSize: 30,
                    color: "0xFFFFFF",
                    offsetY: -50,
                    stroke: "0x000000",
                    strokeThickness: 5
                },

                {
                    type: "image",
                    content: "btnDownload",
                    offsetY: 70,
                    offsetX: -10,
                    contentScale: 0.6,
                    callback: function () {
                    	modal.hideModal("modal")
                      	window.open('http://carmoreno.github.io/curriculum.pdf')
                    }
	            },

            ]
        });
		}
		else if(fondo == "modalBandera") {
			modal.createModal({
	            type:"modal",
	            includeBackground: true,
	            modalCloseOnInput: true,
	  			itemsArr: [
	                {
	                    type: "image",
	                    content: fondo,
	                    offsetY: -10,
	                    offsetX: 10,
	                    contentScale: 1
	            	},

	            	{
	                    type: "image",
	                    content: "SI",
	                    offsetY: 70,
	                    offsetX: -90,
	                    contentScale: 0.6,
	                    callback: function () {
	                    	modal.hideModal("modal")
	                      	me.resetear()
	                    }
		            },
	                {
	                    type: "image",
	                    content: "NO",
	                    offsetY: 70,
	                    offsetX: 100,
	                    contentScale: 0.6,
	                    callback: function () {
	                    	modal.hideModal("modal")
	                    	me.gameOver()
	                    }
	            	},
	            	{
	                    type : "text",
	                    content: "X",
	                    fontSize: 45,
	                    color: "0x000000",
	                    offsetY: -220,
	                    offsetX: 300,
	                    callback: function(){
	                    	modal.hideModal("modal")
	                    }
	            	}
	            ]
	   		})
		}
		else if (fondo == "modalContacto") {
			modal.createModal({
	            type:"modal",
	            includeBackground: true,
	            modalCloseOnInput: true,
	  			itemsArr: [
	                {
	                    type: "image",
	                    content: fondo,
	                    offsetY: 10,
	                    offsetX: 10,
	                    contentScale: 1
	            	},
	            	{
	                    type: "image",
	                    content: "botonIN",
	                    offsetY: 30,
	                    offsetX: -202,
	                    contentScale: 0.8,
	                    callback: function () {
	                    	window.open("https://co.linkedin.com/in/carmoreno1")
	                    	
	                    }
	            	},
	            	{
	                    type: "image",
	                    content: "botonGit",
	                    offsetY: 30,
	                    offsetX: 102,
	                    contentScale: 0.8,
	                    callback: function () {
	                    	window.open("http://github.com/carmoreno")
	                    	
	                    }
	            	},
	            	{
	                    type: "image",
	                    content: "botonST",
	                    offsetY: 30,
	                    offsetX: -102,
	                    contentScale: 0.8,
	                    callback: function () {
	                    	window.open("http://stackoverflow.com/users/4508767/carmoreno")
	                    	
	                    }
	            	},
	            	{
	                    type: "image",
	                    content: "botonGP",
	                    offsetY: 30,
	                    offsetX: 202,
	                    contentScale: 0.8,
	                    callback: function () {
	                    	window.open("https://plus.google.com/+CarlosMorenoV")
	                    	
	                    }
	            	},
	            	{
	                    type: "image",
	                    content: "botonCP",
	                    offsetY: 30,
	                    offsetX: 0,
	                    contentScale: 0.8,
	                    callback: function () {
	                    	window.open("http://codepen.io/carmoreno")
	                    	
	                    }
	            	},
	            	{
	                    type : "text",
	                    content: "X",
	                    fontSize: 45,
	                    color: "0x000000",
	                    offsetY: -220,
	                    offsetX: 300,
	                    callback: function(){
	                    	modal.hideModal("modal");
	                    }
	            	}
	            ]
	   		})
		}
		else if(fondo == "modalProyectos") {
			modal.createModal({
	            type:"modal",
	            includeBackground: true,
	            modalCloseOnInput: true,
	  			itemsArr: [
	                {
	                    type: "image",
	                    content: fondo,
	                    offsetY: -10,
	                    offsetX: 10,
	                    contentScale: 1
	            	},

	            	{
	                    type: "image",
	                    content: "btnProyectos",
	                    offsetY: 70,
	                    offsetX: 0,
	                    contentScale: 0.5,
	                    callback: function () {
	                    	window.open("http://carmoreno.github.io/proyectos")	
	                    }
		            },
	            	{
	                    type : "text",
	                    content: "X",
	                    fontSize: 45,
	                    color: "0x000000",
	                    offsetY: -220,
	                    offsetX: 300,
	                    callback: function(){
	                    	modal.hideModal("modal")
	                    }
	            	}
	            ]
	   		})
		}
		else {
			modal.createModal({
	            type:"modal",
	            includeBackground: true,
	            modalCloseOnInput: true,
	  			itemsArr: [
	                {
	                    type: "image",
	                    content: fondo,
	                    offsetY: -10,
	                    offsetX: 10,
	                    contentScale: 1
	            	},
	            	{
	                    type : "text",
	                    content: "X",
	                    fontSize: 45,
	                    color: "0x000000",
	                    offsetY: -220,
	                    offsetX: 300,
	                    callback: function(){
	                    	modal.hideModal("modal");
	                    }
	            	}
	            ]
	   		})
		}
   		modal.showModal("modal")
	},

	/**
	 * [configModal Esta función configura el fondo que será enviado a la función anterior. Segun el tubo
	 * (aviso), será mostrado un mensaje en particular. Se usa la propieda key del tubo para asociar el mensaje.]
	 * @param  {[type]} keyTubo [String, es el identificador que posee cada tubo]
	 * @return {[type]}         [description]
	 */
	configModal: function(keyTubo) {
		me = this
		if(keyTubo == "tubo1") {
			me.crearModal("modalSobremi")
		}
		else if(keyTubo == "tubo2") {
			me.crearModal("modalHabilidades")
		}
		else if(keyTubo == "tubo3"){
			me.crearModal("modalProyectos")
		}
		else if(keyTubo == "tubo4"){
			me.crearModal("modalContacto")
		}
		else {
			me.crearModal("modalBandera")	
		}
	},

	/**
	 * [configBotones Esta función se encarga de asociar un mensaje a cada botoón que se muestra en 
	 * la parte derecha. Se consideró necesario crear estos botones porque cuando el personaje colisiona
	 * con un tubo, este desaparece. Lo anterior supone que el mensaje asociado al tubo no volverá a 
	 * aparecer. Para esto se hicieron los botones, para que los mensajes estén disponibles siempre
	 * que el usuario los necesite.
	 *
	 * Esta función se ejecuta cada vez que un botón es clickeado. Se usa la propieda 'z' para identificar
	 * el botón en cuestión y de acuerdo al botón se asocia el mensaje.
	 * ]
	 * @param  {[type]} boton [boton que es clickeado]
	 * @return {[type]}       [description]
	 */
	configBotones: function(boton) {
		me = this
		me.audioTubo.play()
		// alert(boton.z)
		switch(boton.z) {
			case 3:
				me.configModal('tubo1')
				break
			case 4:
				me.configModal('tubo3')
				break
			case 5:
				me.configModal('tubo2')
				break
			case 6:
				me.configModal('tubo4')
				break			
		}
	},

	/**
	 * [configBtnBandera esta función se ejecuta cuando el usuario da click en el botón de bandera.
	 * El botón bandera tiene un comportamiento distinto a los otros botones, pues inicialmente
	 * su propiedad visible es false. Luego, cuando el player colsiona con el tubo meta, entonces
	 * este boton es visible (se establece a true)]
	 * @return {[type]} [void]
	 */
	configBtnBandera: function() {
		me = this
		me.audioTubo.play()
		me.configModal("tuboMeta")
	},

	/**
	 * [mostrarBox Esta función muestra un mensaje suando se da click sobre el box con signo de pregunta.]
	 * @return {[type]} [description]
	 */
	mostrarBox: function() {
		me = this
		me.crearModal("box")
	},

	
	update: function() {
		me = this
		me.boxPregunta.animations.play('box')
		me.moverPersonaje()
		me.ganarPuntos()
		me.gameOver()
		me.physics.arcade.collide(me.player, me.piso)

		// Esta condición ayuda que el personaje se detenga cuando camina hacia abajo.
		if(me.physics.arcade.collide(me.player, me.piso2)) {
			me.player.animations.stop()
			me.piso2.destroy()
			me.player.frame = 130
		}
	}
}
