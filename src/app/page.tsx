'use client';
import { Inter } from '@next/font/google';
import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Chat } from '@/components/Chat';
import { UseEditor } from '@/hooks/useEditor';

export default function Home() {

  const {requestMessage,responseMessage,setRequestMessage,setResponseMessage} = UseEditor()
 
  const [loading, setLoading] = useState<boolean>(false);

  const generateResponse = async (e: any) => {
    e.preventDefault();
    setResponseMessage('');
    setRequestMessage('')
    setLoading(true);
    // criar uma chamada api do tipo post para o endereço http://localhost:3000/api/gpt3 com objeto body com a propriedade prompt
    // o valor da propriedade prompt deve ser o valor da variável requestMessage

    const response = await fetch('/api/gpt3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: requestMessage }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunkValue = decoder.decode(value);
      setResponseMessage((prev: any) => prev + chunkValue);
    }
    setLoading(false);
  };

  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
 
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`${responseMessage}`);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [html, css]);


  return (
    <main className='relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1'>
      <div className='flex-1 overflow-hidden'>
        <div className='h-full dark:bg-gray-800'>
          <div className='flex flex-col items-center text-sm h-full dark:bg-gray-800'>
            {responseMessage === '' ? (
              loading ? (
                <div className='flex flex-col items-center justify-center h-full text-gray-100 font-bold'>
                  Carregando...
                </div>
              ) : (
               <Hero />
              )
            ) : (
              <iframe
              srcDoc={responseMessage}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="80%"
              height="87%"
              style={{position: 'relative', left: 50, top: 10}}
            />
            )}
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient'>
        {loading ? (
          ''
        ) : (
          <form
            className='stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6'
            onSubmit={(e) => generateResponse(e)}
          >
            <div className='relative flex h-full flex-1 md:flex-col'>
              <div className='flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center'></div>
              <div className='flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]'>
                <input
                  className='m-0 w-full outline-none resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0'
                  type='text'
                  value={requestMessage}
                  placeholder='Persa o seu codigo ao SmartCode...'
                  onChange={(e) => setRequestMessage(e.target.value)}
                ></input>
                <button className='absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    stroke-width='2'
                    viewBox='0 0 24 24'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='h-4 w-4 mr-1'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <line x1='22' y1='2' x2='11' y2='13'></line>
                    <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        )}

        <div className='px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6'>
          <a
            href='https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
            target='_blank'
            rel='noreferrer'
            className='underline'
          >
           SmartCode Version 1.0
          </a>
          . Free Research Preview. Our goal is to make AI systems more natural
          and safe to interact with. Your feedback will help us improve.
        </div>
      </div>
    </main>
  );
}
