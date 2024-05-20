import { Spinner } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaExchangeAlt } from "react-icons/fa";
import { ICurrency } from "./convertor.type";
import CurrencyList from "./currency-list.component";

export interface ConvertorFormProps {
  onSubmit: (e: React.FormEvent) => void;
  amount: number;
  onChangeAmount: (val: number) => void;
  data: ICurrency[];
  selectedFromCurrency: string;
  calculatedResult:number;
  onChangeFromCurrency: (val: string) => void;
  selectedToCurrency: string;
  onChangeToCurrency: (val: string) => void;
  isCalculating: boolean;
  onToggleField: () => void;
}
const ConvertorForm = ({
  onChangeAmount,
  amount,
  data,
  isCalculating,
  onChangeFromCurrency,
  onChangeToCurrency,
  onSubmit,
  selectedFromCurrency,
  calculatedResult,
  onToggleField,
  selectedToCurrency,
}: ConvertorFormProps) => {

  return (
    <form onSubmit={onSubmit} className='mb-6'>
      <div className='flex items-center gap-4'>
        <div className='flex-1'>
          <Label className='mb-2 block' htmlFor='amount'>
            Amount
          </Label>
          <div
            className={
              "flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            }
          >
            <input
              type='tel'
              min={1}
              value={amount}
              onChange={(e) => {
                const isNumber = Number(e.target.value);
                if (!isNumber) return;
                onChangeAmount(Number(e.target.value));
              }}
              className='border-none bg-transparent outline-none block flex-1'
            />
                     <CurrencyList  selectedCurrency={selectedFromCurrency} onChangeCurrency={onChangeFromCurrency} currencyList={data} />

          </div>

          {amount <= 0 && (
            <p className='text-[var(--color-danger)]'>
              Amount must be greater than 0
            </p>
          )}
        </div>
        {/* <div className="flex items-center"> */}
        {/* <FormRow>
          <label htmlFor='from'>From</label>
          <CurrencyList />
    
        </FormRow> */}
        <div>
          <Label className='mb-2 block opacity-0' htmlFor='to'></Label>

          <Button
            type='button'
            onClick={onToggleField}
            title='Change field'
            className='rounded-full w-12 h-12'
          >
            <FaExchangeAlt size={35} />
          </Button>
        </div>
        <div className='flex-1'>
          <Label className='mb-2 block' htmlFor='amount'>
            Converted to
          </Label>
          <div
            className={
              "flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            }
          >
            <input
              type='tel'
              min={1}
              value={calculatedResult?calculatedResult:''}
              placeholder='Press convert to convert exchange'
              onChange={()=>{
                return
              }}
              className='border-none bg-transparent outline-none block flex-1'
            />
            <CurrencyList  selectedCurrency={selectedToCurrency} onChangeCurrency={onChangeToCurrency} currencyList={data} />
          </div>
          {amount <= 0 && (
            <p className='text-[var(--color-danger)]'>
              Amount must be greater than 0
            </p>
          )}
        </div>
      </div>
      {/* </div> */}
      <Button disabled={isCalculating} className='w-28 mt-6'>
        {isCalculating ? <Spinner /> : "Convert"}
      </Button>
      {!isCalculating && <p className="mt-4 text-muted-foreground text-sm">Press convert to calculate</p>}

    </form>
  );
};
export default ConvertorForm;

