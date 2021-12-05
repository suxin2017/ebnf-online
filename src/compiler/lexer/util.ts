export function isAlphabet(char: string | null): char is string {
	if (char == null) {
		return false;
	}
	return /[a-zA-Z]/.test(char);
}

export function isDigit(char: string | null): char is string {
	if(char==null) {
		return false;
	}
	return /[0-9]/.test(char);
}
 
export function isSymbol(char: string | null): char is string {
	if(char==null) {
		return false;
	}
	return /[\+\-\*\/\(\)\[\]\{\}\,\.\#\=\:\;\|\<\>]/.test(char);
}

export function isQuote(char: string | null): char is string {
	if(char==null) {
		return false;
	}
	return /['"]/.test(char);
}