var h = require('virtual-dom/h')
var sendEvent = require('value-event/event')
var sendSubmit = require('value-event/submit')

component.render = render
module.exports = component

var redirect = null, share = null

function component (state, ee) {
  redirect = function (state, value) {   
    ee.emit('render', state.set('href', value))
  }
  share = function(state, data) {
    console.log(data)
  }
}

function render (state) {
  var r = redirect.bind(null, state)

  return h('.container', [
    h('.row', [
      h('img', { src: '' })
    ]),
    h('.row', [
      h('form', { 'ev-submit': sendSubmit(share.bind(null, state)) }, [
        h('fieldset', [
          h('label', 'Board'),
          h('input.u-full-width', { type: 'text', name: 'board' })
        ]),
        h('fieldset', [
          h('label', 'Comments'),
          h('textarea.u-full-width', { name: 'comments' })
        ]),
        h('button.button-primary.u-full-width', 'Share Board'),
        h('a.button.u-full-width', { 'ev-click': sendEvent(r, '/main') }, 'CANCEL')
      ])
    ])


  ])
}

