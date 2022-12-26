import { Rect, SVG } from '@svgdotjs/svg.js';
import { useEffect } from 'react';

let w = 300; let h = 300; let pointSize = 5;
const drawLineGrid = (width, height, draw) => {
    for (var x = 0; x <= width; x += 20) {
        draw.line(x, 0, x, height).stroke({ width: 0.4, color: 'rgba(0,65,255,0.7)' })
    }
    for (var y = 0; y <= height; y += 20) {
        draw.line(0, y, width, y).stroke({ width: 0.4, color: 'rgba(0,65,255,0.7)' })
    }
}

const drawDotGrid = (draw, width = w, height = h, color = '#E1E1E1') => {
    for (var x = 0; x <= width; x += 20 * 2.5) {
        for (var y = 0; y <= height; y += 20 * 2.5) {
            draw.rect(pointSize, pointSize).move(x - (pointSize / 2), y - (pointSize / 2)).fill(color)
        }
    }
}

const highlightArea = (width, height, draw) => {
    draw.rect(width, height).fill('rgba(0,65,255,0.1)').stroke('rgba(0,65,255,0.2)');
    drawLineGrid(width, height, draw);
    drawDotGrid(draw, width, height, '#0041FF');
}

export default function () {
    useEffect(() => {
        let draw = SVG().addTo('#draw').size(w, h);
        let group = draw.group();
        drawDotGrid(group);
        highlightArea(100, 100, group);
        group.move(4, 4);
    }, [])

    return (
        <div id="draw"></div>
    );
}