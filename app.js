var domify = require('domify')
var cssify = require('cssify')
cssify.byUrl('//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css')
cssify.byUrl('//cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css')
document.title = 'IgniteBoardApp'
document.head.appendChild(domify('<meta name="viewport" content="width=device-width, initial-scale=1">'))
document.head.appendChild(domify("<link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>"))

var h = require('virtual-dom/h')
var createElement = require('virtual-dom/create-element')
var values = require('map-values')
var Delegator = require('dom-delegator')
var Immutable = require('immutable')

var state = Immutable.Map({
  href: '/main'
})

// components
var components = { 
  '/main': require('./components/main'),
  '/photos/new': require('./components/photo-post'),
  '/boards/share': require('./components/boards-share')
}

values(components, function (v) { 
  v(state) 
})


function render (state) {
  return components[state.get('href')].render(state)
}

Delegator()
var tree = render(state)
var node = createElement(tree)
document.body.appendChild(node)


