export interface CompileRequest {
  language: string;
  code: string;
  inputs: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface CompileResponse {
  outputs: {
    input: string;
    expectedOutput: string;
    realOutput: string;
    result: boolean;
  }[];
  compileOutput: string;
  compileError: boolean;
}

// @Getter
// @AllArgsConstructor
// public static class Input{
//     private String input;
//     private String expectedOutput;
// }

// @Getter
// @AllArgsConstructor
// public static class CompileRequest {
//     private LanguageType language;
//     private String code;
//     private Input[] inputs;
// }
