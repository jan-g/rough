import { PatternFiller, RenderHelper } from './filler-interface';
import { ResolvedOptions, OpSet } from '../core';
import { Point } from '../geometry';
export declare class DashedFiller implements PatternFiller {
    private helper;
    constructor(helper: RenderHelper);
    fillPolygon(points: Point[], o: ResolvedOptions): OpSet;
    private dashedLine;
}
