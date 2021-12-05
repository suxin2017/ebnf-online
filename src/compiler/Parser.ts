import { AST, ASTType } from "./ast/AST";
import { BinOp } from "./ast/BinOp";
import { Concatenation } from "./ast/Concatenation";
import { Grammar } from "./ast/Grammar";
import { LineComment } from "./ast/LineComment";
import { Num } from "./ast/Num";
import { Rule } from "./ast/Rule";
import { Terminal } from "./ast/Terminal";
import { UnaryOp } from "./ast/UaryOp";
import { Lexer } from "./lexer";
import { TokenType } from "./tokens/constants";
import { Token } from "./tokens/Token";

/**
 * programer: variable | selector
 * expr： term (PLUS term | MINUS term)*
 * term: factor (MUL factor | DIV factor)*
 * factor: NUMBER 
 * 			| PLUS factor
 * 			| MINUS factor 
 * 			| LPAREN expr RPAREN 
 * property: Id COLON expr
 * variable: ID
 */
/**
 *  selector:
 * id_selector: #ID
 * class_selector: .ID
 * all_selector: *
 * element_selector: element (' ' | '>' | '+' | '~') element*
 * 
 */
export class Parser {
	lexer: Lexer;
	currentToken: Token;

	constructor(lexer: Lexer) {
		this.lexer = lexer
		this.currentToken = this.lexer.getNextToken();
	}

	parse() {
		let node = this.grammar();
		this.eat(TokenType.EOF);
		return node;
	}
	eat(tokenType: TokenType) {
		if (this.currentToken.type === tokenType) {
			this.currentToken = this.lexer.getNextToken();
		} else {
			this.error(tokenType, this.currentToken);
		}
	}

	eatLine() {
		const line = this.lexer.nextLine();
		this.currentToken = this.lexer.getNextToken();
		return line;
	}

	error(expect: TokenType, actual: Token) {
		throw new Error(`Error parsing input ,expect token type ${expect} but get token type ${actual.type} value ${actual.value}`)
	}


	terminal() {
		if (this.currentToken.type === TokenType.SINGLE_QUOTE) {
			this.eat(TokenType.SINGLE_QUOTE);
			let node = this.currentToken;
			this.eat(TokenType.ID);
			this.eat(TokenType.SINGLE_QUOTE);
			return new Terminal(node);
		} else if (this.currentToken.type === TokenType.DOUBLE_QUOTE) {
			this.eat(TokenType.DOUBLE_QUOTE);
			let node = this.currentToken;
			this.eat(TokenType.ID);
			this.eat(TokenType.DOUBLE_QUOTE);
			return new Terminal(node)
		}
	}

	comment() {
		this.eat(TokenType.COMMENT);
		return new LineComment(this.eatLine());
	}

	expr(): any {
		let nodes: any[] = [];
		if ([TokenType.SINGLE_QUOTE, TokenType.DOUBLE_QUOTE].includes(this.currentToken.type)) {

			nodes.push(this.terminal());

		} else if (TokenType.LBRACE === this.currentToken.type) {
			// let token = new 
			this.eat(TokenType.LBRACE);
			nodes.push(...this.expr());
			this.eat(TokenType.RBRACE);

		} else if (TokenType.LBRACKET === this.currentToken.type) {

			this.eat(TokenType.LBRACKET);
			nodes.push(...this.expr());
			this.eat(TokenType.RBRACKET);

		} else if (TokenType.LPAREN === this.currentToken.type) {

			this.eat(TokenType.LPAREN);
			nodes.push(...this.expr());
			this.eat(TokenType.RPAREN);

		} else if (TokenType.ID === this.currentToken.type) {
			let token = this.currentToken;
			nodes.push(token);
			this.eat(TokenType.ID);
		}

		while (TokenType.OR === this.currentToken.type) {
			this.eat(TokenType.OR);
			nodes.push(...this.expr());
		}

		while (TokenType.COMMA === this.currentToken.type) {
			this.eat(TokenType.COMMA);
			const children = this.expr()
			nodes.push(...children);
		}

		return nodes;
	}

	rule() {
		if (this.currentToken.type === TokenType.ID) {

			let lhs = this.currentToken;
			this.eat(TokenType.ID);
			this.eat(TokenType.EQUAL);
			let rhs = this.expr();
			this.eat(TokenType.SEMI);
			return new Rule(lhs, rhs);
		}
	}

	grammar() {
		let rules = []
		while (this.currentToken.type !== TokenType.EOF) {
			if (this.currentToken.type === TokenType.COMMENT) {
				const comment = this.comment();
				rules.push(comment);
			} else {
				rules.push(this.rule());
			}
		}
		return new Grammar(rules);
	}
}
