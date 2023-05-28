'use client'
import { useState, useEffect } from 'react';
import './globals.css';
import Editor from '@/Editor';
import { ProviderEditor } from '@/context/ContextEditor';
import { UseEditor } from '@/hooks/useEditor';
import Generete from '@/components/Generete';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {responseMessage} = UseEditor()

  return (
    <html lang='en' className='dark'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ProviderEditor>
        <div className='overflow-hidden w-full h-full relative'>
          <div className='flex h-full flex-1 flex-col md:pl-[260px]'>
            {children}
          </div>
          <div style={{height: 'auto'}} className='dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[400px] md:flex-col'>
            <div className='flex h-full min-h-0 flex-col '>
              <div className='flex h-full w-full flex-1 items-start border-white/20'>
                <nav style={{ overflowY: 'auto'}} className='flex h-full flex-1 flex-col space-y-1 p-2'>
                  <Generete />
                </nav>
              </div>
            </div>
          </div>
        </div>
        </ProviderEditor>
      </body>
    </html>
  );
}
