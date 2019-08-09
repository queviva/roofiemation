////////////////////////////////////////////////////////////
// queviva pizzaface
//
// custome colour picker
// in one line
//
////////////////////////////////////////////////////////////
// add globals for c9
/*global CustomEvent Event*/

// loop through every nosepicker in town
document.querySelectorAll('.nosepicker').forEach(nose => {
    
    // initialize exposed values and aliases
    let v = nose.vals = (nose.dataset.vals ? JSON.parse(nose.dataset.vals) :
    
        // if nothing was punched in the nose, default to rudolph
        { h: 0, s: 100, l: 50, a: 1, sns: 500, low: 50, snx: 500 }
        
        // make a way to clam down
    ),  clam = (...v) => v.sort((a, b) => a - b)[1];
    
    // start listening for handkercheif scrolls on the nose and
    // prevent respectable behavior - !!!inertial dampers offline!!!
    nose.addEventListener('wheel', (e, x = e.preventDefault()) =>
        
        // sneeze out an input event customarily
        nose.dispatchEvent(new CustomEvent('input', {
        
            sensitivity: (v.snx = e.shiftKey ? v.sns : v.low),

            // color the nose and set the current values
            detail: (nose.value = nose.style.backgroundColor = 'hsla(' +
            
                // increment hue from scrollUP|DOWN - use shift key for more sensitivity
                (v.h = (!e.ctrlKey) ? (v.h - e.wheelDeltaY / v.snx) : v.h) +
                ',' +
        
                // gate saturation between 0 and 100 from scrollUP|DOWN+ctrlKey
                (v.s = (e.ctrlKey) ? clam(v.s + e.wheelDeltaY / v.snx, 100, 0) : v.s) +
                '%,' +
        
                // gate luminosity between 0 and 100 from scrollLEFT|RIGHT
                (v.l = (!e.ctrlKey) ? clam(v.l + e.wheelDeltaX / v.snx, 100, 0) : v.l) +
                '%,' +
        
                // gate transparency between 0.0 and 1.0 from scrollLEFT|RIGHT+ctrlKey
                (v.a = (e.ctrlKey) ? clam(v.a - e.wheelDeltaX / v.snx * 0.01, 1, 0) : v.a)
                + ')'
        
            ),
            
            // create the transparent hackground image
            backgroundImage: (nose.style.backgroundImage = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><path fill='rgba(200,200,200," + (1 - v.a) + "' d='M 30 15 V 0 L 0 30 H 15 Z M 15 0 H 0 V 15 Z'/><path fill='rgba(255,255,255," + (1 - v.a) + ")' d='M 30 0 H 15 L 0 15 V 30 Z M 15 30 H 30 V 15 Z'/></svg>\")")
        
        }))
        
    );
    
    // sneeze change out of the nose on click
    nose.addEventListener('click', e => nose.dispatchEvent(new Event('change')));
    
});