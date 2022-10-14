import colorTheme from './color-theme/colors.json' assert {type: 'json'};

const globals = {
  ...colorTheme,
  foo: 'bar',
}

export default globals;
