function collectSamples(): { input: string; expectedOutput: string }[] {
  const samples: { input: string; expectedOutput: string }[] = [];

  for (let i = 1; ; i++) {
    const inputExample = document.getElementById(`sample-input-${i}`);
    const outputExample = document.getElementById(`sample-output-${i}`);

    if (!inputExample || !outputExample) break;

    samples.push({
      input: inputExample.textContent?.trim() ?? "",
      expectedOutput: outputExample.textContent?.trim() ?? "",
    });
  }

  console.log("백준 예제들:", samples);

  return samples;
}

chrome.runtime.sendMessage(
  {
    type: "BAEKJOON_PROBLEM_DATA",
    payload: collectSamples(),
  },
  (res) => {
    if (chrome.runtime.lastError) {
      console.error("메시지 전송 실패:", chrome.runtime.lastError.message);
    } else {
      console.log("응답:", res);
    }
  }
);
