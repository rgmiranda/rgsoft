import { describe, expect, it } from "vitest";
import { LSystem } from "../src/lsystem";

describe(LSystem.name, () => {
    it('creates an instance', () => {
        const rules = new Map<string, string[]>([
            ['F', ['F', 'G']],
            ['G', ['G', 'F']],
        ]);
        let lsystem = new LSystem(['F'], rules);
        expect(lsystem).toBeInstanceOf(LSystem);
        expect(lsystem.rules.size).toEqual(2);
        expect(lsystem.axiom).toEqual(['F']);
        expect(lsystem.generation).toBe(0);
        expect(lsystem.sentence).toBe('F');
    });
    
    it('generates sentences', () => {
        const rules = new Map<string, string[]>([
          ["F", ["F", "[", "+", "F", "]", "[", "-", "F", "]"]],
          ["G", ["G"]],
          ["H", ["G"]],
        ]);
        let lsystem = new LSystem<string>(['F'], rules);
        expect(lsystem).toBeInstanceOf(LSystem);
        expect(lsystem.sentence).toBe('F');
        lsystem.generate();
        expect(lsystem.sentence).toBe('F[+F][-F]');
        
        lsystem = new LSystem<string>(['G'], rules);
        lsystem.generate();
        expect(lsystem.sentence).toBe('G');
        
        lsystem = new LSystem<string>(['H'], rules);
        lsystem.generate();
        expect(lsystem.sentence).toBe('G');
    });
    
    it('generates multiple generation sentences', () => {
        const rules = new Map<string, string[]>([
          ["F", ["F", "G"]]
        ]);
        let lsystem = new LSystem<string>(["F"], rules);
        expect(lsystem).toBeInstanceOf(LSystem);
        expect(lsystem.sentence).toBe('F');
        lsystem.generate(4);
        expect(lsystem.sentence).toBe('FGGGG');
        expect(lsystem.generation).toBe(4);
        lsystem.generate(2);
        expect(lsystem.sentence).toBe('FGGGGGG');
        expect(lsystem.generation).toBe(6);
        lsystem.reset();
        expect(lsystem.sentence).toBe('F');
        expect(lsystem.generation).toBe(0);
    });
});