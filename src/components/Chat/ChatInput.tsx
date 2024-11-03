import React from 'react'

import { PiPaperPlaneRight } from 'react-icons/pi'
import { LoadingState } from '../../lib/llm/types'
import { Button } from '../ui/button'
import LLMSelectOrButton from '../Settings/LLMSettings/LLMSelectOrButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { allAvailableToolDefinitions } from '@/lib/llm/tools/tool-definitions'

interface ChatInputProps {
  userTextFieldInput: string
  setUserTextFieldInput: (value: string) => void
  handleSubmitNewMessage: () => void
  loadingState: LoadingState
  selectedLLM: string | undefined
  setSelectedLLM: (value: string | undefined) => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  userTextFieldInput,
  setUserTextFieldInput,
  handleSubmitNewMessage,
  loadingState,
  selectedLLM,
  setSelectedLLM,
}) => {
  return (
    <div className="flex w-full">
      <div className="z-50 flex w-full flex-col overflow-hidden rounded border-2 border-solid border-border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Select value={selectedLLM}>
          <SelectTrigger className="h-7 w-32 border-0 text-[10px] text-gray-300 focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Tools" />
          </SelectTrigger>
          <SelectContent className="rounded-md border border-dark-gray-c-eight bg-[#1c1c1c]">
            {allAvailableToolDefinitions.map((tool) => (
              <SelectItem
                key={tool.displayName}
                value={tool.name}
                className="cursor-pointer text-[10px] text-gray-300 hover:bg-[#252525] focus:bg-[#252525] focus:text-gray-200"
              >
                {tool.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <textarea
          value={userTextFieldInput}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.key === 'Enter') {
              e.preventDefault()
              handleSubmitNewMessage()
            }
          }}
          className="h-[100px] w-full resize-none border-0 bg-transparent p-4 text-foreground caret-current focus:outline-none"
          wrap="soft"
          placeholder="What can Reor help you with today?"
          onChange={(e) => setUserTextFieldInput(e.target.value)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <div className="mx-auto h-px w-[96%] bg-background/20" />
        <div className="flex h-10 flex-col items-center justify-between gap-2  py-2 md:flex-row md:gap-4">
          <div className="flex flex-col items-center justify-between rounded-md border-0 py-2 md:flex-row">
            <LLMSelectOrButton selectedLLM={selectedLLM} setSelectedLLM={setSelectedLLM} />
          </div>

          <div className="flex items-center">
            <Button
              className="flex items-center justify-between gap-2 bg-transparent text-[10px] text-primary hover:bg-transparent hover:text-accent-foreground"
              onClick={handleSubmitNewMessage}
              disabled={loadingState !== 'idle'}
            >
              <PiPaperPlaneRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
