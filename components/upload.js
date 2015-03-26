require('../lib/s3upload')
var h = require('virtual-dom/h')
var sendChange = require('value-event/change')

component.render = render
module.exports = component

var change = null

function component (state, ee) {
  change = function (state, o) {
    // do s3upload
    console.log(o.photo.split(' ').join('-').toLowerCase())
    var name = (new Date()).toISOString() + '-app.' + o.photo.split('.')[1]
    var s3upload = new S3Upload({
      s3_object_name: name,
      file_dom_selector: 'photo',
      s3_sign_put_url: '/sign_s3',
      onProgress: function(percent, message) { 
        console.log(percent) 
        if ((percent % 10) === 0) {
          ee.emit('render',state.set('progress', percent))
        }
      },
      onFinishS3Put: function(public_url) {
        ee.emit('render', state.set('photo_url', public_url))
        //console.log('finished')
      },
      onError: function(status) {
        //console.log(status)
      }
    });
  }
}

function render (state) {
  var c = change.bind(null, state)
  var progress = state.get('progress') || 0

  return h('div', [
    h('input', { type: 'hidden', value: state.get('photo_url') || null }),
    h('input.u-full-width', { 
      'ev-change': sendChange(c),
      type: 'file', 
      name: 'photo', 
      id: 'photo'
    }),
    h('progress.u-full-width', { value: progress, max: '100' })
  ])
}
