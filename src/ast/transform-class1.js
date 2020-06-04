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
const code = `class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}`;
// 原始ast
const ast = esprima.parse(code);

let constructorFn = {
  type: "FunctionExpression",
  async: false,
  body: {
    type: "BlockStatement",
    expression: false,
    generator: false,
    id: null,
    body: {
      type: "ReturnStatement"
    }
  },
  params: [],
  id: null,
};

const protoTypeFns = [];
let hasClass = false;
estraverse.traverse(ast, {
  enter(node) {
    if (node.type === "ClassDeclaration") {
      hasClass = true;
      const id = node.id;
      const body = node.body;

      body.body.forEach(methodDefinition => {
        if (methodDefinition.kind === "constructor") {
          constructorFn = {
            ...methodDefinition.value,
            id,
          }
        } else if (methodDefinition.kind === "method") {
          protoTypeFns.push({
            type: "ExpressionStatement",
            expression: {
              type: "AssignmentExpression",
              operator: "=",
              left: {
                type: "MemberExpression",
                object: {
                  type: "MemberExpression",
                  object: {
                    ...id,
                  },
                  property: {
                    type: "Identifier",
                    name: "prototype",
                  }
                },
                property: {
                  ...methodDefinition.key
                },
                computed: false,
              },
              right: {
                type: "FunctionExpression",
                params: methodDefinition.value.params,
                body: methodDefinition.value.body,
              }
            }
          });
        }
      });

      constructorFn.id = id;
    }
  },
  leave(node) {
    if (node.type === "Program") {
      if (hasClass) {
        node.body = [constructorFn, ...protoTypeFns];
      }
    }
  }
});
// 重新生成代码
const res = escodegen.generate(ast);
console.log(res);  
/*
转译后代码：
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function Person() {
  return this.name;
}
*/
