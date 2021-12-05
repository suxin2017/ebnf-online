import { AST } from "../ast/AST";

export abstract class NodeVisitor {
	abstract visit(node: AST): any;
}