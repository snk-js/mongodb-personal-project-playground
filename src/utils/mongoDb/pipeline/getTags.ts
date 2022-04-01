export const getTags = (
  contract_address: string | any,
  func: string | any,
  success?: string | any,
  nft_contract?: string,
  nft_event?: string,
  coin_buy?: string,
  coin_sell?: string
): Array<string> => {
  const tags = [];

  if (coin_buy || coin_sell) {
    tags.push(
      //@ts-ignore
      (coin_buy ?? coin_sell).toLowerCase() + ':' + coin_buy
        ? 'coin_buy'
        : 'coin_sell'
    );
  }

  if (contract_address && func) {
    // tags have the form <CONTRACT ADRESS>:<FUNCTION>:SUCCESS
    //@ts-ignore
    tags.push(contract_address.toLowerCase() + ':' + func + ':' + success);
  } else if (contract_address) {
    // tags have the form <CONTRACT ADRESS>:contract
    //@ts-ignore
    tags.push(contract_address.toLowerCase() + ':contract');
  }

  // nft special filters passed in
  if (nft_contract) {
    // nft tags have the form <CONTRACT ADRESS>:<FUNCTION>:SUCCESS
    //@ts-ignore
    tags.push(nft_contract.toLowerCase() + ':nft.contract');
  }

  if (nft_event) {
    // nft tags have the form <CONTRACT ADRESS>:<FUNCTION>:SUCCESS
    //@ts-ignore
    tags.push(nft_event.toLowerCase() + ':nft.event');
  }

  return tags;
};
