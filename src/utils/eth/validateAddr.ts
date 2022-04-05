import web3 from 'web3-utils';

export const validateEthAddr = (addrs: Record<string, string>, errors) => {
  const addrsEntries = Object.entries(addrs);

  if (addrs && addrsEntries.length > 0) {
    addrsEntries.map((addr) => {
      if (!web3.isAddress(addr[1])) {
        errors[addrs[0]] = addrs[0] + 'is a invalid address';
        throw new Error(addrs[0] + 'is a invalid address');
      }
    });
  }

  return errors;
};
