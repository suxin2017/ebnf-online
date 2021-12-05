import { TokenType } from "./constants";


class Token<T = any> {
	type: TokenType;
	value: T;
	constructor(type: TokenType, value: T) {
		this.type = type;
		this.value = value;
	}

	static new(...params: ConstructorParameters<typeof Token>) {
		return new Token(...params);
	}

	toString() {
		String
		return `Token: { type: ${this.type}, value: ${this.value} }`
	}
}




export { Token }