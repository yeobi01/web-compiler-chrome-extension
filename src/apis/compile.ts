import { CompileRequest, CompileResponse } from "../types/CompileDTO";
import { api } from "./axios";

export const compile = async ({ language, code, inputs }: CompileRequest) => {
  const response = await api.post<CompileResponse>("/compile", {
    language,
    code,
    inputs,
  });
  return response.data;
};
