var video = document.querySelector('.html5-main-video')
var controls = document.querySelector('.ytp-right-controls')

function createScreenshotFromVideo(video, config) {
  var canvas = document.createElement('canvas')
  canvas.width = video.clientWidth
  canvas.height = video.clientHeight
  
  var ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  var mime = {
    png: 'image/png',
    jpg: 'image/jpeg'
  }[config && config.type || 'png']

  return canvas.toDataURL(mime)
}

if (video && controls) {
  var buttonHTML = '<button class="ytp-button ytp-settings-button" title="Screenshot">SS</button>'
  controls.insertAdjacentHTML('afterbegin', buttonHTML)
  controls.firstChild.addEventListener('click', function () {
    var image = createScreenshotFromVideo(video)
    window.open(image)
  })
}
