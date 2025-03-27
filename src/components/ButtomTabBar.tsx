"use client";

import { CompileResponse } from "../types/CompileDTO";
import { compile } from "../apis/compile";
import storage from "../utils/localstorage";

interface ButtomTabBarProps {
  setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setOutputData: React.Dispatch<React.SetStateAction<CompileResponse | null>>;
}

export default function ButtomTabBar({
  setInputToggle,
  setOutputData,
}: ButtomTabBarProps) {
  const getOutput = async () => {
    const code = storage.get("code");
    const inputs = storage.get("inputData");
    const userInputs = storage.get("userInputData");
    if (userInputs) {
      inputs.push(...userInputs);
    }
    const outputs = await compile({ language: "CPP", code, inputs });
    setOutputData(outputs);
  };

  return (
    <div className="flex flex-row items-center gap-2 self-end h-[3rem] mt-2">
      <p
        className="py-2 px-3 bg-[#1E1E1E] text-[0.9rem] text-gray-300 font-bold rounded-md cursor-pointer"
        onClick={() => setInputToggle((prev) => !prev)}
      >
        테스트 케이스 추가
      </p>
      <div
        className="py-2 px-3 bg-[#1E1E1E] text-[0.9rem] text-gray-300 font-bold rounded-md cursor-pointer"
        onClick={getOutput}
      >
        코드 실행
      </div>
    </div>
  );
}
