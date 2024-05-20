import { Loading } from "@/components/atoms";
import useConvertor from "./convertor.hook";
import ConvertorForm from "./convertor-form.component";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Convertor = () => {
  const {
    filterTokenData,
    handleChangeFromCurrency,
    handleChangeAmount,
    onSubmit,
    isLoading,
    amount,
    selectedFromCurrency,
    handleToggleField,
    handleChangeToCurrency,
    result,
    isCalculating,
    isCalculated,
    selectedToCurrency,
  } = useConvertor();
  if (isLoading) return <Loading />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ConvertorForm
          amount={amount}
          data={filterTokenData}
          isCalculating={isCalculating}
          onChangeAmount={handleChangeAmount}
          onChangeFromCurrency={handleChangeFromCurrency}
          onChangeToCurrency={handleChangeToCurrency}
          onSubmit={onSubmit}
          onToggleField={handleToggleField}
        
          selectedFromCurrency={selectedFromCurrency}
          selectedToCurrency={selectedToCurrency}
          calculatedResult={result.calculatedResult}
        />
      </CardContent>

      <CardFooter className="flex flex-col">
        {result.calculatedResult && <>
          <h3 className='mb-4  pb-1 border-b-2 text-lg heading'>
          Conversion Result
        </h3>
        {/* <p className="  font-bold">
          1 {selectedFromCurrency} = {rate} USD
        </p> */}
        <div className='  '>
          {isCalculating && <p>Calculating... </p>}
          {isCalculated && !isCalculating && (
            <div className='flex flex-col gap-1.5'>
              <p>
                {" "}
                Converted Result : {amount} {selectedFromCurrency} ={" "}
                <span className='font-bold'>{result.calculatedResult}</span>{" "}
                {selectedToCurrency}
              </p>
              <p>
                1 {selectedFromCurrency} = {result.rateFrom}{" "}
                {selectedToCurrency}
              </p>
              <p>
                1 {selectedToCurrency} = {result.rateTo} {selectedFromCurrency}
              </p>
            </div>
          )}
        </div></>}
      </CardFooter>
    </Card>
  );
};
export default Convertor;




