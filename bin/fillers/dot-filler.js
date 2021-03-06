import { lineLength } from '../geometry';
import { polygonHachureLines } from './scan-line-hachure';
export class DotFiller {
    constructor(helper) {
        this.helper = helper;
    }
    fillPolygon(points, o) {
        o = Object.assign({}, o, { curveStepCount: 4, hachureAngle: 0, roughness: 1 });
        const lines = polygonHachureLines(points, o);
        return this.dotsOnLines(lines, o);
    }
    dotsOnLines(lines, o) {
        const ops = [];
        let gap = o.hachureGap;
        if (gap < 0) {
            gap = o.strokeWidth * 4;
        }
        gap = Math.max(gap, 0.1);
        let fweight = o.fillWeight;
        if (fweight < 0) {
            fweight = o.strokeWidth / 2;
        }
        const ro = gap / 4;
        for (const line of lines) {
            const length = lineLength(line);
            const dl = length / gap;
            const count = Math.ceil(dl) - 1;
            const offset = length - (count * gap);
            const x = ((line[0][0] + line[1][0]) / 2) - (gap / 4);
            const minY = Math.min(line[0][1], line[1][1]);
            for (let i = 0; i < count; i++) {
                const y = minY + offset + (i * gap);
                const cx = this.helper.randOffsetWithRange(x - ro, x + ro, o);
                const cy = this.helper.randOffsetWithRange(y - ro, y + ro, o);
                const el = this.helper.ellipse(cx, cy, fweight, fweight, o);
                ops.push(...el.ops);
            }
        }
        return { type: 'fillSketch', ops };
    }
}
