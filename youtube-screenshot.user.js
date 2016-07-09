// ==UserScript==
// @name Youtube Screenshot Button
// @description Adds a button that lets you take screenshot.
// @homepageURL https://gist.github.com/amio/785a9eba8e58af1ddba7623613cfbc10
// @author Amio
// @version 1.0.0
// @date 2016-07-09
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @match http://s.ytimg.com/yts/jsbin/html5player*
// @match https://s.ytimg.com/yts/jsbin/html5player*
// @match http://manifest.googlevideo.com/*
// @match https://manifest.googlevideo.com/*
// @match http://*.googlevideo.com/videoplayback*
// @match https://*.googlevideo.com/videoplayback*
// @match http://*.youtube.com/videoplayback*
// @match https://*.youtube.com/videoplayback*
// @connect googlevideo.com
// @connect ytimg.com
// @run-at document-end
// @license MIT License
// ==/UserScript==

var icon = '<svg style="padding:13px 11px;" width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><title>ytp-svg-transition-10</title><path d="M16 0v10H0V0h16zM2 2h12v6H2V2zm0 6h3v2H2V8zm9-8h3v2h-3V0z" fill="#FFF" fill-rule="evenodd"></path></svg>'
var iconBig = '<svg style="padding:11px 8px" width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"><title>ytp-svg-transition-11</title><path d="M20 0v14H0V0h20zM2 2h16v10H2V2zm13-2h3v2h-3V0zM2 12h3v2H2v-2z" fill="#FFF" fill-rule="evenodd"/></svg>'
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
  var buttonHTML = `<button class="ytp-button" title="Screenshot">${icon}</button>`
  controls.insertAdjacentHTML('afterbegin', buttonHTML)
  controls.firstChild.addEventListener('click', function () {
    var image = createScreenshotFromVideo(video)
    window.open(image)
  })
}
