import React from "react";
import { Parser } from "./compiler/Parser";
import { Lexer } from "./compiler/lexer";
import { EcharttVisitor } from "./compiler/visitor/EchartVisitor";
import ReactFlow from "react-flow-renderer";
import { useAppContext } from "./Layout";

export const Charts = () => {
  const {state} = useAppContext()
  const lexer = new Lexer(state.ebnf);

  // const lexer = new Lexer("1+1");
  const parser = new Parser(lexer);
  const tokens = parser.parse();
  console.log(tokens);
  const echatsVisitor = new EcharttVisitor();
  const data = echatsVisitor.visit(tokens);
  console.log(data);

  const elements = data;
  return (
    <div style={{ height: 600 }}>
      <ReactFlow elements={elements} />
    </div>
  );
};
