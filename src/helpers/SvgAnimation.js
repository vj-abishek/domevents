const svgData = {
    capture: {
        one: 'M 406,42 L 406,105',
        two:  'M 406,105 L 406,136 L 440,203',
        three: 'M 440,203 L 440,234 L 474,301',
        four: 'M 440,203 L 440,234 L 474,433'
    },
    bottom: {
        one: 'M 406,105 L 406,136 L 922,136 L 922,105',
        two: 'M 440,203 L 440,234 L 888,234 L 888,203',
        three: 'M 474,301 L 474,332 L 854,332 L 854,301',
        four: 'M 474,433 L 474,464 L 854,464 L 854,433'
    },
    event: {
        capture: {
        one: 'M 406,105 L 434,105',
        two: 'M 440,203 L 468,203',
        three: 'M 474,301 L 502,301',
        four: 'M 474,433 L 502,433'
        },
        bubble: {
            one: 'M 922,105 L 894,105',
            two: 'M 888,203 L 860,203',
            three: 'M 854,301 L 826,301',
            four: 'M 854,433 L 826,433'
        }
    },
    bubble: {
        one: 'M 922,105 L 922,42',
        two: 'M 888,203 L 922,136 L 922,105',
        three: 'M 854,301 L 888,234 L 888,203',
        four: 'M 854,433 L 888,234 L 888,203'
    }
}

let qArray = [];
const svg = document.querySelector('svg');

window.addEventListener('resetSvg', () => {
    qArray = [];
    svg.style.display = 'none';
    svg.innerHTML = ''
})

document.addEventListener('animationend', (e) => {
    if(e.target.matches('path')){
        e.target.classList.add('no-animation');
        const current = qArray.shift();

        if(!current) return;

        drawPath(current.svgData, current.length, current.duration);
    }
})

const drawPath = async (d, l, du) => {
    let path =  `<path d="${d}" class="pathAnimation" style="--local-line-total-length:${l}; --local-line-animation-duration:${du}ms; --local-line-color: var(--line-color); "></path>`
    svg.innerHTML += path;
}

const queue = (data) => {
    qArray.push(data);
}

const checkPhase = (events, phase) => events.filter((r) => r.phase === phase);

