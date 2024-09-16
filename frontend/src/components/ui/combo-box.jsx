import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "./scroll-area";
import { capitalizeWords } from "@/helpers/capitalize-words";

function normalizeItem(item) {
   if (typeof item === "string" || typeof item === "number") {
      const label = capitalizeWords(item.toString());
      return {
         label: label,
         value: item.toString().toLowerCase(),
      };
   }

   return {
      label: item.label || item.value || "",
      value: (item.value || item.label || "").toLowerCase(),
   };
}

export function ComboBox({
   array: originalArray,
   defaultValue,
   placeholder,
   enableSearch = false,
   onValueChange,
   side,
   triggerClassName,
   popoverContentClassName,
   drawerContentClassName,
   placeholderClassName,
   commandItemClassName,
   iconLeft,
   iconRight,
   removeRightIconPrestyle = false,
}) {
   if (!originalArray) {
      throw new Error(
         "The 'array' prop is required. Pass an array to the prop"
      );
   }

   // Memoize the array transformation to avoid unnecessary recalculations
   const array = useMemo(() => {
      return originalArray.map(normalizeItem);
   }, [originalArray]);

   const isMobile = useMediaQuery("(max-width: 768px)");
   const [open, setOpen] = useState(false);
   const popoverTriggerRef = useRef(null);
   const [currentValue, setCurrentValue] = useState(defaultValue || "");

   // Effect to update current value based on defaultValue changes
   useEffect(() => {
      if (defaultValue && defaultValue !== currentValue) {
         const valueExists = array.some((item) => item.value === defaultValue);
         if (!valueExists) {
            console.error(
               `The default value "${defaultValue}" does not exist in the provided array.`
            );
         } else {
            setCurrentValue(defaultValue);
         }
      }
   }, [defaultValue, array]);

   // Callback for handling value changes
   const handleValueChange = useCallback(
      (value) => {
         if (value !== currentValue) {
            setCurrentValue(value);
            onValueChange?.(value);
         }
      },
      [currentValue, onValueChange]
   );

   // Remove redundant useEffect by ensuring handleValueChange handles the logic
   // If you need to trigger side-effects based on currentValue, handle them inside the callback

   if (isMobile) {
      return (
         <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
               <Button
                  variant="outline"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                     "w-full justify-between gap-2 font-medium border-2 border-input/20 bg-accent hover:bg-accent",
                     triggerClassName,
                     {
                        "border-input": currentValue,
                        "justify-start": iconLeft,
                     }
                  )}
               >
                  {iconLeft && iconLeft}

                  {currentValue ? (
                     array.find((item) => item.value === currentValue)?.label
                  ) : (
                     <span
                        id="placeholder"
                        className={cn(
                           "text-muted-foreground",
                           placeholderClassName
                        )}
                     >
                        {placeholder && placeholder}
                     </span>
                  )}

                  <span
                     id="icon-container"
                     className={cn({
                        "size-4 shrink-0 ml-auto border border-red-600 [&_svg]:w-full [&_svg]:h-full":
                           !removeRightIconPrestyle,
                     })}
                  >
                     {iconRight ? iconRight : <CaretSortIcon />}
                  </span>
               </Button>
            </DrawerTrigger>

            <DrawerContent className={drawerContentClassName}>
               <div id="wrapper" className="mt-4 border-t">
                  <SelectList
                     currentValue={currentValue}
                     array={array}
                     placeholder={placeholder}
                     enableSearch={enableSearch}
                     setOpen={setOpen}
                     setSelected={handleValueChange}
                     commandItemClassName={commandItemClassName}
                  />
               </div>
            </DrawerContent>
         </Drawer>
      );
   }

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               ref={popoverTriggerRef}
               variant="outline"
               role="combobox"
               onClick={(e) => e.stopPropagation()}
               aria-expanded={open}
               className={cn(
                  "w-full justify-between gap-2 font-medium border-2 border-input/20 bg-accent hover:bg-accent",
                  triggerClassName,
                  {
                     "border-input": currentValue,
                     "justify-start": iconLeft,
                  }
               )}
            >
               {iconLeft && iconLeft}

               {currentValue ? (
                  array.find((item) => item.value === currentValue)?.label
               ) : (
                  <span
                     id="placeholder"
                     className={cn(
                        "text-muted-foreground",
                        placeholderClassName
                     )}
                  >
                     {placeholder && placeholder}
                  </span>
               )}

               <span
                  className={cn({
                     "min-w-4 min-h-4 shrink-0 ml-auto [&_svg]:w-full [&_svg]:h-full":
                        !removeRightIconPrestyle,
                  })}
               >
                  {iconRight ? iconRight : <CaretSortIcon />}
               </span>
            </Button>
         </PopoverTrigger>

         <PopoverContent
            side={side}
            align="start"
            style={{
               width: popoverTriggerRef.current
                  ? `${popoverTriggerRef.current.offsetWidth}px`
                  : "auto",
            }}
            className={cn("p-0", popoverContentClassName)}
         >
            <ScrollArea>
               <SelectList
                  currentValue={currentValue}
                  array={array}
                  placeholder={placeholder}
                  enableSearch={enableSearch}
                  setOpen={setOpen}
                  setSelected={handleValueChange}
                  commandItemClassName={commandItemClassName}
               />
            </ScrollArea>
         </PopoverContent>
      </Popover>
   );
}

const SelectList = ({
   currentValue,
   setOpen,
   setSelected,
   array,
   enableSearch,
   placeholder,
   commandItemClassName,
   renderItem,
}) => {
   return (
      <Command className="w-full">
         {enableSearch && (
            <CommandInput placeholder={placeholder} className="h-9" />
         )}

         <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>

            <CommandGroup>
               {array.map((item, index) => (
                  <CommandItem
                     key={index}
                     value={item.value}
                     onSelect={(value) => {
                        setSelected(currentValue === value ? "" : value);
                        setOpen(false);
                     }}
                     className={cn("py-2 cursor-pointer", commandItemClassName)}
                  >
                     {renderItem ? renderItem(item) : item.label || item.value}

                     <CheckIcon
                        className={cn(
                           "ml-auto size-5",
                           currentValue === item.value
                              ? "opacity-100"
                              : "opacity-0"
                        )}
                     />
                  </CommandItem>
               ))}
            </CommandGroup>
         </CommandList>
      </Command>
   );
};
