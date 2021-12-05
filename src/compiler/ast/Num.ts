import { Token } from "../tokens/Token";
import { AST } from "./AST";

export class Num extends AST {

	value: number;
	constructor(public token: Token<number>) {
		super();
		this.value = this.token.value
	}
}