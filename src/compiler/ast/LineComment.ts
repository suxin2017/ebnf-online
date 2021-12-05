import { Token } from "../tokens/Token";
import { AST } from "./AST";

export class LineComment extends AST {

	constructor(public line: any) {
		super();
	}
}