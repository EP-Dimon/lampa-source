import Storage from './storage'

function init(){
    if(typeof webOS !== 'undefined'){
        Storage.set('platform','webos')
    }
    else if(typeof webapis !== 'undefined' && typeof tizen !== 'undefined'){
        Storage.set('platform','tizen')
    }
    else{
        Storage.set('platform','')
    }
    
    Storage.set('native',Storage.get('platform') ? true : false)
}

function get(){
    return Storage.get('platform','')
}

export default {
    init,
    get
}