import { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import InputModal from "./InputModal";
import OutputBox from "./OutputBox";
import ButtomTabBar from "./ButtomTabBar";

export default function WebCompiler() {
  const [code, setCode] = useState(
    "// 0번. 문제 이름\n\n#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main(){\n\tcin.tie(0)->sync_with_stdio(0);\n\n\treturn 0;\n}"
  );
  const [inputToggle, setInputToggle] = useState(false);

  return (
    <>
      {inputToggle ? <InputModal setInputToggle={setInputToggle} /> : null}
      <div className="w-[calc(95vw-4rem)] h-[calc(92vh-5.25rem)] py-4 bg-[#1E1E1E] rounded-xl">
        <MonacoEditor codeState={{ code, setCode }} />
        <OutputBox />
      </div>
      <ButtomTabBar setInputToggle={setInputToggle} />
    </>
  );
}
