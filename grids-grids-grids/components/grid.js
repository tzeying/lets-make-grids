import { Rect, SVG } from '@svgdotjs/svg.js';
import { useEffect } from 'react';


const drawLineGrid = (width, height, draw, scale) => {
    for (var x = 0; x <= width; x += scale) {
        draw.line(x, 0, x, height).stroke({ width: 0.4, color: 'rgba(0,65,255,0.7)' })
    }
    for (var y = 0; y <= height; y += scale) {
        draw.line(0, y, width, y).stroke({ width: 0.4, color: 'rgba(0,65,255,0.7)' })
    }
}

const drawDotGrid = (draw, scale, dotGridScaleMultiplier, width = w, height = h, color = '#E1E1E1') => {
    for (var x = 0; x <= width; x += scale * dotGridScaleMultiplier) {
        for (var y = 0; y <= height; y += scale * dotGridScaleMultiplier) {
            draw.rect(pointSize, pointSize).move(x - (pointSize / 2), y - (pointSize / 2)).fill(color)
        }
    }
}

const highlightArea = (width, height, draw, scale, dotGridScaleMultiplier) => {
    draw.rect(width, height).fill('rgba(0,65,255,0.1)').stroke('rgba(0,65,255,0.2)');
    drawLineGrid(width, height, draw, scale);
    drawDotGrid(draw, scale, dotGridScaleMultiplier, width, height, '#0041FF');
}

const plot = (size) => {
    let { w, h } = size;
    let sqft = w * h;
    let step = [20, 10, 8]
    if (sqft < 100) {
        return { scale: step[0], multiplier: 2.5, plotW: w * step[0], plotH: h * step[0] }
    } else if (sqft >= 100 && sqft < 250) {
        return { scale: step[1], multiplier: 5, plotW: w * step[1], plotH: h * step[1] }
    } else if (sqft >= 250) {
        return { scale: step[2], multiplier: 7.5, plotW: w * step[2], plotH: h * step[2] }
    }
}

let w = 270; let h = 270; let pointSize = 5;

// let size = { w: 30, h: 15 };
export default function ({ size, index }) {
    let { scale, multiplier, plotW, plotH } = plot(size);

    useEffect(() => {
        let draw = SVG().addTo(`#draw${index}`).size(w, h);
        let group = draw.group();
        drawDotGrid(group, scale, multiplier);
        highlightArea(plotW, plotH, group, scale, multiplier);
        group.move(4, 4);
    }, [])

    return (
        <div className="flex border border-slate-300 rounded p-4 flex-col">
            <p className='text-lg font-medium pb-2'>{size.w} x {size.h}</p>
            <div id={`draw${index}`}></div>
        </div>
    );
}