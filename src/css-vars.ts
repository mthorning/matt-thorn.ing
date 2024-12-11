export const colours = {
  dark: {
    primary: '#7480ff',
    secondary: '#ff52d9',
    accent: '#00cdb8',
    neutral: '#a6adbb',
    'base-100': '#1d232a',
    'base-200': '#191e24',
    'base-300': '#15191e',
    'base-content': '#a6adbb',
  },
  light: {
    primary: '#0069ff',
    secondary: '#463AA2',
    accent: '#C148AC',
    neutral: '#021431',
    'base-100': 'oklch(100% 0 0)',
    'base-200': '#F2F7FF',
    'base-300': '#E3E9F4',
    'base-content': '#394E6A',
  },
};

export const constants = {
  transitionSpeed: 500,
};

function addVars(
  vars: Record<string, string | number>,
  prefix: string
): string {
  let str = '';
  Object.entries(vars).forEach(([key, value]) => {
    str += `${prefix}-${key}: ${value};`;
  });
  return str;
}

let varStr = '';

Object.entries(colours).forEach(([lightDark, cols]) => {
  varStr += addVars(cols, '--' + lightDark);
});

varStr += addVars(constants, '--const');

export const varsForStyleTag = `
:root {
  ${varStr}
}
`;
