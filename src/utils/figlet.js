import figlet from 'figlet';
import ANSIShadow from 'figlet/importable-fonts/ANSI Shadow';

figlet.parseFont('ANSI Shadow', ANSIShadow);

export function figletText(text) {
  return figlet
    .textSync(text, {
      font: 'ANSI Shadow',
      width: 80,
      whitespaceBreak: true,
    })
    .trim();
}
