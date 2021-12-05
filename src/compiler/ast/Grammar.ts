import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";


export class Grammar extends AST {

	constructor(public rule: any) {
		super();
	}
}