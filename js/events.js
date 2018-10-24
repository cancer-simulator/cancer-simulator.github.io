Events = {}
Followups = []

Events.rnd = function(n) {
	return Math.floor(n * Math.random())
}

Events.arnd = function(a) {
	return a[Events.rnd(a.length)]
}

Starters = [
	function() {
		if (Player.hormone < 70) return 0
		if (Math.random() < 0.3) {
			UI.notifyNeutral('Aimed to show your friends how you jump out of a moving train.')
		} else {
			UI.notifyNegative('Aimed to show your friends how you jump out of a moving train.')
			Player.health -= 10
		}
		return 1
	},
	
	function() {
		msg = ['Started paying attention to other teens.', 'Visited a school party and danced.', 'Bed.']
		if (Player.age < 10 || Player.age > 15) return 0
		UI.notifyPositive(msg[Player.adolescenceStage])
		if (Player.adolescenceStage < msg.length - 1) Player.adolescenceStage += 1
		Player.hormone += 30
		return 1
	},
	
	function() {
		if (!Player.granny) return 0
		
		if (Player.age > Events.rnd(500)) {
			will = Player.granny * 10
			UI.notifyNegative('Your lovely granny Toriel left the world. Got $' + Player.granny + ' as her will.')
			Player.savings += will
			Player.granny = 0
			return 1
		} else {
			UI.notifyPositive('Your lovely granny Toriel sent you $' + Player.granny + '.')
			Player.savings += Player.granny
			Player.granny *= 2
		}
		return 1
	}
]

Events.generate = function() {
	if (Math.random() < 0.1) return 0
	if (Followups.length) {
		e = Followups.splice(rnd(Followups.length), 1)
		return e[0]()
	}
	if (Math.random() < 0.95) return 0
	
	return this.arnd(Starters)()
}
