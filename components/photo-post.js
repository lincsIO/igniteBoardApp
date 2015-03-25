var h = require('virtual-dom/h')

component.render = render
module.exports = component

function component (state) {

}

function render (state) {
  return h('.container', [
    h('.row', [
      h('img', { src: '//alpha.igniteboard.com/igniteboard.png' })
    ]),
    h('.row', [
      h('label', 'Board'),
      h('input.u-full-width', { type: 'text', name: 'board' })
    ]),
    h('.row', [
      h('label', 'Photo'),
      h('input.u-full-width', { type: 'file', name: 'photo' })
    ])
  ])
}
