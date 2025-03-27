import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import storage from "../utils/localstorage";

interface InputModalProps {
  setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputData {
  input: string;
  expectedOutput: string;
}

export default function InputModal({ setInputToggle }: InputModalProps) {
  const [inputData, setInputData] = useState<InputData[]>([]);
  const [userInputData, setUserInputData] = useState<InputData[]>([]);

  const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const outputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const addUserInputData = () => {
    setUserInputData((prev) => [...prev, { input: "", expectedOutput: "" }]);
  };

  useEffect(() => {
    setInputData(storage.get("inputData") ?? []);
    setUserInputData(storage.get("userInputData") ?? []);
  }, []);

  useEffect(() => {
    if (userInputData.length === 0) return;
    storage.set("userInputData", userInputData);

    inputRefs.current.forEach((inputRef) => {
      if (inputRef) {
        inputRef.style.height = "auto";
        inputRef.style.height = `${inputRef.scrollHeight}px`;
      }
    });

    outputRefs.current.forEach((outputRef, index) => {
      if (outputRef) {
        outputRef.style.height = "auto";
        outputRef.style.height = `${inputRefs.current[index]?.scrollHeight}px`;
      }
    });
  }, [userInputData]);

  return (
    <div
      className="fixed z-10 w-[100vw] h-[100vh] pt-12 flex items-start justify-center bg-white/10"
      onClick={() => setInputToggle((prev) => !prev)}
    >
      <div
        className="flex flex-col items-center w-5/6 max-h-11/12 bg-white py-4 px-6 rounded-xl overflow-y-scroll input-scroll"
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
                    <p className="text-left">{data.input}</p>
                  </div>
                </div>
                <div className="w-2/5 px-4 py-2">
                  <div className="w-full h-full flex py-2 px-4 justify-start bg-[#E9ECF2] text-gray-600 rounded-sm">
                    <p className="text-left">{data.expectedOutput}</p>
                  </div>
                </div>
              </div>
            </>
          ))}
          {userInputData.map((data, index) => (
            <>
              {/* 사용자 input, output 한 쌍 */}
              <hr className="w-[calc(100%-1rem)] border-1/2 border-[#D7E2EB] border-dotted" />
              <div className="flex flex-row w-full items-center">
                <div className="w-3/5 px-4 py-2 border-r-1 border-[#D7E2EB] flex flex-row items-center justify-between">
                  <textarea
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-full resize-none overflow-hidden py-2 px-4 bg-[#E9ECF2] text-gray-600 rounded-sm"
                    rows={1}
                    value={data.input}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      setUserInputData((prev) => {
                        const copy = [...prev];
                        copy[index].input = target.value;
                        return copy;
                      });
                    }}
                  />
                </div>
                <div className="w-2/5 px-4 py-2 flex flex-row items-center justify-between">
                  <textarea
                    ref={(el) => {
                      outputRefs.current[index] = el;
                    }}
                    className="w-full resize-none overflow-hidden py-2 px-4 bg-[#E9ECF2] text-gray-600 rounded-sm mr-2"
                    rows={1}
                    value={data.expectedOutput}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      setUserInputData((prev) => {
                        const copy = [...prev];
                        copy[index].expectedOutput = target.value;
                        return copy;
                      });
                    }}
                  />
                  <IoClose
                    size={25}
                    color="black"
                    onClick={() => {
                      setUserInputData((prev) => {
                        const copy = [...prev];
                        copy.splice(index, 1);
                        return copy;
                      });
                    }}
                  />
                </div>
              </div>
            </>
          ))}
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
