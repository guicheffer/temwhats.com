var temwhats = temwhats || {};

var status = 'off'; //`on` or `off`

temwhats.config = {
    status_whats: status,

    init: function(){
        var _body = document.getElementsByTagName('body')[0],
        _obj_download_gplay = document.getElementsByClassName('download-google-play')[0],
        _container_whats_on = document.getElementsByClassName('content-whats-on')[0],
        _container_whats_off = document.getElementsByClassName('content-whats-off')[0],
        _img = null;


        /*if whats on / whats off*/
        if (this.status_whats.toLowerCase() === 'on') {
            _body.className = _body.className + ' whats-on';
            _container_whats_on.className = _container_whats_on.className + ' showing';
        } else if (this.status_whats.toLowerCase() === 'off') {
            _body.className = _body.className + ' whats-off';
            _container_whats_off.className = _container_whats_off.className + ' showing';
        }

        /*download button*/
        if( window.navigator.userAgent.toLowerCase() !== 'app' ){
            _obj_download_gplay.className = _obj_download_gplay.className + ' showing';
        }

        /*click img*/
        _img = document.querySelector('.content-status.showing .img');
        _img.addEventListener('click', function(e){
            if (window.innerWidth < 768){
                if (!this.className.match(/turning1/)){
                    this.className = this.className + ' turning1';
                } else {
                    this.className = 'img';
                }
            } else {
                if (this.className.match(/turning1/)){
                    this.className = 'img turning2';
                } else if (this.className.match(/turning2/)){
                    this.className = 'img turning3';
                } else if (this.className.match(/turning3/)){
                    this.className = 'img';
                } else {
                    this.className = this.className + ' turning1';
                }
            }
        });

        console.log('Current status:', this.status_whats);
    }
};

(function(){
    temwhats.config.init();
})();
