import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";


export class Terminal extends AST {

	value: string;
	constructor(public token: Token<string>) {
		super();
		this.value = this.token.value;
	}
}