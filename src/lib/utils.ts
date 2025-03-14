
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para verificar se uma string possui código formatado
export function containsCodeBlock(text: string): boolean {
  return text.includes('```')
}

// Função para formatar código em blocos de código
export function formatCodeBlocks(text: string): React.ReactNode[] {
  if (!containsCodeBlock(text)) {
    return [<p key="0">{text}</p>]
  }

  const segments = text.split(/(```[\s\S]*?```)/g)
  
  return segments.map((segment, index) => {
    if (segment.startsWith('```') && segment.endsWith('```')) {
      const codeContent = segment.slice(3, -3).trim()
      const firstLineBreakIndex = codeContent.indexOf('\n')
      
      // Extract language if specified
      let language = ''
      let code = codeContent
      
      if (firstLineBreakIndex !== -1) {
        language = codeContent.slice(0, firstLineBreakIndex).trim()
        code = codeContent.slice(firstLineBreakIndex + 1)
      }
      
      return (
        <pre key={index} className="mt-2 mb-2 rounded-md bg-muted p-4 overflow-x-auto text-sm">
          <code className="whitespace-pre">{code}</code>
        </pre>
      )
    }
    
    return <p key={index} className="whitespace-pre-wrap">{segment}</p>
  })
}
