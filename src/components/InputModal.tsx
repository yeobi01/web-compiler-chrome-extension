import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import storage from "../utils/localstorage";

interface InputModalProps {
  setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputData {
  input: string;
  expectOutput: string;
}

export default function InputModal({ setInputToggle }: InputModalProps) {
  const [userInputData, setUserInputData] = useState<InputData[]>([]);

  const addUserInputData = () => {
    setUserInputData((prev) => [...prev, { input: "", expectOutput: "" }]);
  };

  useEffect(() => {
    setUserInputData(storage.get("userInputData") ?? []);
  }, []);

  useEffect(() => {
    if (userInputData.length === 0) return;
    storage.set("userInputData", userInputData);
  }, [userInputData]);

  return (
    <div
      className="fixed z-10 w-[100vw] h-[100vh] pt-12 flex items-start justify-center bg-white/10"
      onClick={() => setInputToggle((prev) => !prev)}
    >
      <div
        className="flex flex-col items-center w-5/6 bg-white py-4 px-6 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between w-full">
          <p className="self-start font-black text-[1.5rem] text-gray-800">
            테스트 케이스 추가
          </p>
          <div
            className="cursor-pointer"
            onClick={() => setInputToggle((prev) => !prev)}
          >
            <IoClose size={30} color="black" />
          </div>
        </div>

        {/* 예제 테이블 */}
        <div className="flex flex-col items-center w-full mt-4 border-1 border-[#D7E2EB] whitespace-pre-line">
          <div className="flex flex-row w-full">
            <div className="flex items-center justify-between w-3/5 px-4 py-2 font-bold text-gray-800 border-r-1 border-[#D7E2EB]">
              예제 입력
              <div
                className="py-1 px-2 bg-blue-500 text-[0.7rem] text-white font-bold rounded-md cursor-pointer"
                onClick={addUserInputData}
              >
                + 추가
              </div>
            </div>
            <div className="flex items-center w-2/5 px-4 py-2 font-bold text-gray-800">
              예제 출력
            </div>
          </div>
          <hr className="w-full border-1/2 border-[#D7E2EB]" />
          {inputData.map((data, index) => (
            <>
              {index ? (
                <hr className="w-[calc(100%-1rem)] border-1/2 border-[#D7E2EB] border-dotted" />
              ) : null}
              <div className="flex flex-row w-full">
                <div className="w-3/5 px-4 py-2 border-r-1 border-[#D7E2EB]">
                  <div className="w-full h-full flex py-2 px-4 justify-start bg-[#E9ECF2] text-gray-600 rounded-sm">
                    <p>{data.input}</p>
                  </div>
                </div>
                <div className="w-2/5 px-4 py-2">
                  <div className="w-full h-full flex py-2 px-4 justify-start bg-[#E9ECF2] text-gray-600 rounded-sm">
                    <p>{data.expectOutput}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
          {userInputData.map((data, index) => (
            <>
              <hr className="w-[calc(100%-1rem)] border-1/2 border-[#D7E2EB] border-dotted" />
              <div className="flex flex-row w-full">
                <div className="w-3/5 px-4 py-2 border-r-1 border-[#D7E2EB]">
                  <textarea
                    className="w-full resize-none overflow-hidden py-2 px-4 bg-[#E9ECF2] text-gray-600 rounded-sm"
                    rows={1}
                    value={data.input}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto"; // 높이 초기화
                      target.style.height = `${target.scrollHeight}px`; // 내용에 맞게 높이 설정
                      setUserInputData((prev) => {
                        const copy = [...prev];
                        copy[index].input = target.value;
                        return copy;
                      });
                    }}
                  />
                </div>
                <div className="w-2/5 px-4 py-2">
                  <textarea
                    className="w-full resize-none overflow-hidden py-2 px-4 bg-[#E9ECF2] text-gray-600 rounded-sm"
                    rows={1}
                    value={data.expectOutput}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto"; // 높이 초기화
                      target.style.height = `${target.scrollHeight}px`; // 내용에 맞게 높이 설정
                      setUserInputData((prev) => {
                        const copy = [...prev];
                        copy[index].expectOutput = target.value;
                        return copy;
                      });
                    }}
                  />
                </div>
              </div>
            </>
          ))}
          {/* p가 아니라 input box로 바꿔야한다. */}
        </div>

        <div
          className="self-end mt-3 py-2 px-3 bg-blue-500 text-[0.9rem] text-white font-bold rounded-md cursor-pointer"
          onClick={() => setInputToggle((prev) => !prev)}
        >
          확인
        </div>
      </div>
    </div>
  );
}

const inputData = [
  {
    input: "1 2\n",
    expectOutput: "3\n",
  },
  {
    input: "1 2\n 3 4\n",
    expectOutput: "13\n",
  },
  {
    input: "1 2\n 3 4\n",
    expectOutput: "13\n",
  },
];
