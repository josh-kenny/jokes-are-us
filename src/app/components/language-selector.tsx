'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/app/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/app/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/ui/popover'
import { useTranslation } from '@/contexts/translation-context'

// Array of available languages with their codes and labels
const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese (Simplified)' },
]

export function LanguageSelector() {
    // State to control the open/closed state of the language selector popover
    const [open, setOpen] = React.useState(false)
    // Hook to access and set the current language from the translation context
    const { language, setLanguage } = useTranslation()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {/* Display selected language or default text */}
                    {language ? languages.find((l) => l.value === language)?.label : 'Select language...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {/* Search input for languages */}
                    <CommandInput placeholder="Search language..." />
                    {/* Message shown when no languages match the search */}
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {/* Map through languages to create selectable items */}
                        {languages.map((l) => (
                            <CommandItem
                                key={l.value}
                                onSelect={() => {
                                    setLanguage(l.value) // Set the selected language
                                    setOpen(false) // Close the popover after selection
                                }}
                            >
                                {/* Checkmark icon to indicate the currently selected language */}
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        language === l.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                                {l.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}