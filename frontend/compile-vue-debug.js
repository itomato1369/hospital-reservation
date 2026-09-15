const fs = require('fs');
const { parse, compileTemplate } = require('@vue/compiler-sfc');
const path = 'src/components/nurse/ChangeWaitingModal.vue';
const content = fs.readFileSync(path, 'utf8');
const { descriptor, errors } = parse(content, { filename: path });
console.log('parseErrors', errors.length);
console.log(content);
if (descriptor.template) {
  try {
    const result = compileTemplate({
      source: descriptor.template.content,
      filename: path,
      id: 'testid',
      compilerOptions: { mode: 'module' },
    });
    console.log('compileErrors', result.errors.length);
    console.log(result.errors);
    if (result.code) console.log('code generated');
  } catch (e) {
    console.error('threw', e.message);
    console.error(e.stack);
  }
}
