var h = require('virtual-dom/h')
var sendEvent = require('value-event/event')
var sendSubmit = require('value-event/submit')
var sendChange = require('value-event/change')

component.render = render
module.exports = component

var redirect = null, change = null, post = null

function component (state, ee) {
  redirect = function (state, value) {   
    ee.emit('render', state.set('href', value))
  }
  change = function (state, o) {
    console.log(o)
  }
  post = function (state, data) {
    console.log(data)
  }
}

function render (state) {
  var r = redirect.bind(null, state)
  var chg = change.bind(null, state)
  var p = post.bind(null, state)

  return h('.container', [
    h('.row', [
      h('img', { src: '//alpha.igniteboard.com/igniteboard.png' })
    ]),
    h('.row', [
      h('form', {'ev-submit': sendSubmit(p)}, [
        h('fieldset', [
          h('label', 'Board'),
          h('input.u-full-width', { type: 'text', name: 'board' })
        ]),
        h('fieldset', [
          h('label', 'Photo'),
          h('input.u-full-width', { 
            'ev-change': sendChange(chg),
            type: 'file', 
            name: 'photo' 
          })
        ]),
        h('button.u-full-width', 'POST'),
        h('a.button.u-full-width', { 'ev-click': sendEvent(r, '/main') }, 'CANCEL')
      ])    
    ])
  ])
}
