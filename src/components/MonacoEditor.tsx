import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import loader from "@monaco-editor/loader";
import storage from "../utils/localstorage";

interface MonacoEditorProps {
  codeState: {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
  };
}

export default function MonacoEditor({ codeState }: MonacoEditorProps) {
  loader.config({ paths: { vs: "node_modules/monaco-editor/min/vs" } });

  useEffect(() => {
    codeState.setCode((prev) => storage.get("code") ?? prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 이거 나중에 수정해야함
    if (
      codeState.code ===
      "// 0번. 문제 이름\n\n#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main(){\n\tcin.tie(0)->sync_with_stdio(0);\n\n\treturn 0;\n}"
    )
      return;
    storage.set("code", codeState.code);
  }, [codeState.code]);

  return (
    <Editor
      theme="vs-dark"
      defaultLanguage="cpp"
      height="75%"
      options={{ wordWrap: "on", minimap: { enabled: false } }}
      value={codeState.code}
      onChange={(value) => codeState.setCode(value || "")}
    />
  );
}

// cpp python
// #1E1E1E <- vs-dark
// option <- https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneEditorConstructionOptions.html
