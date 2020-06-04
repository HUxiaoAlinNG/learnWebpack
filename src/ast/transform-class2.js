const babelCore = require("@babel/core");
//用于AST的lodash工具库，包含构造，验证以及变换AST的方法
const babelTypes = require("babel-types");
// 原始代码
const code = `class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}`;

const transformClassPlugin = {
  visitor: {
    ClassDeclaration: (path) => {
      const node = path.node;
      const id = node.id;
      let constructorFn = babelTypes.functionDeclaration(id, [], babelTypes.blockStatement([]), false, false);
      const protoTypeFns = [];
      node.body.body.forEach(methodDefinition => {
        if (methodDefinition.kind === "constructor") {
          constructorFn = babelTypes.functionDeclaration(id, methodDefinition.params, methodDefinition.body, false, false);
        } else if (methodDefinition.kind === "method") {
          const memberExpression = babelTypes.memberExpression(babelTypes.memberExpression(id, babelTypes.identifier("prototype")), methodDefinition.key);
          const functionExpression = babelTypes.functionExpression(id, methodDefinition.params, methodDefinition.body, false, false);
          protoTypeFns.push(babelTypes.assignmentExpression("=", memberExpression, functionExpression))
        }
      });
      if (!protoTypeFns.length) {
        path.replaceWith(constructorFn)
      } else {
        path.replaceWithMultiple([constructorFn, ...protoTypeFns]);
      }
    }
  }
}
const res = babelCore.transform(code, {
  plugins: [transformClassPlugin]
});

console.log(res.code);
/*
转译后代码：
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function Person() {
  return this.name;
}
*/


