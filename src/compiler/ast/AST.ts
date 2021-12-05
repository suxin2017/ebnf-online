import { BinOp } from "./BinOp";
import { Num } from "./Num";
import { UnaryOp } from "./UaryOp";

export abstract class AST {
}

export type ASTType = BinOp | Num | UnaryOp;