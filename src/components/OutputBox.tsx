export default function OutputBox() {
  return (
    <div className="h-1/4 flex flex-col px-4 items-start">
      <div className="flex flex-row w-full justify-between items-center mb-2">
        <p className="font-bold text-gray-300">실행 결과</p>
      </div>
      <div className="flex flex-col h-full w-full overflow-y-scroll output-scroll pr-2">
        {outputData ? null : (
          <p className="self-start">실행 결과가 여기에 표시됩니다.</p>
        )}
        {outputData.map((data, index) => (
          <p className="w-full flex flex-col items-start p-2 text-[0.9rem] output-border whitespace-pre-line">
            <p className="font-bold text-gray-300">테스트 {index}</p>
            <div className="w-full flex flex-row">
              <p className="w-1/5 min-w-24 text-right text-gray-600 px-2">
                입력값 〉
              </p>
              {data.input}
            </div>
            <div className="w-full flex flex-row">
              <p className="w-1/5 min-w-24 text-right text-gray-600 px-2">
                기댓값 〉
              </p>
              {data.expectOutput}
            </div>
            <div className="w-full flex flex-row">
              <p className="w-1/5 min-w-24 text-right text-gray-600 px-2">
                실행 결과 〉
              </p>
              <p
                className={`${data.result ? "text-green-400" : "text-red-400"}`}
              >
                {data.realOutput}
              </p>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
}

const outputData = [
  {
    input: "1 2\n",
    expectOutput: "3\n",
    realOutput: "3\n",
    result: true,
  },
  {
    input: "1 2\n 3 4\n",
    expectOutput: "13\n",
    realOutput: "10\n",
    result: false,
  },
  {
    input: "1 2\n 3 4\n",
    expectOutput: "13\n",
    realOutput: "10\n",
    result: false,
  },
];
