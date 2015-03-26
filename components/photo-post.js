var h = require('virtual-dom/h')
var sendEvent = require('value-event/event')
var sendSubmit = require('value-event/submit')
var uploadComponent = require('./upload')

component.render = render
module.exports = component

var redirect = null, post = null

function component (state, ee) {
  redirect = function (state, value) {   
    ee.emit('render', state.set('href', value))
  }
  post = function (state, data) {
    console.log(data)
  }
  uploadComponent(state, ee)
}

function render (state) {
  var r = redirect.bind(null, state)
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
          uploadComponent.render(state)
        ]),
        h('button.u-full-width', 'POST'),
        h('a.button.u-full-width', { 'ev-click': sendEvent(r, '/main') }, 'CANCEL')
      ])    
    ])
  ])
}
