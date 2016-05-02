var temwhats = temwhats || {};

var status = 'off'; //`on` or `off`

temwhats.config = {
    status_whats: status,
    
    init: function(){
        var container_body = document.getElementsByTagName('body')[0],
        _container_whats_on = document.getElementsByClassName('content-whats-on')[0],
        _container_whats_off = document.getElementsByClassName('content-whats-off')[0];
        
        if (this.status_whats === 'on') {
            container_body.className = container_body.className + ' whats-on';
            _container_whats_on.className = _container_whats_on.className + ' showing';
        } else if (this.status_whats === 'off') {
            container_body.className = container_body.className + ' whats-off';
            _container_whats_off.className = _container_whats_off.className + ' showing';
        }
        
        console.log('Current status:', this.status_whats);
    }
};

(function(){
    temwhats.config.init();
})();