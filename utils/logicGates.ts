// Logic Gate Calculations Utility

export type LogicGateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR';

/**
 * Calculate the output of a logic gate given two inputs
 */
export const calculateLogicGate = (
  inputA: string | number,
  inputB: string | number,
  gate: LogicGateType
): string => {
  const a = typeof inputA === 'string' ? parseInt(inputA) : inputA;
  const b = typeof inputB === 'string' ? parseInt(inputB) : inputB;

  switch (gate) {
    case 'AND':
      return (a && b) ? '1' : '0';
    case 'OR':
      return (a || b) ? '1' : '0';
    case 'NOT':
      return (!a) ? '1' : '0';
    case 'NAND':
      return !(a && b) ? '1' : '0';
    case 'NOR':
      return !(a || b) ? '1' : '0';
    case 'XOR':
      return (a !== b) ? '1' : '0';
    default:
      return '0';
  }
};

/**
 * Generate truth table for a specific logic gate
 */
export const generateTruthTable = (gate: LogicGateType) => {
  const combinations = ['00', '01', '10', '11'];
  
  return combinations.map(combo => {
    const a = combo[0];
    const b = combo[1];
    const output = calculateLogicGate(a, b, gate);
    
    return {
      inputA: a,
      inputB: b,
      output,
    };
  });
};

/**
 * Get logic gate symbol (Unicode)
 */
export const getGateSymbol = (gate: LogicGateType): string => {
  const symbols: Record<LogicGateType, string> = {
    AND: '⋀',
    OR: '⋁',
    NOT: '¬',
    NAND: '⊼',
    NOR: '⊽',
    XOR: '⊕',
  };
  
  return symbols[gate] || '';
};

/**
 * Get MaterialCommunityIcons icon name for logic gate
 */
export const getGateIconName = (gate: LogicGateType): string => {
  const icons: Record<LogicGateType, string> = {
    AND: 'gate-and',
    OR: 'gate-or',
    NOT: 'gate-not',
    NAND: 'gate-nand',
    NOR: 'gate-nor',
    XOR: 'gate-xor',
  };
  
  return icons[gate] || 'help-circle';
};

/**
 * Get all available logic gates
 */
export const getAllLogicGates = (): LogicGateType[] => {
  return ['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'];
};

