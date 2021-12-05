import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";


export class Concatenation extends AST {
	constructor(public children:any[]) {
		super();
	}
}