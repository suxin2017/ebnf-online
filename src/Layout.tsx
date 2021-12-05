import React, { useContext } from "react";
import SplitPane from "react-split-pane";
import { Charts } from "./Charts";
import "allotment/dist/style.css";
import { ImmerHook, useImmer } from "use-immer";
import "./SplitPanel.css";
type Array2Obj<T extends [any, any]> = {
  state: T[0];
  setState: T[1];
};
type TAppContext = Array2Obj<
  ImmerHook<{
    ebnf: string;
    currentLine: string;
  }>
>;
const AppContext = React.createContext<TAppContext>({} as TAppContext);
export const useAppContext = () => React.useContext(AppContext);

const Layout: React.FC = () => {
  const [state, setState] = useImmer({
    ebnf: `
letter = "A" | "B" | "C" | "D" | "E" | "F" | "G"
	| "H" | "I" | "J" | "K" | "L" | "M" | "N"
	| "O" | "P" | "Q" | "R" | "S" | "T" | "U"
	| "V" | "W" | "X" | "Y" | "Z" | "a" | "b"
	| "c" | "d" | "e" | "f" | "g" | "h" | "i"
	| "j" | "k" | "l" | "m" | "n" | "o" | "p"
	| "q" | "r" | "s" | "t" | "u" | "v" | "w"
	| "x" | "y" | "z" ;
// digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
symbol = "[" | "]" | "{" | "}" | "(" | ")" | "<" | ">"
		| "'" | '"' | "=" | "|" | "." | "," | ";" ;
// character = letter | digit | symbol | "_" ;
// identifier = letter , { letter | digit | "_" } ;
// terminal = "'" , character , { character } , "'" 
// 		  | '"' , character , { character } , '"' ;
// lhs = identifier ;
// rhs = identifier
// 	| terminal
// 	| "[" , rhs , "]"
// 	| "{" , rhs , "}"
// 	| "(" , rhs , ")"
// 	| rhs , "|" , rhs
// 	| rhs , "," , rhs ;
// rule = lhs , "=" , rhs , ";" ;
// grammar = { rule } ;

`,
    currentLine: "",
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      <SplitPane minSize={600} split="vertical">
        <div className="panel">
          {state.ebnf.split(/[^"];/).map((item) => {
            return (
              <div
                key={item}
                className="rule"
                onClick={() => {
                  setState((draft) => {
                    draft.currentLine = item + ";";
                  });
                }}
              >
                <pre>{item};</pre>
              </div>
            );
          })}
        </div>
        <div className="panel">
          <Charts />
        </div>
      </SplitPane>
    </AppContext.Provider>
  );
};

export default Layout;
