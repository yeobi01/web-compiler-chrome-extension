export default function ButtomTabBar() {
  return (
    <div className="flex flex-row items-center gap-2 self-end h-[3rem] mt-2">
      <p className="py-2 px-3 bg-[#1E1E1E] text-[0.9rem] text-gray-300 font-bold rounded-md cursor-pointer">
        테스트 케이스 추가
      </p>
      <p className="py-2 px-3 bg-[#1E1E1E] text-[0.9rem] text-gray-300 font-bold rounded-md cursor-pointer">
        코드 실행
      </p>
    </div>
  );
}
