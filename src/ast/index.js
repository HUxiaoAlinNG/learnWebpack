/* 
  esprima: 把源码转化为AST
  estraverse: 遍历并更新AST
  escodegen: 将AST重新生成源码
  astexplorer(https://astexplorer.net/): AST的可视化工具
*/
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require("escodegen");
// 原始代码
const code = 'const AST = "Abstract Syntax Tree";';
// 原始ast
const ast = esprima.parse(code);
let indent = 0;
function pad() {
  return ' '.repeat(indent);
}
estraverse.traverse(ast, {
  enter(node) {
    console.log("===enter===", pad() + node.type);
    if (node.type === "Literal") {
      // 将值替换为大写形式
      node.value = node.value.toUpperCase();
      node.raw = node.raw.toUpperCase();
    }
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log("===leave===", pad() + node.type);
  }
});
// 重新生成代码
let generated = escodegen.generate(ast);
console.log("===generate===", generated);  // ===generate=== const AST = 'ABSTRACT SYNTAX TREE';
