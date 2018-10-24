Player = {}

Player.init = function() {
	this.male = (Math.random() < 0.6) ? 0 : 1
	UI.notifyPositive('A nice ' +
		((this.male) ? 'boy' : 'girl') + ' is born. ')
	this.age = 0
	this.health = 100
	this.hormone = 30
	this.adolescenceStage = 0
	this.savings = 0.001
	this.granny = 10
}

Player.update = function() {
	this.age += 1.0 / 365
	this.savings *= 1.001
	console.log(this.age)
	UI.setVal('age', this.age.toFixed(2))
	UI.setVal('sex', (this.male) ? '♂' : '♀')
	UI.setVal('savings', this.savings.toFixed(2))
}
