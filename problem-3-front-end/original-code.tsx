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
      // prices has no effect in the dependency array
    }, [balances, prices]);
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