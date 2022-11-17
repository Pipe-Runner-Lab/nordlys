export function getColor(isSelected: boolean, isBlocked: boolean): string | undefined {
  if (isSelected) {
    return 'yellow';
  }

  if (isBlocked) {
    return 'white';
  }
}
