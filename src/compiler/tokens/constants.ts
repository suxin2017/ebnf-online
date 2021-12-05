export enum TokenType {
  /** end of text */
  EOF = 'EOF',
  /** @ */
  AT = 'AT',
  ID = "ID",
  /** : */
  COLON = "COLON",
  SEMI = "SEMI",
  /** ( */
  LPAREN = "LPAREN",
  /** ) */
  RPAREN = "RPAREN",
  /** [ */
  LBRACKET = "LBRACKET",
  /** ] */
  RBRACKET = "RBRACKET",
  /** { */
  LBRACE = "LBRACE",
  /** } */
  RBRACE = "RBRACE",
  /** , */
  COMMA = "COMMA",

  PLUS = "PLUS",
  MINUS = "MINUS",
  MUL = "MUL",
  DIV = "DIV",
  NUMBER = "NUMBER",
  /** | */
  OR = "OR",
  /** # */
  HASH = "HASH",
  /** = */
  EQUAL = "EQUAL",
  /** ‘ */
  SINGLE_QUOTE = "SINGLE_QUOTE",
  /** " */
  DOUBLE_QUOTE = "DOUBLE_QUOTE",
  COMMENT = "COMMENT",
  LINE = "LINE"
}