import moment from 'moment';
import { ChatCompletionRequestMessage } from 'openai';

export const ErrorMessage: { [key: number]: string } = {
  400: 'Preveliko pitanje, molimo malo ga skratite!',
  401: 'TIMUR AI KLJUC NIJE DODAN, KUPITE GA NA INSTAGRAMU OD VLASNIKA ! : @timurrr.js',
  403: 'TIMUR AI ODBIJA PRISTUP SERVERU!',
  429: 'TIMUR AI IMA PREVIŠE ZAHTJEVA, MOLIMO POKUŠAJTE KASNIJE!',
  502: 'TIMUR AI DOBIJA GREŠKU MREŽNOG PROLAZA!',
  503: 'TIMUR AI SERVERI SU ZAUZETI, POKUŠAJTE KASNIJE!',
  504: 'TIMUR AI GATEWAY JE ISTEKAO POKUŠAJTE KASNIJE',
  500: 'TIMUR AI SERVERI SU ZAUZETI, POKUŠAJTE KASNIJE!',
};

const systemMessages: ChatCompletionRequestMessage[] = [
  { role: 'system', content: 'Vratite odgovor u obliku umanjenja' },
];

function getSystemMessage (): ChatCompletionRequestMessage[] {
  const currentTime: ChatCompletionRequestMessage = { role: 'system', content: `Vrijeme u Sarajevu: ${moment().format('YYYY-MM-DD HH:mm:ss')} ${moment().format('dddd')}` };
  return [currentTime, ...systemMessages];
}

/**
 * 解析stream流的字符串
 */
function parseStreamText(data: string) {
  const dataList = data?.split('\n')?.filter((l) => l !== '');

  const result = { role: 'assistant', content: '', stop: false };

  dataList.forEach((l) => {
    // 移除"data: "前缀
    const jsonStr = l.replace('data: ', '');

    if (jsonStr === '[DONE]') {
      result.stop = true;
    } else {
      // 将JSON字符串转换为JavaScript对象
      const jsonObj = JSON.parse(jsonStr);
      const delta = jsonObj.choices[0].delta as ChatCompletionRequestMessage;
      if (delta.role) result.role = delta.role;
      else if (delta.content) {
        result.content = `${result.content}${delta.content}`;
      }
    }
  });

  return result;
}

export { getSystemMessage, parseStreamText };
