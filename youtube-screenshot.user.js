// ==UserScript==
// @name        Youtube Screenshot Button
// @author      Amio
// @version     1.0.3
// @description Adds a button that lets you take screenshot.
// @homepageURL https://github.com/amio/youtube-screenshot-button
// @match       http://www.youtube.com/*
// @match       https://www.youtube.com/*
// @run-at      document-end
// @license     MIT License
// ==/UserScript==

(function () {
  var icon = '<svg width="16" height="10" viewBox="0 0 16 10" ' +
    'xmlns="http://www.w3.org/2000/svg"><title>ytp-svg-transition-10</title><path d="M16 ' +
    '0v10H0V0h16zM2 2h12v6H2V2zm0 6h3v2H2V8zm9-8h3v2h-3V0z" fill="#FFF" fill-rule="evenodd"></path></svg>'
  var iconBig = '<svg width="20" height="14" viewBox="0 0 20 14" ' +
    'xmlns="http://www.w3.org/2000/svg"><title>ytp-svg-transition-11</title><path d="M20 ' +
    '0v14H0V0h20zM2 2h16v10H2V2zm13-2h3v2h-3V0zM2 12h3v2H2v-2z" fill="#FFF" fill-rule="evenodd"/></svg>'

  var video = document.querySelector('.html5-main-video')
  var controls = document.querySelector('.ytp-right-controls')
  var existingButton = document.querySelector('.ytp-screenshot')

  if (existingButton) {
    console.info('Screenshot button already exists.')
    return
  }

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

  function openImageInNewTab(dataURI) {
    var html = '<html><body><img src="' + dataURI + '"/></body></html>'
    var newTab = window.open('', 'large')

    newTab.document.open();
    newTab.document.write(html);
    newTab.document.close();
  }

  if (video && controls) {
    var styles = `<style>
                    .ytp-screenshot { vertical-align: top; text-align:center; }
                    .ytp-screenshot svg { height: 25%; width: 50% }
                  </style>`
    var buttonHTML = `<button class="ytp-button ytp-screenshot" style="${styles}" title="Screenshot">${icon}</button>`
    controls.insertAdjacentHTML('afterbegin', buttonHTML + styles)
    controls.firstChild.addEventListener('click', function () {
      var image = createScreenshotFromVideo(video)
      openImageInNewTab(image)
    })
  }
})()
