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
		var msg = ['Started paying attention to other teens.', 'Visited a school party and danced.', 'Bed.']
		if (Player.age < 10 || Player.age > 15) return 0
		UI.notifyPositive(msg[Player.adolescenceStage])
		Player.hormone += 30
		if (Player.adolescenceStage < msg.length - 1) Player.adolescenceStage++
		return 1
	},
	
	function() {
		if (!Player.granny) return 0
		
		if (Player.age > Events.rnd(500)) {
			will = Player.granny * 10
			UI.notifyNegative('Your loving granny Toriel left the world. Got $' + Player.granny + ' as her will.')
			Player.savings += will
			Player.granny = 0
			return 1
		} else {
			UI.notifyPositive('Your loving granny Toriel sent you $' + Player.granny + '.')
			Player.savings += Player.granny
			Player.granny += 10
		}
		return 1
	},
	
	function() {
		if (!Player.extortion) return 0
		if (Player.age > 18 || Player.age < 6) return 0
		
		Player.extortion++

		if (Math.random() < 0.5 || Player.extortion < 3 || Player.age < 12) {
			UI.notifyNegative('Squall and Seifer stopped you and demanded your pocket money. You submitted.')
			Player.savings = Player.savings * 0.99 - 10
			if (Player.savings < 0) Player.savings = 0
			return 1
		}
		
		Player.extortion = 0
		Player.savings *= 0.99
		UI.notifyNegative(Events.arnd(['Squall attempted to extort money from you and you killed him with a lead pipe. Hiding the body costed you.', 'You bribed Selphie into killing Seifer. This costed you.', 'Squall was killed in a school gunfight.']))
		return 1
	}
]

Events.generate = function() {
	if (Math.random() < 0.1) return 0
	if (Followups.length) {
		var e = Followups.splice(rnd(Followups.length), 1)
		return e[0]()
	}
	if (Math.random() < 0.99) return 0

	return this.arnd(Starters)()
}
