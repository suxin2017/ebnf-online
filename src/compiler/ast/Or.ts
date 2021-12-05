import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";


export class Or extends AST {
	constructor(public group:any) {
		super();
	}
}