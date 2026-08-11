

export function formatCurency(priceCents) {

  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurency;

export function multiProductDeliverySum(priceCents,cartItemquantity,deliveryOption) {
  return (Math.round(priceCents * cartItemquantity + deliveryOption)/100).toFixed(2);
} 