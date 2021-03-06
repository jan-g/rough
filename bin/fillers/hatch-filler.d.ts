import { HachureFiller } from './hachure-filler';
import { ResolvedOptions, OpSet } from '../core';
import { Point } from '../geometry';
export declare class HatchFiller extends HachureFiller {
    fillPolygon(points: Point[], o: ResolvedOptions): OpSet;
}
