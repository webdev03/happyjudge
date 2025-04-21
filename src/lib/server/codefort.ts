// Type safe codefort client

import { CODEFORT_URL } from '$env/static/private';

async function getLanguages() {
  return (await (await fetch(CODEFORT_URL + '/v1/languages')).json()) as {
    id: string;
    name: string;
  }[];
}

export const languages = await getLanguages();

export async function execute(
  language: string,
  code: string,
  stdin: string,
  compileTimeout: number,
  compileMemoryLimit: number,
  runTimeout: number,
  runMemoryLimit: number,
) {
  return (await (
    await fetch(CODEFORT_URL + '/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language,
        code,
        stdin,
        compileTimeout,
        compileMemoryLimit,
        runTimeout,
        runMemoryLimit,
      }),
    })
  ).json()) as {
    exitCode: number;
    stdout: string;
    stderr: string;
    stats: {
      compile: {
        realTime: number;
        stdout: string;
        stderr: string;
      } | null;
      run: {
        realTime: number;
      };
    };
  };
}
