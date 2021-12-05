import { TokenType } from "../tokens/constants";
import { Token } from "../tokens/Token";
import { isAlphabet, isDigit, isQuote, isSymbol } from "./util";

const whitePattern = /\s/;

export class Lexer {
  #input: string;
  #pos: number;
  current_char: string | null;
  openSymbol: string | null = null;

  constructor(input: string) {
    this.#input = input;
    this.#pos = 0;
    this.current_char = this.#input[this.#pos];
  }

  error(char: string) {
    throw new Error(`Invalid character: ${char} ${this.#pos}`);
  }

  getId() {
    if (this.openSymbol) {
      let result = '';
      while (this.openSymbol && this.current_char !== this.openSymbol) {
        result += this.current_char;
        this.advance();
      }
      return Token.new(TokenType.ID, result);
    }

    let result = this.current_char;
    this.advance();

    while (isAlphabet(this.current_char)) {
      result += this.current_char;
      this.advance();
    }
    while (this.current_char === '_') {
      result += this.current_char;
      this.advance();
    }

    if (isDigit(this.current_char)) {
      result += this.getNumber();
    }

    return Token.new(TokenType.ID, result);
  }

  getNumber() {
    let result: string = this.current_char!;
    this.advance();
    while (isDigit(this.current_char)) {
      result += this.current_char;
      this.advance();
    }

    if (this.current_char === ".") {
      result += this.current_char;
      this.advance();
      while (isDigit(this.current_char)) {
        result += this.current_char;
        this.advance();
      }
    }

    return result;
  }
  peek(): string | null {
    if (this.#pos + 1 > this.#input.length) {
      return null;
    }
    return this.#input[this.#pos + 1];
  }

  nextLine() {
    let result = '' 
    while (this.current_char !== '\n'
      && this.#pos < this.#input.length) {
      result += this.current_char;
      this.advance();
    }
    return new Token(TokenType.LINE, result);
  }

  getNextToken() {
    while (this.current_char != null) {
      // console.log(this.current_char.charCodeAt(0));

      if (this.current_char.match(whitePattern)) {
        this.skipWhitespace();
        continue;
      }

      if (this.current_char === "@") {
        this.advance();
        return new Token(TokenType.AT, "@");
      }

      if (isAlphabet(this.current_char) || isDigit(this.current_char)
        || this.openSymbol && this.current_char !== this.openSymbol) {
        return this.getId();
      }

      if (this.current_char === ":") {
        this.advance();
        return new Token(TokenType.COLON, ":");
      }

      if (this.current_char === ";") {
        this.advance();
        return new Token(TokenType.SEMI, ";");
      }
      if (this.current_char === '|') {
        this.advance();
        return new Token(TokenType.OR, '|');
      }

      if (this.current_char === "(") {
        this.advance();
        return new Token(TokenType.LPAREN, "(");
      }

      if (this.current_char === ")") {
        this.advance();
        return new Token(TokenType.RPAREN, ")");
      }

      if (this.current_char === "+") {
        this.advance();
        return new Token(TokenType.PLUS, "+");
      }

      if (this.current_char === "-") {
        this.advance();
        return new Token(TokenType.MINUS, "-");
      }

      if (this.current_char === "*") {
        this.advance();
        return new Token(TokenType.MUL, "*");
      }
      if (this.current_char === "/" && this.peek() === "/") {
        this.advance();
        this.advance();
        return new Token(TokenType.COMMENT, '//')
      }

      if (this.current_char === "/") {
        this.advance();
        return new Token(TokenType.DIV, "/");
      }
      if (this.current_char === "=") {
        this.advance();
        return new Token(TokenType.EQUAL, "=");
      }
      if (this.current_char === '"') {
        this.openSymbol = this.openSymbol === this.current_char ? null : '"';
        this.advance();
        return new Token(TokenType.DOUBLE_QUOTE, '"');
      }
      if (this.current_char === "'") {
        this.openSymbol = this.openSymbol === this.current_char ? null : "'";
        this.advance();
        return new Token(TokenType.SINGLE_QUOTE, "'");
      }
      if (this.current_char === "[") {
        this.advance();
        return new Token(TokenType.LBRACKET, "[");
      }
      if (this.current_char === "]") {
        this.advance();
        return new Token(TokenType.RBRACKET, "]");
      }
      if (this.current_char === "{") {
        this.advance();
        return new Token(TokenType.LBRACE, "{");
      }
      if (this.current_char === "}") {
        this.advance();
        return new Token(TokenType.RBRACE, "}");
      }
      if (this.current_char === ",") {
        this.advance();
        return new Token(TokenType.COMMA, ",");
      }



      this.error(this.current_char);
    }

    return Token.new(TokenType.EOF, null);
  }

  advance(): void {
    this.#pos++;
    if (this.#pos > this.#input.length) {
      this.current_char = null;
    } else {
      this.current_char = this.#input[this.#pos];
    }
  }

  skipWhitespace(): void {
    while (
      /\s/.test(this.#input[this.#pos]) &&
      this.#pos < this.#input.length
    ) {
      this.advance();
    }
  }
}


