import Template from '../template'
import Subscribe from '../../utils/subscribe'

let listener = Subscribe()

let html    = Template.get('player_video')
let display = html.find('.player-video__display')
let paused  = html.find('.player-video__paused')
let timer   = {}
let rewind_position = 0
let video
let wait


function bind(){
    video.addEventListener("waiting", function (){
        loader(true)
    })

    video.addEventListener("playing", function (){
        loader(false)
    })


    video.addEventListener('ended', function() {
        listener.send('ended', {})
    })

    video.addEventListener('error', function(e){
        let error = video.error || {}
        let msg   = (error.message || '').toUpperCase();

        if(msg.indexOf('EMPTY SRC') == -1){
            if(error.code == 3){
                listener.send('error', {error: 'Не удалось декодировать видео'})
            }
            else if(error.code == 4){
                listener.send('error', {error: 'Видео не найдено или повреждено'})
            }
            else{
                listener.send('error', {error: 'code ['+error.code+'] details ['+msg+']'})
            }
        } 
    })



    video.addEventListener('progress', function(e) {
        var duration =  video.duration;

        if (duration > 0) {
            for (var i = 0; i < video.buffered.length; i++) {
                if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                    var down = Math.max(0,Math.min(100,(video.buffered.end(video.buffered.length - 1 - i) / duration) * 100)) + "%";

                    listener.send('progress', {down: down})

                    break;
                }
            }
        }
    })


    video.addEventListener('canplay', function() {
        listener.send('canplay', {})
    })

    video.addEventListener('timeupdate', function() {
        listener.send('timeupdate', {duration: video.duration, current: video.currentTime})
    })

    video.volume = 1
    video.muted  = false
}

function create(){
    let videobox = $('<video class="player-video__video" poster="./img/video_poster.png" crossorigin="anonymous"></video>')

    display.append(videobox)

    video = videobox[0]

    bind()
}

function loader(status){
    wait = status

    html.toggleClass('video--load', status)
}

function url(src){
    create()

    video.src = src

    video.load()

    play()
}

function play(){
    var playPromise;

    try{
        playPromise = video.play()
    }
    catch(e){ }


    if (playPromise !== undefined) {
        playPromise.then(function(){
            console.log('Player','start plaining')
        })
        .catch(function(e){
            console.log('Player','play promise error')
        });
    }

    paused.addClass('hide')

    listener.send('play',{})
}

function pause(){
    let pausePromise;

    try{
        pausePromise = video.pause()
    }
    catch(e){ }

    if (pausePromise !== undefined) {
        pausePromise.then(function(){
            console.log('Player','pause')
        })
        .catch(function(){
            console.log('Player','pause promise error')
        });
    }

    paused.removeClass('hide')

    listener.send('pause',{})
}

function playpause(){
    if(wait || rewind_position) return

    if(video.paused){
        play()

        listener.send('play', {})
    }  
    else{
        pause()

        listener.send('pause', {})
    }
}

function rewindEnd(immediately){
    clearTimeout(timer.rewind_call)

    timer.rewind_call = setTimeout(function(){
        video.currentTime = rewind_position

        rewind_position = 0

        play()
    },immediately ? 0 : 500)
}

function rewindStart(position_time,immediately){
    if(!video.duration) return

    rewind_position = Math.max(0, Math.min(position_time, video.duration))

    pause()

    if(rewind_position == 0) video.currentTime = 0
    else if(rewind_position == video.duration) video.currentTime = video.duration

    timer.rewind = Date.now()

    listener.send('timeupdate', {duration: video.duration, current: rewind_position})
    listener.send('rewind',{})

    rewindEnd(immediately)
}

function rewind(forward, custom_step){
    if(video.duration){
        var time = Date.now(),
            step = video.duration / (30 * 60),
            mini = time - (timer.rewind || 0) > 50 ? 20 : 60

        if(rewind_position == 0) rewind_position = video.currentTime

        if(forward){
            rewind_position += Math.min(mini,custom_step || 30 * step)
        }
        else{
            rewind_position -= Math.min(mini,custom_step || 30 * step)
        }

        rewindStart(rewind_position)
    }
}

function size(type){
    html.attr('data-size',type)
}

function destroy(){
    video.src = ""

    video.load()

    display.empty()
}

function render(){
    return html
}

export default {
    listener,
    url,
    render,
    destroy,
    playpause,
    rewind,
    play,
    pause,
    size
}