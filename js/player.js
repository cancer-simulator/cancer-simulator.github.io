Player = {}

Player.AGE_STEP = 1.0 / 365

Player.init = function() {
	this.male = (Math.random() < 0.6) ? 0 : 1
	UI.notifyPositive('A nice ' +
		((this.male) ? 'boy' : 'girl') + ' is born. <a>Restart</a>?')
	this.age = 0
	this.health = 100
	this.hormone = 30
	this.adolescenceStage = 0
	this.savings = 0
    this.weight = 3 + Math.random() * 2
    this.props = {}
}

Player.update = function() {
	this.age += this.AGE_STEP
    if (this.age < 20) {
        this.weight += this.AGE_STEP * Math.random() * (6 + this.male)
    } else {
        this.weight += this.AGE_STEP * Math.random()
    }
	this.savings *= 1.0001

	UI.setVal('age', this.age.toFixed(2))
	UI.setVal('sex', (this.male) ? '♂' : '♀')
    UI.setVal('weight', this.weight.toFixed(0))
	UI.setVal('savings', this.savings.toFixed(2))
}
