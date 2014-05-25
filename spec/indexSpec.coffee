describe 'App', ->
	Given -> module('app')
	When -> @module = angular.module('app')
	Then -> @module != undefined
