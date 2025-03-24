import Editor from "@monaco-editor/react";
import loader from "@monaco-editor/loader";

interface MonacoEditorProps {
  codeState: {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
  };
}

export default function MonacoEditor({ codeState }: MonacoEditorProps) {
  loader.config({ paths: { vs: "node_modules/monaco-editor/min/vs" } });

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
