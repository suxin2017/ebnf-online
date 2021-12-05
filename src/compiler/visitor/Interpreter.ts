import { AST } from "../ast/AST";
import { BinOp } from "../ast/BinOp";
import { Num } from "../ast/Num";
import { UnaryOp } from "../ast/UaryOp";
import { Lexer } from "../lexer";
import { Parser } from "../Parser";
import { TokenType } from "../tokens/constants";
import { NodeVisitor } from "./Visitor";

class Interpreter extends NodeVisitor {

	visit(node: AST) {
		if (node instanceof Num) {
			return this.visitNum(node);
		} else if (node instanceof BinOp) {
			return this.visitBinOp(node);
		} else if (node instanceof UnaryOp) {
			return this.visitUnaryOp(node);
		}
	}

	visitUnaryOp(node: UnaryOp): number {
		return node.token.type === TokenType.PLUS ?
			+<number>this.visit(node.expr) :
			-<number>this.visit(node.expr);
	}

	visitNum(node: Num) {
		return node.value;
	}

	visitBinOp(node: BinOp): number | undefined {
		if (node.op.type === TokenType.PLUS) {
			return <number>this.visit(node.left) + <number>this.visit(node.right);
		} else if (node.op.type === TokenType.MINUS) {
			return <number>this.visit(node.left) - <number>this.visit(node.right);
		} else if (node.op.type === TokenType.MUL) {
			return <number>this.visit(node.left) * <number>this.visit(node.right);
		} else if (node.op.type === TokenType.DIV) {
			return <number>this.visit(node.left) / <number>this.visit(node.right);
		}
	}
}

const lexer = new Lexer("1+-1+(1+-2)*3/4+(1-+2)");
// const lexer = new Lexer("1+1");
const parser = new Parser(lexer);
const interpreter = new Interpreter();

console.log(interpreter.visit(parser.parse()));