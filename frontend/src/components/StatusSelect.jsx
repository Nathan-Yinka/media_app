'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


export default function StatusSelect({ DropdownData, selected, setSelected,handleItemClick  }) {
//   const [selected, setSelected] = useState(people[3])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Label> */}
      <div className="relative">
        <ListboxButton className="relative cursor-default rounded-md py-2 pl-2 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset  sm:leading-6 placeholder:italic placeholder:text-slate-400 block bg-white w-full border  focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selected?.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {DropdownData?.map((item,index) => (
            <ListboxOption
              key={index}
              value={item}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-sky-500 data-[focus]:text-white"
              onClick={()=>handleItemClick(item)}
            >
              <div className="flex items-center">
                {/* <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {item.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
