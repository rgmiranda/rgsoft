export class LSystem<Symbol extends string = string> {
  private _sentence: Symbol[];
  private _generation: number = 0;

  constructor(
    private readonly _axiom: Symbol[],
    private readonly _rules: Map<Symbol, Symbol[]>
  ) {
    this._sentence = [..._axiom];
  }

  /**
   *
   * @param { number } n Number of generations to generate
   * @returns { string } The generated sentence
   */
  generate(n: number = 1): string {
    let sentence = [...this._sentence];
    for (let i = 0; i < n; i++) {
      sentence = sentence.flatMap((s) => this._rules.get(s) ?? [s]);
      this._generation++;
    }
    this._sentence = sentence;
    return this._sentence.join("");
  }

  get sentence(): string {
    return this._sentence.join("");
  }

  get generation(): number {
    return this._generation;
  }

  get axiom(): Symbol[] {
    return [...this._axiom];
  }

  get rules(): Map<Symbol, Symbol[]> {
    return this._rules;
  }

  reset(): void {
    this._sentence = [...this._axiom];
    this._generation = 0;
  }
}
