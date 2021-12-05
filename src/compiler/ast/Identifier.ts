import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";


export class Identifier extends AST {

	value: string;

	constructor(public token:any) {
		super();
		this.value = token.value;
	}
}