var h = require('virtual-dom/h')

component.render = render
module.exports = component

function component () {
}

function render (state) {
  return h('.container', [
    h('.row', [
      h('img', { src: '' })
    ]),
    h('.row', [
      h('form', { 'ev-submit': sendSubmit(share.bind(null, state)) }, [
        h('fieldset', [
          h('label', 'Board'),
          h('input.u-full-width', { type: 'text' })
        ]),
        h('fieldset', [
          h('label', 'Comments'),
          h('textarea.u-full-width', { name: 'comments' })
        ]),
        h('button.button-primary.u-full-width', 'Share Board')        
      ])
    ])
  ])
}

