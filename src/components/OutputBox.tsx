import { CompileResponse } from "../types/CompileDTO";

interface OutputBoxProps {
  outputData: CompileResponse | null;
}

export default function OutputBox({ outputData }: OutputBoxProps) {

  const sanitizeOutput = (output: string) => {
    const filename = output.split(":")[0];
    console.log(output);
    return output.replaceAll(filename, "main.cpp");
  }

  return (
    <div className="h-1/4 flex flex-col px-4 items-start">
      <div className="flex flex-row w-full justify-between items-center mb-2">
        <div className="font-bold text-[1rem] text-gray-300">실행 결과</div>
      </div>
      <div className="flex flex-col h-full w-full overflow-y-scroll output-scroll pr-2">
        {!outputData && (
          <p className="self-start text-gray-300">
            실행 결과가 여기에 표시됩니다.
          </p>
        )}
        {
          outputData?.compileError && (
            <p className="self-start text-red-400 text-start font-mono">{sanitizeOutput(outputData.compileOutput).split("\n").map(line => {
              return <pre key={line}>{"ㅤ" + line}<br/></pre>;
            })}</p>
          )
        }
        {outputData?.outputs?.map((data, index) => (
          <div className="w-full flex flex-col items-start p-2 text-[0.9rem] output-border whitespace-pre-line">
            <p className="font-bold text-gray-300">테스트 {index}</p>
            <div className="w-full flex flex-row text-left">
              <p className="w-1/5 min-w-24 text-right text-gray-600 px-2">
                입력값 〉
              </p>
              {data.input}
            </div>
            <div className="w-full flex flex-row text-left">
              <p className="w-1/5 min-w-24 text-right text-gray-600 px-2">
                기댓값 〉
              </p>
              {data.expectedOutput}
            </div>
            <div className="w-full flex flex-row text-left">
              <p className="w-1/5 min-w-24 text-right text-gray-600 px-2">
                실행 결과 〉
              </p>
              <p
                className={`${data.result ? "text-green-400" : "text-red-400"}`}
              >
                {data.realOutput}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
