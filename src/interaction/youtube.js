import Controller from './controller'

let player
let html
let timer

function create(id){
    html = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>')

    $('body').append(html)

    player = new YT.Player('youtube-player', {
        height: window.innerHeight,
        width: window.innerWidth,
        playerVars: { 
            'controls': 0,
            'showinfo': 0,
            'autohide': 1,
            'modestbranding': 1,
            'autoplay': 1
        },
        videoId: id,
        events: {
            onReady: (event)=>{
                event.target.playVideo()

                update()
            },
            onStateChange: (state)=>{
                if(state.data == 0){
                    Controller.toggle('content')
                }
            }
        }
    });
}

function update(){
    timer = setTimeout(()=>{
        let progress = player.getCurrentTime() / player.getDuration() * 100

        $('#youtube-player__progress').css('width',progress + '%')

        update()
    }, 400)
}

function play(id){
    create(id)

    Controller.add('youtube',{
        invisible: true,
        toggle: ()=>{
            
        },
        right: ()=>{
            player.seekTo(player.getCurrentTime() + 10, true)
        },
        left: ()=>{
            player.seekTo(player.getCurrentTime() - 10, true)
        },
        enter: ()=>{

        },
        gone: ()=>{
            destroy()
        },
        back: ()=>{
            Controller.toggle('content')
        }
    })

    Controller.toggle('youtube')
}

function destroy(){
    clearTimeout(timer)

    player.destroy()

    html.remove()

    html = null
}

export default {
    play
}