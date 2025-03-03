export const truncateEnsName = (ensName: string, maxLength = 16) => {
  if (!ensName || !ensName.endsWith(".eth")) return ensName;

  const namePart = ensName.slice(0, -4); // Remove .eth
  if (namePart.length <= maxLength) return ensName;
  return `${namePart.slice(0, maxLength)}...eth`;
};

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
