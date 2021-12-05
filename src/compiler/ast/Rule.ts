import { Token } from "../tokens/Token";
import { AST, ASTType } from "./AST";


export class Rule extends AST {

	constructor(public lhs: any, public rhs: any) {
		super();
	}
}