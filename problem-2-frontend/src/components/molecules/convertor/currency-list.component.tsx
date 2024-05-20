import { CheckIcon, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { ICurrency } from "./convertor.type";


interface CurrencyListProps  {
    selectedCurrency:string
  currencyList: ICurrency[];
  onChangeCurrency: (val: string) => void;

}
export default function CurrencyList({ currencyList,selectedCurrency,onChangeCurrency }: CurrencyListProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            "flex gap-2 items-center border-none flex-0 hover:bg-transparent",
            {
              "text-inherit": selectedCurrency,
            }
          )}
        >
            <CurrencyImg currency={selectedCurrency}/>
          {selectedCurrency
            ? currencyList.find((currency) => currency.currency === selectedCurrency)?.currency
            : "Select currency"}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {currencyList.map((currency) => (
                <CommandItem
                  key={currency.currency}
                  defaultValue={currency.currency}
                  className='cursor-pointer flex items-center justify-between'
                  onSelect={(currentValue) => {
                    
                    onChangeCurrency(
                      currentValue === selectedCurrency ? currentValue : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <CurrencyItem currency={currency.currency} />

                  <CheckIcon
                    className={cn(
                      "",
                      selectedCurrency === currency.currency ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}





function CurrencyItem({ currency }: { currency: string }) {
 
  return (
    <div className='flex gap-4 items-center'>
      <div className='max-w-[25px] min-w-[25px]'>
        <CurrencyImg currency={currency}/>
      </div>
      <span>{currency}</span>
    </div>
  );
}

function CurrencyImg({currency}:{currency:string}){
    const [isImgExist, setIsImgExist] = React.useState(true);
    const handleError = () => {
      setIsImgExist(false);
    };
    return    <p className='max-w-[25px] min-w-[25px]'>
    {isImgExist && (
      <img
        onError={handleError}
        className='w-full h-full'
        alt={`$currency token`}
        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`}
      />
    )}
  </p>
}