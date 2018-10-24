Game = {}

Game.SLOW_TIME_MS = 1000
Game.FAST_TIME_MS = 4

function updateGame() {
	if (Game.update()) return 1
	
    ms = Events.generate() ? Game.SLOW_TIME_MS : Game.FAST_TIME_MS	
	setTimeout(updateGame, ms)
}

Game.init = function() {
    this.score = null
    Player.init()

    updateGame()
}

Game.update = function() {
    Player.update()

    if (Player.health <= 0) {
	// kids mechanics
        UI.notifyNegative('Died. <a>Restart</a>?')
        return 1
    }

	return 0
}

Game.init()
