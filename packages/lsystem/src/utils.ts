export function parseRules<Symbol extends string>(
  definitions: string[],
  alphabet?: readonly Symbol[]
): Map<Symbol, Symbol[]> {
  const map = new Map<Symbol, Symbol[]>();

  for (const def of definitions) {
    const [left, right] = def.replace(/\s+/g, "").split("=>");
    if (!left || !right) {
      throw new Error(`Invalid rule: ${def}`);
    }

    const lhs = left as Symbol;
    const rhs = right.split("") as Symbol[];

    if (alphabet) {
      if (!alphabet.includes(lhs)) {
        throw new Error(`Unknown symbol "${lhs}" in rule: ${def}`);
      }
      for (const s of rhs) {
        if (!alphabet.includes(s)) {
          throw new Error(`Unknown symbol "${s}" in rule: ${def}`);
        }
      }
    }

    map.set(lhs, rhs);
  }

  return map;
}
