var temwhats = temwhats || {};

var status = 'on'; //`on` or `off`

temwhats.config = {
    status_whats: status,
    
    init: function(){
        var container_body = document.getElementsByTagName('body')[0],
        _obj_download_gplay = document.getElementsByClassName('download-google-play')[0],
        _container_whats_on = document.getElementsByClassName('content-whats-on')[0],
        _container_whats_off = document.getElementsByClassName('content-whats-off')[0];
        
        if (this.status_whats.toLowerCase() === 'on') {
            container_body.className = container_body.className + ' whats-on';
            _container_whats_on.className = _container_whats_on.className + ' showing';
        } else if (this.status_whats.toLowerCase() === 'off') {
            container_body.className = container_body.className + ' whats-off';
            _container_whats_off.className = _container_whats_off.className + ' showing';
        }
        
        if( window.navigator.userAgent.toLowerCase() !== 'app' ){
            _obj_download_gplay.className = _obj_download_gplay.className + ' showing';
        }
        
        console.log('Current status:', this.status_whats);
    }
};

(function(){
    temwhats.config.init();
})();