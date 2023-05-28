'use client'
import { UseEditor } from '@/hooks/useEditor'
import React, {useState} from 'react'
import { BiCopy } from 'react-icons/bi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'


function Generete() {

    const {responseMessage} = UseEditor()


  const [copy, setCopy] = useState(false)


  const copyLink=()=> {
    setCopy(true)
    message.success("Copiado com Sucessor !")
  }


  return (
    <div className='w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]'>
    <div className='text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0'>
      <div className='w-[30px] flex flex-col relative items-end'>
        <div className='relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center'>
          
        </div>
      </div>
      <div className='relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]'>
        <div className='flex flex-grow flex-col gap-3'>
          <div className='min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap'>
            {responseMessage && <CopyToClipboard text={responseMessage} onCopy={copyLink} > 
              <button style={{fontSize: 25}}><BiCopy/></button>
              </CopyToClipboard>}
            <p>{responseMessage}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Generete