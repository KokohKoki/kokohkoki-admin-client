export const idrFormatter = (price) => {
  const formattedPrice = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return formattedPrice;
};

export const usdFormatter = (price) => {
  const formattedPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return formattedPrice;
};
