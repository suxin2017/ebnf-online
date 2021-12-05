import { Grammar } from "../ast/Grammar";
import { Rule } from "../ast/Rule";
import { Terminal } from "../ast/Terminal";
import { Token } from "../tokens/Token";
import { NodeVisitor } from "./Visitor";
import { nanoid } from 'nanoid'

export class EcharttVisitor extends NodeVisitor {
	visit(node: any) {
		if (node instanceof Grammar) {
			return this.visit_Grammar(node);
		} else if (node instanceof Rule) {
			return this.visit_Rule(node);
		} else if (node instanceof Token) {
			return this.visit_Token(node);
		} else if (node instanceof Terminal) {
			return this.visit_Terminal(node);
		} else if (node instanceof Comment) {
			return this.visit_Comment(node);
		}
	}
	visit_Grammar(node: Grammar): any {
		return node.rule?.map((item: any) => this.visit(item)).map((item: any, index: number) => {
			let nodes = item?.map((item: any) => {
				return {
					...item,
					position: {
						...item.position,
						y: index * 100,
					}
				}
			})
			let edges = nodes?.map((item: any, index: number, array: any[]) => {
				if(index === array.length - 1) return;
				return {
					id: nanoid(),
					source: item.id,
					target: array[index + 1]?.id,
				}
			}).filter((item: any) => item)
			if (nodes && edges) {
				return [...nodes, ...edges]
			}return []
		}).flat();
	}
	visit_Rule(node: Rule): any {
		let nodes = [
			this.visit(node.lhs),
			...node.rhs?.map((item: any) => this.visit(item))
		].map((item: any, index, array) => {
			return {
				...item,
				sourcePosition: 'right',
				targetPosition: 'left',
				position: { x: index * 200 }
			}
		})
		return nodes
	}
	visit_Token(node: Token): any {
		return {
			id: nanoid(),
			data: { label: `${node.value}` },
		}
	}
	visit_Terminal(node: Terminal): any {
		return {
			id: nanoid(),
			data: { label: `${node.value}` },
		}
	}
	visit_Comment(node: Comment) {
		
	}
}