const animate = async (currentTarget,  phase, target, bubble, events) => {


    // capture phase
    if(phase === 'capture'){
        if(currentTarget === 'parent'){
            drawPath(svgData.capture.one, 63, 400);

            const filteredPhase = checkPhase(events, 'parent-capture')
            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.capture.one,
                    length: 28,
                    duration: 400
                })

                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }
            const nextPhase = target === currentTarget ? 'target' : 'capture'
            const cTarget = target === currentTarget ? currentTarget : 'child'
            animate(cTarget,  nextPhase, target, bubble, events)
        }

        if(currentTarget === 'child'){
            const data = {
                svgData: svgData.capture.two,
                length: 106.133,
                duration: 400
            }
            queue(data);

            const filteredPhase = checkPhase(events, 'child-capture')

            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.capture.two,
                    length: 28,
                    duration: 400
                })

                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }
            // drawPath(, , , );
            const nextPhase = target === currentTarget ? 'target' : 'capture'
            let cTarget;

            if(target === currentTarget)
                cTarget = currentTarget
            else if(target === 'second grandchild'){
                cTarget = 'second grandchild'
            }
            else
                cTarget = 'first grandchild'
            // const cTarget = target === currentTarget ? currentTarget : 'first grandchild'
            animate(cTarget,  nextPhase, target, bubble, events)
        }

        if(currentTarget === 'first grandchild') {
            const data = {
                svgData: svgData.capture.three,
                length: 106.133,
                duration: 400
            }
            queue(data);

            const filteredPhase = checkPhase(events, 'FC-capture')

            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.capture.three,
                    length: 28,
                    duration: 400
                })

                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }

            // drawPath( svgData.capture.three, 106.133, 400);
            const nextPhase = target === currentTarget ? 'target' : 'capture'
            const cTarget = target === currentTarget ? currentTarget : 'second grandchild'
            animate(cTarget,  nextPhase, target, bubble, events)
        }
        if(currentTarget === 'second grandchild') {
            const data = {
                svgData: svgData.capture.four,
                length: 232.884,
                duration: 776.279
            }
            queue(data);

            const filteredPhase = checkPhase(events, 'SGC-capture')

            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.capture.four,
                    length: 28,
                    duration: 400
                })
                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }
            // drawPath( svgData.capture.four, 232.884, 232.884);
            animate('second grandchild',  'target', target, bubble, events)
        }

    } else if(target === currentTarget && phase === 'target') { // target phase
        if(target === 'parent'){
            const data = {
                svgData: svgData.bottom.one,
                length: 578,
                duration: 1926.67
            }
            queue(data);
            // drawPath( svgData.bottom.one, 578, 1926.67)
        }
        if(target === 'child'){
            const data = {
                svgData: svgData.bottom.two,
                length: 510,
                duration: 1700
            }
            queue(data);
            // drawPath( svgData.bottom.two, 510, 1700)
        }
        if(target === 'first grandchild'){
            const data = {
                svgData: svgData.bottom.three,
                length: 442,
                duration: 1473.33
            }
            queue(data);
        //    drawPath( svgData.bottom.three, 442, 1473.33)
        }
        if(target === 'second grandchild'){
            const data = {
                svgData: svgData.bottom.four,
                length: 442,
                duration: 1473.33
            }
            queue(data);
        //    drawPath( svgData.bottom.four, 442, 1473.33)
        }

        if(!bubble){
            return
        }

        if(bubble) {
            return animate(currentTarget,  'bubble', target, bubble, events);
        }

    } else if(phase === 'bubble'){ // bubble phase

        if(currentTarget === 'parent'){

            const filteredPhase = checkPhase(events, 'parent-bubble')
            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.bubble.one,
                    length: 28,
                    duration: 400
                })
                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }
            const data = {
                svgData: svgData.bubble.one,
                length: 63,
                duration: 400
            }
            queue(data);
            // drawPath(svg, svgData.bubble.one, 63, 400);
        }
        if(currentTarget === 'child'){

            const filteredPhase = checkPhase(events, 'child-bubble')
            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.bubble.two,
                    length: 28,
                    duration: 400
                })
                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }

            const data = {
                svgData: svgData.bubble.two,
                length: 106.133,
                duration: 400
            }
            queue(data);
            // drawPath(svg, svgData.bubble.two, 106.133, 400);
            animate('parent',  'bubble', target, bubble, events);
        }
        if(currentTarget === 'first grandchild'){

            const filteredPhase = checkPhase(events, 'FC-bubble')
            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.bubble.three,
                    length: 28,
                    duration: 400
                })

                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }

            const data = {
                svgData: svgData.bubble.three,
                length: 106.133,
                duration: 400
            }
            queue(data);
            // drawPath( svgData.bubble.three, 106.133, 400);
            animate('child',  'bubble', target, bubble, events);
        }
        if(currentTarget === 'second grandchild') {

            const filteredPhase = checkPhase(events, 'SGC-bubble')
            if(filteredPhase.length > 0) {
                queue({
                    svgData: svgData.event.bubble.four,
                    length: 28,
                    duration: 400
                })

                if(filteredPhase[0]?.properties?.stopPropagation === true) return;
            }

            const data = {
                svgData: svgData.bubble.four,
                length: 232.884,
                duration: 776.279
            }
            queue(data);
            // drawPath(svg, svgData.bubble.four, 232.884, 776.279)
            animate('child',  'bubble', target, bubble, events)
        }
    }
}

export default function init(e) {
    const {target, bubble, events} = e;

    svg.style.display = 'block';
    svg.innerHTML = '';

    animate('parent',  'capture' ,target, bubble, events);

}