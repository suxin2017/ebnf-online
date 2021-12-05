import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";
import { BinOp } from "./BinOp";
import { Num } from "./Num";

export class UnaryOp extends AST {

	value: string;
	constructor(public token: Token<string>, public expr: ASTType) {
		super();
		this.value = this.token.value;
	}
}