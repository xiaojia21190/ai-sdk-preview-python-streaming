import { createDataStreamResponse, streamText } from 'ai';
import { createOpenAI, openai } from '@ai-sdk/openai';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const perplexity = createOpenAI({
  baseURL: process.env.OPENAI_API_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const data = await request.json();


    return createDataStreamResponse({
      execute: async (dataStream) => {
        // 发送消息ID确认
        dataStream.writeData('initialized call');

        const result = streamText({
          model: perplexity('gpt-4o'),
          messages: data.messages,
          onChunk() {
          },
          onFinish() {
            // message annotation:
            // call annotation:
            dataStream.writeData('call completed');
          },
        });
        console.log(result);
        result.mergeIntoDataStream(dataStream);

        // call annotation:
        dataStream.writeData('call completed');
        // const result = streamText({
        //   model: openai('gpt-4o'),
        //   messages: data.messages,
        //   onChunk() {
        //   },
        //   onFinish() {
        //     // message annotation:
        //   },
        // });

        // result.mergeIntoDataStream(dataStream);
        /**
         * 2:[{"type":"user-message-id","content":"v6Bg7zaBbB4CljPR"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\"\",\"role\":\"assistant\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\"Sure\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\",\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\" how\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\" can\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\" I\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\" assist\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\" you\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\"?\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"}]
2:[{"type":"text-delta","content":"{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{},\"logprobs\":null,\"finish_reason\":\"stop\",\"index\":0}],\"usage\":null}"}]

         */

        // dataStream.writeData("{\"id\":\"chatcmpl-B6uPgtvYdp1yVyc2BW9DE86w7lUZt\",\"object\":\"chat.completion.chunk\",\"created\":1740986520,\"model\":\"gpt-4o-2024-11-20\",\"system_fingerprint\":\"fp_b705f0c291\",\"choices\":[{\"delta\":{\"content\":\" I\"},\"logprobs\":null,\"finish_reason\":null,\"index\":0}],\"usage\":null}"
        // )

        // try {
        //   const res = await fetch(env.YUNWU_API_URL, {
        //     method: 'POST',
        //     body: JSON.stringify(coverMessage),
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': `Bearer ${env.YUNWU_API_KEY}`
        //     },
        //   });

        //   if (!res.ok) {
        //     const errorText = await res.text().catch(() => res.statusText);
        //     console.error(`云悟API请求失败: ${res.status} ${res.statusText}`, errorText);
        //     dataStream.writeData({
        //       type: 'error',
        //       content: `API请求失败(${res.status}): ${errorText}`
        //     });
        //     return;
        //   }

        //   if (res.body) {
        //     const reader = res.body.getReader();
        //     const textDecoder = new TextDecoder();
        //     let buffer = '';

        //     try {
        //       while (true) {
        //         const { done, value } = await reader.read();
        //         if (done) break;

        //         // 处理返回的SSE格式数据
        //         const textChunk = textDecoder.decode(value);
        //         buffer += textChunk;

        //         // 处理云悟API返回的数据格式
        //         // 可能需要解析返回的SSE格式，根据实际情况调整
        //         const lines = buffer.split('\n');
        //         buffer = lines.pop() || '';

        //         for (const line of lines) {
        //           if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        //             try {
        //               const content = line.substring(6);
        //               dataStream.writeData({ type: 'text-delta', content });
        //             } catch (e) {
        //               console.warn('解析数据块失败:', line, e);
        //             }
        //           }
        //         }
        //       }
        //     } catch (error) {
        //       console.error('读取流时出错:', error);
        //       dataStream.writeData({ type: 'error', content: '读取API响应时出错' });
        //     } finally {
        //       reader.releaseLock();
        //     }
        //   }
        // } catch (error) {
        //   console.error('API请求出错:', error);
        //   dataStream.writeData({
        //     type: 'error',
        //     content: `API请求失败: ${error instanceof Error ? error.message : String(error)}`
        //   });
        // }
      },
      onError: error => {
        // Error messages are masked by default for security reasons.
        // If you want to expose the error message to the client, you can do so here:
        return error instanceof Error ? error.message : String(error);
      },
    });
  } catch (error) {
    console.error('处理请求时出错:', error);
    return new Response(JSON.stringify({ error: '处理请求失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
