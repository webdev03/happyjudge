// Type safe codefort client

import { CODEFORT_URL } from '$env/static/private';

async function getLanguages() {
  return (await (await fetch(CODEFORT_URL + '/v1/languages')).json()) as {
    id: string;
    name: string;
  }[];
}

export const languages = await getLanguages();

export function execute(code: string, language: string) {
  // TODO
}
