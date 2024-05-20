// in the code below that reference it blockchain property but in this type doesn't include
// when using Typescript one of the most advantage is we can specify the shape of variable
// so I created an enum that hold blockchain value
enum BlockChain {
    Osmosis = "Osmosis",
    Ethereum = "Ethereum",
    Arbitrum = "Arbitrum",
    Zilliqa = "Zilliqa",
    Neo = "Neo",
  }
  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: BlockChain;
  }
  
  // since it has exact  2 properties we can extends WalletBalance.
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  // React Fc works fine but I think destruct props like this is more readable (children property isn't used any where so i took it out)
  const WalletPage1 = (props: Props) => {
    const balances = useWalletBalances();
    const prices = usePrices();
  
    // will use it later in dependency arr to avoid infinite loop I store it in useCallback
    //  the blockchain argument point to the BlockChian enum
    const getPriority = useCallback((blockchain: BlockChain): number => {
      switch (blockchain) {
        case BlockChain.Osmosis:
          return 100;
        case BlockChain.Ethereum:
          return 50;
        case BlockChain.Arbitrum:
          return 30;
        case BlockChain.Zilliqa:
          return 20;
        case BlockChain.Neo:
          return 20;
        default:
          return -99;
      }
    }, []);
  
    //   in the previous version the code was filtered first then sorted but inside of it the getPriority function was called over and over again with the same argument since it's kind of relative to each other i put it into 1 variable
  
    const sortedBalances = useMemo(() => {
      return (
        balances
          // copy existing property and add priority  property to filter
          .map((balance) => ({
            ...balance,
            priority: getPriority(balance.blockchain),
          }))
          // with nested and chaining code like this i think using short-circuit is more readable
          .filter((balance) => balance.priority > -99 && balance.amount <= 0)
          .sort((a, b) => b.priority - a.priority)
      );
    }, [balances, getPriority]);
    const rows = useMemo(() => {
      return sortedBalances.map(
        // using index as key which is not ideal in react (arr change react recreated all the dom node include it's state from scratch even when it at the same position as before)
        (balance: FormattedWalletBalance, index: number) => {
          const usdValue = prices[balance.currency] * balance.amount;
          return (
            <WalletRow
              className={classes.row}
              //   i used balance.currency instead of the index
              key={balance.currency}
              amount={balance.amount}
              usdValue={usdValue}
              formattedAmount={balance.formatted}
            />
          );
        }
      );
    });
    //
    return <div {...props}>{rows}</div>;
  };
  const WalletPage: React.FC<Props> = (props: Props) => {
    // children is destructured but it’s not used anywhere
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
    //   With typescript i think we should use a type for this parameter and refer it down for each switch case
    const getPriority = (blockchain: any): number => {
      switch (blockchain) {
        case "Osmosis":
          return 100;
        case "Ethereum":
          return 50;
        case "Arbitrum":
          return 30;
        case "Zilliqa":
          return 20;
        case "Neo":
          return 20;
        default:
          return -99;
      }
    };
    const sortedBalances = useMemo(() => {
      return balances
        .filter((balance: WalletBalance) => {
          // this variable is not used
          const balancePriority = getPriority(balance.blockchain);
          // reference wrong variable
          if (lhsPriority > -99) {
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          // get priority is called over and over with the same argument
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        });
    }, [balances]);
    //   mapped over but not used the formatted basically doing the same thing when call toFixed() with no argument amount alone is enough
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    });
    //   should wrap by useMemo if other state change this array is created again
    const rows = sortedBalances.map(
      // using index as key which is not ideal in react (arr change react recreated all the dom node include it's state from scratch even when it at the same position as before)
      (balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }
    );
  
    return <div {...rest}>{rows}</div>;
  };