/* SystemJS module definition */
// declare var module: {
//   id: string;
// };

// declare var require: NodeRequire;




/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module "*.json" {
  const value: any;
  export default value;
}
