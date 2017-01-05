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
	    me.botonMeta = me.add.button(juego.width - 65, 200, 'btnBandera', me.configBtnBandera, me, 1, 0)
	    me.botonMeta.visible = false
	    me.botonMeta.scale.setTo(0.6, 0.7)
	    for (var i = 0; i < 4; i++) {
	    	me.botones.push(me.add.button(juego.width - 65, i*50, 'botones', me.configBotones, me, i*2+1, i*2).scale.setTo(0.6, 0.7))
	    	//console.log("X= "+juego.width - 65+"Y= "+i*50)
	    }
	    /*-----BoxPregunta----*/
	    me.boxPregunta = me.add.sprite(juego.width / 2 + 15, juego.height/2 + 4, 'boxPregunta')
	    me.boxPregunta.inputEnabled = true
	    me.boxPregunta.input.useHandCursor = true
	    me.boxPregunta.scale.setTo(1.6, 1.6)//escalamos el personaje
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
		me.piso2 = me.add.tileSprite(0, juego.height - 1, 774, 15, 'piso')
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

	// Configura todos los avisos (tubos) del juego: fisica, cursor y eventos de click.
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

	// Mueve el personaje a la izquierda
	moverIzquierda: function() {
		me = this
		me.player.body.velocity.x = -150
		me.player.animations.play('izquierda')
	},

	// Mueve el personaje a la derecha
	moverDerecha: function() {		
		me = this
		me.player.body.velocity.x = 150
		me.player.animations.play('derecha')
	},

	// Mueve el personaje hacia abajo
	moverAbajo: function() {
		me = this
		me.player.position.y += 6
		me.player.animations.play('abajo')
	},

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
					//me.moverDerecha("abajo")
				}
				if(me.tubos[i].key == "tuboMeta"){
					me.botonMeta.visible = true
				}
			}
		}
	},

	gameOver: function() {
		me = this
		if(PUNTOS == 90) {
			me.player.animations.play('bailar')
		}
	},

	resetear: function() {
		PUNTOS = 0
		me.audioMoneda.stop()
		me.audioTubo.stop()
		me.audioBg.stop()
		me.game.state.start("Menu")
	},

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

	// Configura un mensaje de acuerdo al tubo.
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

	configBotones: function(boton) {
		me.audioTubo.play()
		me = this
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

	configBtnBandera: function() {
		me.audioTubo.play()
		me.configModal("tuboMeta")
	},

	mostrarBox: function() {
		me.crearModal("box")
	},
	update: function() {
		me.boxPregunta.animations.play('box')
		me = this
		me.moverPersonaje()
		me.ganarPuntos()
		me.gameOver()
		me.physics.arcade.collide(me.player, me.piso)
		if(me.physics.arcade.collide(me.player, me.piso2)) {
			me.player.animations.stop()
			me.piso2.destroy()
			me.player.frame = 130
		}
	}
}
