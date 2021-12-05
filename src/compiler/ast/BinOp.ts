import { TokenType } from "../tokens/constants";
import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";

export class BinOp extends AST {
	constructor(public left: ASTType, public op: Token, public right: ASTType) {
		super();
	}
}

