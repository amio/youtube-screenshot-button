// ==UserScript==
// @name        Youtube Screenshot Button
// @author      Amio
// @version     1.0.0
// @description Adds a button that lets you take screenshot.
// @homepage    https://github.com/amio/youtube-screenshot-button
// @match       https://www.youtube.com/*
// @run-at      document-end
// @license     MIT License
// ==/UserScript==

export function uninstall () {
  const btn = document.getElementById('ss-btn')
  btn.parentElement.removeChild(btn)
}

export default function main () {
  var video = document.querySelector('.html5-main-video')
  var controls = document.querySelector('.ytp-right-controls')
  var existingButton = document.querySelector('.ytp-screenshot')

  if (existingButton) {
    console.info('Screenshot button already exists.')
    return
  }

  if (video && controls) {
    var buttonHTML = `
      <button id="ss-btn" class="ytp-button ytp-screenshot" title="Screenshot">
        <svg viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFF" fill-rule="evenodd"
            d="M16 0v10H0V0h16zM2 2h12v6H2V2zm0 6h3v2H2V8zm9-8h3v2h-3V0z"></path>
        </svg>
        <style>
          .ytp-screenshot { vertical-align: top; text-align:center; }
          .ytp-screenshot svg { height: 25%; width: 50% }
        </style>
      </button>
    `
    controls.insertAdjacentHTML('afterbegin', buttonHTML)
    document.getElementById('ss-btn').addEventListener('click', function () {
      var image = createScreenshotFromVideo(video)
      openImageInNewTab(image)
    })
  }
}

function createScreenshotFromVideo (video, config) {
  var canvas = document.createElement('canvas')
  canvas.width = video.clientWidth
  canvas.height = video.clientHeight

  var ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  var mime = {
    png: 'image/png',
    jpg: 'image/jpeg'
  }[(config && config.type) || 'png']

  return canvas.toDataURL(mime)
}

function openImageInNewTab (dataURI) {
  var html = `<html><body><img src="${dataURI}"/></body></html>`
  var newTab = window.open('', 'large')

  newTab.document.open()
  newTab.document.write(html)
  newTab.document.close()
}
