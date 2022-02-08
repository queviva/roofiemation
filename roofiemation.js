////////////////////////////////////////////////////////////
// queviva - MCMLXXXVIII                                  //
//                                                        //
////////////////////////////////////////////////////////////

((
    P = Object.assign(
        {
            selector: 'roofie',
            watchers: 'transform,opactity,d'
        },
        JSON.parse(Object.values(
            document.currentScript.dataset
        )[0]||'{}')
    ),
    
    R = P.selector
    
) => window.addEventListener('load', () => {
    
    document.querySelectorAll(

        `[data-${R}]:not(script)`

    ).forEach(obj => new function(
        
        prefs = Object.assign({},P,JSON.parse(obj.dataset[R]||'{}'))
        
    ) {
        
        prefs.watchers = prefs.watchers.trim().split(/\s*,\s*/);
        
        obj.style.animationFillMode = 'forwards';
                
        obj.addEventListener('animationend', e => {
        
            let sty = window.getComputedStyle(obj);
        
            prefs.watchers.forEach(prop => obj.style[prop] = sty[prop]);
        
            obj.classList.remove(obj.ani);
        
            e.stopPropagation();
        
        }, {passive: false});
        
        obj[R] = {
        
            mate: ani => {
        
                if (window.getComputedStyle(obj).animationName !== 'none') {
        
                    obj.dispatchEvent(new Event('animationend'));
        
                    obj.roofie.mate(ani);
        
                } else {
        
                    obj.classList.add((obj.ani = ani));
        
                }
        
            },
        
            paz: () => obj.style.animationPlayState = obj.style.animationPlayState === 'paused' ? 'running' : 'paused',
        
            stop: () => obj.dispatchEvent(new Event('animationend'))
            
        }
        
    }());

}))();
