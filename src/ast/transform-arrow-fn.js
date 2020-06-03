const babelCore = require("@babel/core");
//用于AST的lodash工具库，包含构造，验证以及变换AST的方法
const babelTypes = require("babel-types");
const code = `const a = () => 3`;

const transformArrowFnPlugin = {
  visitor: {
    ArrowFunctionExpression: (path) => {
      const node = path.node;
      const id = path.parent.id;
      const params = node.params;
      const body = babelTypes.blockStatement([
        babelTypes.returnStatement(node.body)
      ]);
      const functionExpression = babelTypes.functionExpression(id, params, body, false, false);
      path.replaceWith(functionExpression);
    }
  }
}
const res = babelCore.transform(code, {
  plugins: [transformArrowFnPlugin]
});
console.log(res.code);
//const a = function a() {
//   return 3;
// };