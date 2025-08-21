import { LineItem } from '@commercetools/platform-sdk';

export function getEffectivePrice(item: LineItem): number {
  return item.price.discounted?.value.centAmount || item.price.value.centAmount;
}
