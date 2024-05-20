import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchData, wait } from "@/utils/fetch.util";
import { ICurrency } from "./convertor.type";
const URL = "https://interview.switcheo.com/prices.json";

const exchangeRate = (
  amount: number,
  currencyFromPrice: number,
  currencyToPrice: number
) => {
  const usdAmount = amount * currencyFromPrice;
  const result = usdAmount / currencyToPrice;
  const rateFrom = 1 * (currencyFromPrice / currencyToPrice);
  const rateTo = 1 * (currencyToPrice / currencyFromPrice);
  return { result, rateFrom, rateTo };
};

let init = true;

const useConvertor = () => {
  const [tokenData, setTokenData] = useState<ICurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState<null | string>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [result, setResult] = useState({
    calculatedResult: 0,
    rateFrom: 0,
    rateTo: 0,
  });
  const filterTokenData = useMemo(
    () => tokenData.filter((token) => token.price),
    [tokenData]
  );
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("");
  const [selectedToCurrency, setSelectedToCurrency] = useState("");

  const calculateResult = async () => {
    try {
      setIsCalculating(true);
      const data = await fetchData<ICurrency[]>(URL);
      const currencyFrom = data.find(
        (token) => token.currency === selectedFromCurrency
      );
      const currencyTo = data.find(
        (token) => token.currency === selectedToCurrency
      );
      await wait(data, 2000);
      if (currencyFrom && currencyTo) {
        const { rateFrom, rateTo, result } = exchangeRate(
          amount,
          currencyFrom.price,
          currencyTo.price
        );

        setResult({
          calculatedResult: +result.toFixed(5),
          rateFrom,
          rateTo,
        });
        setIsCalculated(true);
        return;
      }
      toast.error("Something went wrong");
    } catch (error) {
      const err = error as { message: string };
      toast.error(err.message);
    } finally {
      setIsCalculating(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await calculateResult();
  };
  const getPricesTokenCallback = useCallback(async () => {
    try {
      setIsLoading(true);

      const data: ICurrency[] = await fetchData(URL);
      const uniqueCurrencies = new Set();

      // Filter out duplicates and add to the Set
      const filteredData = data.filter((currency) => {
        if (!uniqueCurrencies.has(currency.currency)) {
          uniqueCurrencies.add(currency.currency);
          return true;
        }
        return false;
      });
      setTokenData(filteredData);
    } catch (error) {
      const err = error as { message: string };
      setError(err.message);
      console.error(err.message);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleChangeAmount = (amount: number) => {
    setIsCalculated(false);
    setAmount(amount);
  };
  const handleChangeFromCurrency = (value: string) => {
    setIsCalculated(false);
    setSelectedFromCurrency(value);
  };
  const handleChangeToCurrency = (value: string) => {
    setIsCalculated(false);
    setSelectedToCurrency(value);
  };
  const handleToggleField = () => {
    setSelectedFromCurrency(selectedToCurrency);
    setIsCalculated(false);
    setSelectedToCurrency(selectedFromCurrency);
  };

  // automatically refetch each every 30 second
  const TIMEOUT = 30;
  useEffect(() => {
    (async () => {
      await getPricesTokenCallback();
    })();
    const timeId = setTimeout(async () => {
      await getPricesTokenCallback();
    }, TIMEOUT * 1000);
    return () => clearTimeout(timeId);
  }, [getPricesTokenCallback]);
  useEffect(() => {
    if (filterTokenData.length > 0) {
      setSelectedFromCurrency(filterTokenData[0].currency);
    }
  }, [filterTokenData]);

  useEffect(() => {
    if (filterTokenData.length > 0) {
      setSelectedToCurrency(filterTokenData[1].currency);
    }
  }, [filterTokenData]);
  useEffect(() => {
    async function calcResultBeginning() {
      const data = await fetchData<ICurrency[]>(URL);
      const currencyFrom = data.find(
        (token) => token.currency === selectedFromCurrency
      );
      const currencyTo = data.find(
        (token) => token.currency === selectedToCurrency
      );
      if (currencyFrom && currencyTo) {
        const { rateFrom, rateTo, result } = exchangeRate(
          amount,
          currencyFrom.price,
          currencyTo?.price
        );
        setResult({
          calculatedResult: +result.toFixed(5),
          rateFrom,
          rateTo,
        });
        init = false;
      }
    }
    if (selectedFromCurrency && selectedToCurrency) {
      if (init) {
        calcResultBeginning();
      }
    }
  }, [selectedFromCurrency, selectedToCurrency, amount]);



  return {
    filterTokenData,
    handleChangeFromCurrency,
    amount,
    handleToggleField,
    onSubmit,
    isLoading,
    error,
    isCalculating,
    selectedFromCurrency,
    handleChangeAmount,
    selectedToCurrency,
    handleChangeToCurrency,
    result,
    isCalculated,
  };
};
export default useConvertor;
