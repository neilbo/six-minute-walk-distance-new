export function isScrollEnabled(
  scrollTop: any,
  scrollThreshold: number = 150
): boolean {
  return scrollTop >= scrollThreshold ? true : false;
}

export default function toggleScrollButton(event: CustomEvent): boolean {
  let scrollTop = event.detail.scrollTop;
  return isScrollEnabled(scrollTop);
}