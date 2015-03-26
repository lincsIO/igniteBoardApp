var h = require('virtual-dom/h')
var sendEvent = require('value-event/event')

component.render = render
module.exports = component

var redirect = null

function component (state, ee) {
  redirect = function (state, value) {   
    ee.emit('render', state.set('href', value))
  }
}

function render (state) {
  var r = redirect.bind(null, state)
  return h('.container', [
    h('img', { src: '//alpha.igniteboard.com/igniteboard.png' }),
    h('.row', [
      h('h4', 'Spark the Moment')
    ]),
    h('.row', [
      h('p', 'Thank You for choosing the IgniteBoard App, this app gives you the ability to upload your favorite photos and/or share your board with friends')
    ]), 
    h('.row', [
      h('button.button-primary.u-full-width', { 
        'ev-click': sendEvent(r, '/photos/new') 
      }, 'Post Photo')
    ]),
    h('.row', [
      h('button.button-primary.u-full-width', { 
        'ev-click': sendEvent(r, '/boards/share') 
      }, 'Share Board')
    ]) 
  ])
}

